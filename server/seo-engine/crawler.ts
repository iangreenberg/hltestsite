import axios from 'axios';
import { JSDOM } from 'jsdom';
import { createLogger } from '../logger';

const logger = createLogger('seo-crawler');

/**
 * Type definition for page content data
 */
export interface PageContent {
  url: string;
  html: string;
  dom: JSDOM;
  status: number;
  title: string;
  metaTags: Array<{name: string, content: string}>;
  links: Array<{href: string, text: string}>;
  timestamp: Date;
}

/**
 * Options for page loading
 */
export interface LoadPageOptions {
  timeout?: number;
  userAgent?: string;
  maxRetries?: number;
}

/**
 * Loads a webpage and returns its content and parsed DOM
 */
export async function loadPageContent(
  url: string, 
  options: LoadPageOptions = {}
): Promise<PageContent> {
  const {
    timeout = 10000,
    userAgent = 'Mozilla/5.0 (compatible; SEOMonitorBot/1.0; +http://hempLaunch.com/bot)',
    maxRetries = 3
  } = options;
  
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      logger.info(`Loading page content for ${url}`);
      
      const response = await axios.get(url, {
        timeout,
        headers: {
          'User-Agent': userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1'
        },
        maxRedirects: 5
      });
      
      const html = response.data;
      const dom = new JSDOM(html, { url });
      const metaTags = getMetaTags(dom);
      const links = extractLinks(dom);
      
      logger.info(`Successfully loaded ${url} (status: ${response.status})`);
      
      return {
        url,
        html,
        dom,
        status: response.status,
        title: dom.window.document.title,
        metaTags,
        links,
        timestamp: new Date()
      };
      
    } catch (error: any) {
      retries++;
      logger.error(`Error loading ${url} (attempt ${retries}/${maxRetries}):`, error.message);
      
      if (retries >= maxRetries) {
        return {
          url,
          html: '',
          dom: new JSDOM(''),
          status: error.response?.status || 0,
          title: '',
          metaTags: [],
          links: [],
          timestamp: new Date()
        };
      }
      
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, 1000 * retries));
    }
  }
  
  // This should never happen due to the return in the catch block above
  throw new Error(`Failed to load ${url} after ${maxRetries} attempts`);
}

/**
 * Extracts all meta tags from the DOM
 */
export function getMetaTags(dom: JSDOM): Array<{name: string, content: string}> {
  const metaTags: Array<{name: string, content: string}> = [];
  const metaElements = dom.window.document.querySelectorAll('meta');
  
  metaElements.forEach(meta => {
    const name = meta.getAttribute('name') || 
                meta.getAttribute('property') || 
                meta.getAttribute('http-equiv') || 
                meta.getAttribute('itemprop');
                
    const content = meta.getAttribute('content');
    
    if (name && content) {
      metaTags.push({ name, content });
    }
  });
  
  // Also include canonical link as a meta tag
  const canonical = dom.window.document.querySelector('link[rel="canonical"]');
  if (canonical && canonical.getAttribute('href')) {
    metaTags.push({ 
      name: 'canonical', 
      content: canonical.getAttribute('href') || '' 
    });
  }
  
  return metaTags;
}

/**
 * Extracts all links from the DOM
 */
export function extractLinks(dom: JSDOM): Array<{href: string, text: string}> {
  const links: Array<{href: string, text: string}> = [];
  const linkElements = dom.window.document.querySelectorAll('a');
  
  linkElements.forEach(link => {
    const href = link.getAttribute('href');
    const text = link.textContent?.trim() || '';
    
    if (href) {
      links.push({ href, text });
    }
  });
  
  return links;
}

/**
 * Crawls a site starting from a URL and returns all discovered URLs
 */
export async function crawlSite(
  startUrl: string, 
  options: { 
    maxPages?: number; 
    maxDepth?: number;
    includeExternal?: boolean;
    urlPatterns?: RegExp[];
  } = {}
): Promise<string[]> {
  const {
    maxPages = 100,
    maxDepth = 3,
    includeExternal = false,
    urlPatterns = []
  } = options;
  
  logger.info(`Starting site crawl from ${startUrl}`);
  
  const baseUrlObj = new URL(startUrl);
  const baseHostname = baseUrlObj.hostname;
  
  const visited = new Set<string>();
  const queue: Array<{ url: string; depth: number }> = [{ url: startUrl, depth: 0 }];
  const discoveredUrls: string[] = [];
  
  while (queue.length > 0 && discoveredUrls.length < maxPages) {
    const { url, depth } = queue.shift()!;
    
    if (visited.has(url)) continue;
    visited.add(url);
    
    try {
      const { dom, status } = await loadPageContent(url);
      
      if (status !== 200) {
        logger.warn(`Skipping ${url} due to status code ${status}`);
        continue;
      }
      
      discoveredUrls.push(url);
      logger.info(`Crawled ${url} (${discoveredUrls.length}/${maxPages})`);
      
      // Stop crawling if we've reached max depth
      if (depth >= maxDepth) continue;
      
      // Extract links from the page
      const links = extractLinks(dom);
      
      for (const link of links) {
        try {
          // Normalize URL
          let normalizedUrl: string;
          
          if (link.href.startsWith('/')) {
            // Convert relative URL to absolute
            normalizedUrl = `${baseUrlObj.protocol}//${baseUrlObj.host}${link.href}`;
          } else if (!link.href.startsWith('http')) {
            // Skip non-HTTP links (e.g., mailto:, tel:, javascript:)
            continue;
          } else {
            normalizedUrl = link.href;
          }
          
          // Create URL object to parse the link
          const linkUrl = new URL(normalizedUrl);
          
          // Skip external domains if not including external
          if (!includeExternal && linkUrl.hostname !== baseHostname) {
            continue;
          }
          
          // Skip if it doesn't match any provided patterns
          if (urlPatterns.length > 0 && !urlPatterns.some(pattern => pattern.test(normalizedUrl))) {
            continue;
          }
          
          // Skip URLs with fragment identifiers
          linkUrl.hash = '';
          normalizedUrl = linkUrl.toString();
          
          // Skip if already visited
          if (!visited.has(normalizedUrl)) {
            queue.push({ url: normalizedUrl, depth: depth + 1 });
          }
        } catch (error) {
          logger.error(`Error processing link ${link.href}:`, error);
        }
      }
    } catch (error) {
      logger.error(`Error crawling ${url}:`, error);
    }
  }
  
  logger.info(`Crawl completed. Discovered ${discoveredUrls.length} URLs.`);
  return discoveredUrls;
}