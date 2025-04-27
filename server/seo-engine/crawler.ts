/**
 * Website Crawler Utility for SEO Engine
 * 
 * This utility crawls the live website to gather SEO data for analysis and comparison.
 */

import axios from 'axios';
import { JSDOM } from 'jsdom';
import { createLogger } from '../logger';
import { storageSeo } from '../storageSeo';

const logger = createLogger('SEOCrawler');

interface PageData {
  url: string;
  title: string | null;
  description: string | null;
  h1Tags: string[];
  h2Tags: string[];
  internalLinks: string[];
  externalLinks: string[];
  canonical: string | null;
  wordCount: number;
  imageCount: number;
  images: Array<{
    src: string;
    alt: string | null;
    width: number | null;
    height: number | null;
  }>;
  meta: Record<string, string>;
}

interface CrawlResult {
  pages: PageData[];
  totalUrls: number;
  startTime: Date;
  endTime: Date;
  duration: number; // in milliseconds
}

export class SEOCrawler {
  private baseUrl: string;
  private visitedUrls: Set<string>;
  private maxPages: number;
  private userAgent: string;
  private timeout: number; // in milliseconds
  private crawlDelay: number; // in milliseconds

  constructor(options: {
    baseUrl: string;
    maxPages?: number;
    userAgent?: string;
    timeout?: number;
    crawlDelay?: number;
  }) {
    this.baseUrl = options.baseUrl.endsWith('/') 
      ? options.baseUrl.slice(0, -1) 
      : options.baseUrl;
    this.visitedUrls = new Set<string>();
    this.maxPages = options.maxPages || 100;
    this.userAgent = options.userAgent || 'HempLaunch SEO Crawler/1.0';
    this.timeout = options.timeout || 10000;
    this.crawlDelay = options.crawlDelay || 500;
  }

  /**
   * Normalize URL to avoid duplicates
   */
  private normalizeUrl(url: string): string {
    // Handle relative URLs
    if (url.startsWith('/')) {
      url = this.baseUrl + url;
    } else if (!url.startsWith('http')) {
      return ''; // Skip non-http URLs (like mailto:, tel:, etc.)
    }

    // Remove hash fragment
    url = url.split('#')[0];

    // Remove trailing slash
    if (url.endsWith('/') && url !== this.baseUrl + '/') {
      url = url.slice(0, -1);
    }

    return url;
  }

  /**
   * Check if URL should be crawled
   */
  private shouldCrawl(url: string): boolean {
    // Skip if already visited
    if (this.visitedUrls.has(url)) return false;

    // Check if URL is from the same domain
    if (!url.startsWith(this.baseUrl)) return false;

    // Skip non-web pages (pdf, jpg, etc.)
    const skipExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.gif', '.svg', '.css', '.js'];
    if (skipExtensions.some(ext => url.toLowerCase().endsWith(ext))) return false;

    return true;
  }

  /**
   * Parse page content and extract SEO data
   */
  private parsePage(url: string, html: string): PageData {
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Extract basic SEO elements
    const title = document.querySelector('title')?.textContent || null;
    const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || null;
    
    // Extract headings
    const h1Tags = Array.from(document.querySelectorAll('h1')).map(h => h.textContent?.trim()).filter(Boolean) as string[];
    const h2Tags = Array.from(document.querySelectorAll('h2')).map(h => h.textContent?.trim()).filter(Boolean) as string[];
    
    // Extract links
    const links = Array.from(document.querySelectorAll('a[href]'));
    const processedLinks = links.map(link => {
      const href = link.getAttribute('href') || '';
      return this.normalizeUrl(href);
    }).filter(Boolean);
    
    const internalLinks = processedLinks.filter(link => link.startsWith(this.baseUrl));
    const externalLinks = processedLinks.filter(link => !link.startsWith(this.baseUrl) && link.startsWith('http'));
    
    // Extract canonical URL
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null;
    
    // Count words in content
    const bodyText = document.querySelector('body')?.textContent || '';
    const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
    
    // Get images
    const imageElements = Array.from(document.querySelectorAll('img'));
    const images = imageElements.map(img => ({
      src: img.getAttribute('src') || '',
      alt: img.getAttribute('alt'),
      width: img.getAttribute('width') ? parseInt(img.getAttribute('width') || '0') : null,
      height: img.getAttribute('height') ? parseInt(img.getAttribute('height') || '0') : null,
    }));
    
    // Extract all meta tags
    const metaTags = Array.from(document.querySelectorAll('meta'));
    const meta: Record<string, string> = {};
    metaTags.forEach(tag => {
      const name = tag.getAttribute('name') || tag.getAttribute('property');
      const content = tag.getAttribute('content');
      if (name && content) {
        meta[name] = content;
      }
    });
    
    return {
      url,
      title,
      description: metaDescription,
      h1Tags,
      h2Tags,
      internalLinks,
      externalLinks,
      canonical,
      wordCount,
      imageCount: images.length,
      images,
      meta
    };
  }

  /**
   * Main crawl method
   */
  public async crawl(): Promise<CrawlResult> {
    const startTime = new Date();
    const pages: PageData[] = [];
    const urlsToVisit: string[] = [this.baseUrl + '/'];
    
    logger.info(`Starting crawl of ${this.baseUrl}`);
    
    while (urlsToVisit.length > 0 && pages.length < this.maxPages) {
      const url = urlsToVisit.shift()!;
      
      if (!this.shouldCrawl(url)) {
        continue;
      }
      
      this.visitedUrls.add(url);
      
      try {
        logger.info(`Crawling: ${url}`);
        
        const response = await axios.get(url, {
          headers: {
            'User-Agent': this.userAgent
          },
          timeout: this.timeout,
          responseType: 'text'
        });
        
        if (response.status === 200) {
          const pageData = this.parsePage(url, response.data);
          pages.push(pageData);
          
          // Add new URLs to the queue
          pageData.internalLinks.forEach(link => {
            if (!this.visitedUrls.has(link) && !urlsToVisit.includes(link)) {
              urlsToVisit.push(link);
            }
          });
        }
        
        // Respect crawl delay
        await new Promise(resolve => setTimeout(resolve, this.crawlDelay));
      } catch (error) {
        logger.error(`Error crawling ${url}:`, error);
      }
    }
    
    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();
    
    logger.info(`Crawl completed: ${pages.length} pages crawled in ${duration}ms`);
    
    return {
      pages,
      totalUrls: this.visitedUrls.size,
      startTime,
      endTime,
      duration
    };
  }

  /**
   * Save crawl results to database
   */
  public async saveCrawlResults(result: CrawlResult): Promise<void> {
    try {
      // Create a new audit report
      const report = await storageSeo.createReport({
        date: new Date(),
        overallScore: this.calculateOverallScore(result),
        newIssues: 0,
        fixedIssues: 0,
        totalIssues: 0
      });
      
      // Process pages and create issues
      for (const page of result.pages) {
        // Create page audit record
        const pageAudit = await storageSeo.createPageAudit({
          reportId: report.id,
          url: page.url,
          title: page.title || '',
          description: page.description || '',
          wordCount: page.wordCount,
          status: 200
        });
        
        // Generate issues based on audit
        const issues = this.generateIssues(page);
        
        // Save issues to database
        for (const issue of issues) {
          await storageSeo.createIssue({
            title: issue.title,
            description: issue.description,
            url: page.url,
            severity: issue.severity,
            type: issue.type,
            detectedDate: new Date(),
            fixed: false,
            ignored: false,
            reportId: report.id,
            pageAuditId: pageAudit.id,
            autoFixable: issue.autoFixable || false
          });
        }
      }
      
      // Update report with issue counts
      const issues = await storageSeo.getIssuesByReportId(report.id);
      await storageSeo.updateReport(report.id, {
        totalIssues: issues.length,
        newIssues: issues.length
      });
      
      logger.info(`Saved crawl results to database: ${result.pages.length} pages, ${issues.length} issues`);
    } catch (error) {
      logger.error('Error saving crawl results:', error);
      throw error;
    }
  }
  
  /**
   * Calculate overall SEO score based on issues
   */
  private calculateOverallScore(result: CrawlResult): number {
    // Start with perfect score
    let score = 100;
    
    // Count issues by severity
    let criticalIssues = 0;
    let majorIssues = 0;
    let minorIssues = 0;
    
    // Process all pages
    for (const page of result.pages) {
      const issues = this.generateIssues(page);
      
      // Count issues by severity
      criticalIssues += issues.filter(i => i.severity === 'critical').length;
      majorIssues += issues.filter(i => i.severity === 'major').length;
      minorIssues += issues.filter(i => i.severity === 'minor').length;
    }
    
    // Reduce score based on issues
    score -= criticalIssues * 10; // -10 points per critical issue
    score -= majorIssues * 5;    // -5 points per major issue
    score -= minorIssues * 2;    // -2 points per minor issue
    
    // Ensure score is in 0-100 range
    return Math.max(0, Math.min(100, score));
  }
  
  /**
   * Generate SEO issues for a page
   */
  private generateIssues(page: PageData): Array<{
    title: string;
    description: string;
    severity: 'critical' | 'major' | 'minor';
    type: string;
    autoFixable?: boolean;
  }> {
    const issues: Array<{
      title: string;
      description: string;
      severity: 'critical' | 'major' | 'minor';
      type: string;
      autoFixable?: boolean;
    }> = [];
    
    // Check for missing title
    if (!page.title) {
      issues.push({
        title: 'Missing title tag',
        description: `The page at ${page.url} is missing a title tag. Each page should have a unique, descriptive title.`,
        severity: 'critical',
        type: 'meta',
        autoFixable: true
      });
    } else if (page.title.length < 10) {
      issues.push({
        title: 'Title too short',
        description: `The title on ${page.url} is too short (${page.title.length} characters). Aim for 50-60 characters.`,
        severity: 'major',
        type: 'meta',
        autoFixable: true
      });
    } else if (page.title.length > 70) {
      issues.push({
        title: 'Title too long',
        description: `The title on ${page.url} is too long (${page.title.length} characters). Search engines typically show only 50-60 characters.`,
        severity: 'minor',
        type: 'meta',
        autoFixable: true
      });
    }
    
    // Check for missing meta description
    if (!page.description) {
      issues.push({
        title: 'Missing meta description',
        description: `The page at ${page.url} is missing a meta description. Each page should have a unique, descriptive meta description.`,
        severity: 'major',
        type: 'meta',
        autoFixable: true
      });
    } else if (page.description.length < 50) {
      issues.push({
        title: 'Meta description too short',
        description: `The meta description on ${page.url} is too short (${page.description.length} characters). Aim for 120-158 characters.`,
        severity: 'minor',
        type: 'meta',
        autoFixable: true
      });
    } else if (page.description.length > 158) {
      issues.push({
        title: 'Meta description too long',
        description: `The meta description on ${page.url} is too long (${page.description.length} characters). Search engines typically show only 120-158 characters.`,
        severity: 'minor',
        type: 'meta',
        autoFixable: true
      });
    }
    
    // Check for missing H1
    if (page.h1Tags.length === 0) {
      issues.push({
        title: 'Missing H1 tag',
        description: `The page at ${page.url} is missing an H1 tag. Each page should have at least one H1 tag.`,
        severity: 'major',
        type: 'content',
        autoFixable: false
      });
    } else if (page.h1Tags.length > 1) {
      issues.push({
        title: 'Multiple H1 tags',
        description: `The page at ${page.url} has ${page.h1Tags.length} H1 tags. Each page should typically have only one H1 tag.`,
        severity: 'minor',
        type: 'content',
        autoFixable: false
      });
    }
    
    // Check for low word count
    if (page.wordCount < 300) {
      issues.push({
        title: 'Low word count',
        description: `The page at ${page.url} has only ${page.wordCount} words. Pages with thin content may perform poorly in search rankings.`,
        severity: 'major',
        type: 'content',
        autoFixable: false
      });
    }
    
    // Check for images without alt text
    const imagesWithoutAlt = page.images.filter(img => !img.alt);
    if (imagesWithoutAlt.length > 0) {
      issues.push({
        title: 'Images missing alt text',
        description: `The page at ${page.url} has ${imagesWithoutAlt.length} images without alt text. All images should have descriptive alt text for accessibility and SEO.`,
        severity: 'major',
        type: 'accessibility',
        autoFixable: false
      });
    }
    
    // Check for canonical tag
    if (!page.canonical) {
      issues.push({
        title: 'Missing canonical tag',
        description: `The page at ${page.url} is missing a canonical tag. Canonical tags help prevent duplicate content issues.`,
        severity: 'minor',
        type: 'meta',
        autoFixable: true
      });
    }
    
    return issues;
  }
}

/**
 * Run a website crawl and save results to the database
 */
export async function crawlAndSaveResults(baseUrl: string, maxPages = 20): Promise<void> {
  try {
    logger.info(`Starting crawl of ${baseUrl}`);
    
    const crawler = new SEOCrawler({
      baseUrl,
      maxPages,
      crawlDelay: 1000 // Be respectful with crawl delay
    });
    
    const result = await crawler.crawl();
    await crawler.saveCrawlResults(result);
    
    logger.info('Crawl and analysis completed successfully');
  } catch (error) {
    logger.error('Error during crawl and analyze:', error);
    throw error;
  }
}