import axios from 'axios';
import { JSDOM } from 'jsdom';
import { createLogger } from '../logger';

const logger = createLogger('seo-crawler');

// Base URL for crawling
export const BASE_URL = process.env.BASE_URL || 'https://hltestsite-4vq3.vercel.app';

/**
 * Represents a web page found during crawling
 */
export interface CrawledPage {
  url: string;
  title: string;
  metaTags: Array<{name: string, content: string}>;
  h1: string[];
  links: string[];
  statusCode: number;
  contentType: string;
  html: string;
}

/**
 * Simple crawler to index site pages
 */
export class Crawler {
  private visitedUrls: Set<string> = new Set();
  private pagesToCrawl: string[] = [];
  private maxPages: number;
  private baseUrl: string;
  
  constructor(
    baseUrl: string = BASE_URL,
    maxPages: number = 50
  ) {
    this.baseUrl = baseUrl;
    this.maxPages = maxPages;
  }
  
  /**
   * Start crawling the site from a specific URL
   */
  async crawlSite(startUrl: string = '/'): Promise<CrawledPage[]> {
    this.visitedUrls.clear();
    this.pagesToCrawl = [this.resolveUrl(startUrl)];
    
    const crawledPages: CrawledPage[] = [];
    
    logger.info(`Starting site crawl from ${startUrl}`);
    
    while (
      this.pagesToCrawl.length > 0 && 
      crawledPages.length < this.maxPages
    ) {
      const nextUrl = this.pagesToCrawl.shift();
      
      // Skip if URL has already been visited
      if (!nextUrl || this.visitedUrls.has(nextUrl)) {
        continue;
      }
      
      try {
        logger.info(`Crawling ${nextUrl}`);
        const page = await this.crawlPage(nextUrl);
        
        if (page) {
          crawledPages.push(page);
          
          // Add discovered links to crawl queue
          for (const link of page.links) {
            if (
              !this.visitedUrls.has(link) && 
              !this.pagesToCrawl.includes(link) &&
              this.shouldCrawl(link)
            ) {
              this.pagesToCrawl.push(link);
            }
          }
        }
        
        // Mark URL as visited
        this.visitedUrls.add(nextUrl);
        
        // Small delay to be nice to the server
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        logger.error(`Error crawling ${nextUrl}:`, error);
      }
    }
    
    logger.info(`Crawling complete. Crawled ${crawledPages.length} pages`);
    return crawledPages;
  }
  
  /**
   * Crawl a single page and extract its data
   */
  async crawlPage(url: string): Promise<CrawledPage | null> {
    try {
      const response = await axios.get(url, {
        validateStatus: () => true, // accept all status codes
        headers: {
          'User-Agent': 'HempLaunch-SEO-Crawler/1.0',
          'Accept': 'text/html'
        }
      });
      
      const contentType = response.headers['content-type'] || '';
      
      // Only process HTML pages
      if (!contentType.includes('text/html')) {
        logger.info(`Skipping ${url} - not HTML content`);
        return null;
      }
      
      // Parse the HTML
      const dom = new JSDOM(response.data);
      const document = dom.window.document;
      
      // Extract page title
      const title = document.querySelector('title')?.textContent || '';
      
      // Extract meta tags
      const metaTags = Array.from(document.querySelectorAll('meta'))
        .filter(meta => meta.getAttribute('name') && meta.getAttribute('content'))
        .map(meta => ({
          name: meta.getAttribute('name') || '',
          content: meta.getAttribute('content') || ''
        }));
      
      // Extract h1 tags
      const h1 = Array.from(document.querySelectorAll('h1'))
        .map(h => h.textContent?.trim() || '');
      
      // Extract links
      const links = Array.from(document.querySelectorAll('a'))
        .map(a => a.getAttribute('href') || '')
        .filter(href => href && !href.startsWith('#') && !href.startsWith('mailto:'))
        .map(href => this.resolveUrl(href))
        .filter(href => this.isSameDomain(href));
      
      return {
        url,
        title,
        metaTags,
        h1,
        links,
        statusCode: response.status,
        contentType,
        html: response.data
      };
    } catch (error) {
      logger.error(`Error fetching ${url}:`, error);
      return null;
    }
  }
  
  /**
   * Resolve relative URLs to absolute URLs
   */
  private resolveUrl(url: string): string {
    if (url.startsWith('http')) {
      return url;
    }
    
    // Handle absolute paths
    if (url.startsWith('/')) {
      return new URL(url, this.baseUrl).toString();
    }
    
    // Handle relative paths
    return new URL(url, this.baseUrl).toString();
  }
  
  /**
   * Check if a URL is from the same domain
   */
  private isSameDomain(url: string): boolean {
    try {
      const urlObj = new URL(url);
      const baseUrlObj = new URL(this.baseUrl);
      return urlObj.hostname === baseUrlObj.hostname;
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Determine if a URL should be crawled
   */
  private shouldCrawl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      
      // Skip URLs with query parameters and fragments
      if (urlObj.search || urlObj.hash) {
        return false;
      }
      
      // Skip non-HTTP/HTTPS URLs
      if (!urlObj.protocol.startsWith('http')) {
        return false;
      }
      
      // Skip common file extensions that aren't web pages
      const skipExtensions = [
        '.jpg', '.jpeg', '.png', '.gif', '.pdf', 
        '.doc', '.docx', '.xls', '.xlsx', '.zip',
        '.css', '.js', '.xml', '.json'
      ];
      
      if (skipExtensions.some(ext => urlObj.pathname.endsWith(ext))) {
        return false;
      }
      
      return true;
    } catch (error) {
      return false;
    }
  }
}

// Export a factory function to create new crawler instances
export function createCrawler(
  baseUrl: string = BASE_URL,
  maxPages: number = 50
): Crawler {
  return new Crawler(baseUrl, maxPages);
}