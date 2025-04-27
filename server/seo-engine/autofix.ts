import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import axios from 'axios';
import { createLogger } from '../logger';
import { SEOIssue, FixStatus } from './types';
import { storageSeo } from './storage';
import { BASE_URL } from './crawler';

const logger = createLogger('seo-autofix');

/**
 * SEO Auto-fix Engine
 * Automatically fixes common SEO issues in HTML files
 */
export class AutoFixEngine {
  private fileCache: Map<string, string> = new Map();
  private fixAttempts: Map<string, number> = new Map();
  private readonly MAX_FIX_ATTEMPTS = 3;
  
  constructor() {
    // Initialize
  }
  
  /**
   * Get a list of issues that can be automatically fixed
   */
  async getFixableIssues(): Promise<SEOIssue[]> {
    const allIssues = await storageSeo.getAllIssues();
    
    return allIssues.filter(issue => 
      // Only include issues that haven't been fixed or ignored
      !issue.fixed && 
      !issue.ignored &&
      // And are fixable by the auto-fix engine
      this.isIssueFixable(issue)
    );
  }
  
  /**
   * Fix all fixable issues automatically
   */
  async fixAllIssues(): Promise<{
    succeeded: number;
    failed: number;
    issues: Array<{ id: string; status: FixStatus; result?: string }>
  }> {
    const fixableIssues = await this.getFixableIssues();
    logger.info(`Found ${fixableIssues.length} fixable issues`);
    
    let succeeded = 0;
    let failed = 0;
    const issueResults: Array<{ id: string; status: FixStatus; result?: string }> = [];
    
    for (const issue of fixableIssues) {
      try {
        const result = await this.fixIssue(issue);
        issueResults.push({
          id: issue.id,
          status: result.status,
          result: result.message
        });
        
        if (result.status === FixStatus.Fixed) {
          succeeded++;
        } else if (result.status === FixStatus.Failed) {
          failed++;
        }
      } catch (error) {
        logger.error(`Error fixing issue ${issue.id}:`, error);
        issueResults.push({
          id: issue.id,
          status: FixStatus.Failed,
          result: error.message
        });
        failed++;
      }
    }
    
    return { succeeded, failed, issues: issueResults };
  }
  
  /**
   * Fix a single issue automatically
   */
  async fixIssue(issue: SEOIssue): Promise<{ status: FixStatus; message?: string }> {
    // Check if we've already tried to fix this issue too many times
    const attempts = this.fixAttempts.get(issue.id) || 0;
    if (attempts >= this.MAX_FIX_ATTEMPTS) {
      return { 
        status: FixStatus.Failed, 
        message: `Maximum fix attempts (${this.MAX_FIX_ATTEMPTS}) reached` 
      };
    }
    
    this.fixAttempts.set(issue.id, attempts + 1);
    
    // Update issue status
    issue.autoFixStatus = FixStatus.InProgress;
    issue.autoFixAttemptedAt = new Date();
    await storageSeo.saveIssue(issue);
    
    // Get the appropriate fix function
    const fixFunction = this.getFixFunction(issue);
    if (!fixFunction) {
      issue.autoFixStatus = FixStatus.NotApplicable;
      await storageSeo.saveIssue(issue);
      return { 
        status: FixStatus.NotApplicable,
        message: 'No fix function available for this issue'
      };
    }
    
    try {
      // Execute the fix
      const result = await fixFunction(issue);
      
      // Update issue status based on fix result
      issue.autoFixStatus = result.status;
      issue.autoFixResult = result.message;
      
      if (result.status === FixStatus.Fixed) {
        issue.fixed = new Date();
      }
      
      await storageSeo.saveIssue(issue);
      return result;
    } catch (error) {
      logger.error(`Error executing fix for issue ${issue.id}:`, error);
      issue.autoFixStatus = FixStatus.Failed;
      issue.autoFixResult = error.message;
      await storageSeo.saveIssue(issue);
      
      return {
        status: FixStatus.Failed,
        message: `Error: ${error.message}`
      };
    }
  }
  
  /**
   * Check if an issue can be automatically fixed
   */
  private isIssueFixable(issue: SEOIssue): boolean {
    // First check if there's a fix function for this issue
    const fixFunction = this.getFixFunction(issue);
    if (!fixFunction) {
      return false;
    }
    
    // Only certain categories are fixable automatically
    const fixableCategories = [
      'meta_tags',
      'links',
      'schema',
      'structure'
    ];
    
    return fixableCategories.includes(issue.category);
  }
  
  /**
   * Get the appropriate fix function for an issue
   */
  private getFixFunction(issue: SEOIssue): ((issue: SEOIssue) => Promise<{ status: FixStatus; message?: string }>) | null {
    // Map issue types to fix functions
    const fixFunctions: Record<string, (issue: SEOIssue) => Promise<{ status: FixStatus; message?: string }>> = {
      'missing_meta_description': this.fixMissingMetaDescription.bind(this),
      'missing_title': this.fixMissingTitle.bind(this),
      'title_too_short': this.fixTitleTooShort.bind(this),
      'title_too_long': this.fixTitleTooLong.bind(this),
      'description_too_short': this.fixMetaDescriptionTooShort.bind(this),
      'description_too_long': this.fixMetaDescriptionTooLong.bind(this),
      'missing_canonical': this.fixMissingCanonical.bind(this),
      'missing_viewport': this.fixMissingViewport.bind(this),
      'missing_structured_data': this.fixMissingStructuredData.bind(this),
      'missing_h1': this.fixMissingH1.bind(this),
      'multiple_h1': this.fixMultipleH1.bind(this),
      'generic_link_text': this.fixGenericLinkText.bind(this),
      'missing_noopener': this.fixMissingNoopener.bind(this)
    };
    
    // Extract issue type from the ID (e.g., 'missing_meta_description_abc123' -> 'missing_meta_description')
    const issueType = issue.id.split('_').slice(0, -1).join('_');
    
    return fixFunctions[issueType] || null;
  }
  
  /**
   * Load HTML content from a URL or filesystem
   */
  private async loadHtml(url: string): Promise<{ dom: JSDOM; html: string }> {
    // Check if we've already loaded this URL
    if (this.fileCache.has(url)) {
      const html = this.fileCache.get(url)!;
      return { dom: new JSDOM(html), html };
    }
    
    try {
      // Fetch the HTML content
      logger.info(`Fetching HTML from ${url}`);
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'HempLaunch-SEO-AutoFix/1.0'
        }
      });
      
      const html = response.data;
      this.fileCache.set(url, html);
      
      return { dom: new JSDOM(html), html };
    } catch (error) {
      logger.error(`Error loading HTML from ${url}:`, error);
      throw new Error(`Failed to load HTML: ${error.message}`);
    }
  }
  
  /**
   * Save modified HTML content
   * In a production environment, this would commit changes to a Git repository,
   * or update a CMS via API. For this example, we'll just log the changes.
   */
  private async saveHtml(url: string, html: string): Promise<void> {
    // Update the cache
    this.fileCache.set(url, html);
    
    // In a real implementation, this would save the HTML to disk or send to a CMS
    logger.info(`Would save HTML changes for ${url}`);
    
    // For development, we'll just log what would change
    return Promise.resolve();
  }
  
  // FIX FUNCTIONS
  
  /**
   * Fix missing meta description
   */
  private async fixMissingMetaDescription(issue: SEOIssue): Promise<{ status: FixStatus; message?: string }> {
    if (!issue.url) {
      return { status: FixStatus.Failed, message: 'No URL provided' };
    }
    
    try {
      const { dom, html } = await this.loadHtml(issue.url);
      const document = dom.window.document;
      
      // Check if meta description already exists
      const existingMeta = document.querySelector('meta[name="description"]');
      if (existingMeta) {
        return { status: FixStatus.NotApplicable, message: 'Meta description already exists' };
      }
      
      // Generate a meta description based on page content
      const pageTitle = document.title || '';
      const h1 = document.querySelector('h1')?.textContent || '';
      const mainContent = document.querySelector('main')?.textContent || 
                         document.querySelector('article')?.textContent || 
                         document.body.textContent || '';
      
      // Create a description using the first 150 characters of content
      const contentText = (h1 + ' ' + mainContent).trim();
      const description = contentText.slice(0, 150) + (contentText.length > 150 ? '...' : '');
      
      // Create new meta tag
      const metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'description');
      metaTag.setAttribute('content', description);
      
      // Append to head
      const head = document.querySelector('head');
      if (!head) {
        return { status: FixStatus.Failed, message: 'No head element found' };
      }
      
      head.appendChild(metaTag);
      
      // Get the modified HTML
      const modifiedHtml = dom.serialize();
      
      // Save the changes
      await this.saveHtml(issue.url, modifiedHtml);
      
      return { 
        status: FixStatus.Fixed, 
        message: `Added meta description: "${description}"` 
      };
    } catch (error) {
      logger.error(`Error fixing missing meta description for ${issue.url}:`, error);
      return { status: FixStatus.Failed, message: error.message };
    }
  }
  
  /**
   * Fix missing title
   */
  private async fixMissingTitle(issue: SEOIssue): Promise<{ status: FixStatus; message?: string }> {
    if (!issue.url) {
      return { status: FixStatus.Failed, message: 'No URL provided' };
    }
    
    try {
      const { dom, html } = await this.loadHtml(issue.url);
      const document = dom.window.document;
      
      // Check if title already exists
      const existingTitle = document.querySelector('title');
      if (existingTitle && existingTitle.textContent?.trim()) {
        return { status: FixStatus.NotApplicable, message: 'Title already exists' };
      }
      
      // Generate a title based on page content
      const h1 = document.querySelector('h1')?.textContent?.trim() || '';
      const url = new URL(issue.url);
      const pageNameFromUrl = url.pathname.split('/').filter(Boolean).pop() || '';
      const pageName = pageNameFromUrl.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      const title = h1 || pageName || 'Page Title';
      
      // Create or update title tag
      if (existingTitle) {
        existingTitle.textContent = title;
      } else {
        const titleTag = document.createElement('title');
        titleTag.textContent = title;
        
        const head = document.querySelector('head');
        if (!head) {
          return { status: FixStatus.Failed, message: 'No head element found' };
        }
        
        head.appendChild(titleTag);
      }
      
      // Get the modified HTML
      const modifiedHtml = dom.serialize();
      
      // Save the changes
      await this.saveHtml(issue.url, modifiedHtml);
      
      return { 
        status: FixStatus.Fixed, 
        message: `Added title: "${title}"` 
      };
    } catch (error) {
      logger.error(`Error fixing missing title for ${issue.url}:`, error);
      return { status: FixStatus.Failed, message: error.message };
    }
  }
  
  /**
   * Fix title that's too short (implement additional fix functions as needed)
   */
  private async fixTitleTooShort(issue: SEOIssue): Promise<{ status: FixStatus; message?: string }> {
    // Similar implementation to other fix functions
    return { status: FixStatus.NotApplicable, message: 'Implementation pending' };
  }
  
  /**
   * Fix title that's too long
   */
  private async fixTitleTooLong(issue: SEOIssue): Promise<{ status: FixStatus; message?: string }> {
    // Similar implementation to other fix functions
    return { status: FixStatus.NotApplicable, message: 'Implementation pending' };
  }
  
  /**
   * Fix meta description that's too short
   */
  private async fixMetaDescriptionTooShort(issue: SEOIssue): Promise<{ status: FixStatus; message?: string }> {
    // Similar implementation to other fix functions
    return { status: FixStatus.NotApplicable, message: 'Implementation pending' };
  }
  
  /**
   * Fix meta description that's too long
   */
  private async fixMetaDescriptionTooLong(issue: SEOIssue): Promise<{ status: FixStatus; message?: string }> {
    // Similar implementation to other fix functions
    return { status: FixStatus.NotApplicable, message: 'Implementation pending' };
  }
  
  /**
   * Fix missing canonical tag
   */
  private async fixMissingCanonical(issue: SEOIssue): Promise<{ status: FixStatus; message?: string }> {
    if (!issue.url) {
      return { status: FixStatus.Failed, message: 'No URL provided' };
    }
    
    try {
      const { dom, html } = await this.loadHtml(issue.url);
      const document = dom.window.document;
      
      // Check if canonical already exists
      const existingCanonical = document.querySelector('link[rel="canonical"]');
      if (existingCanonical) {
        return { status: FixStatus.NotApplicable, message: 'Canonical link already exists' };
      }
      
      // Create new canonical tag
      const canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      canonicalTag.setAttribute('href', issue.url);
      
      // Append to head
      const head = document.querySelector('head');
      if (!head) {
        return { status: FixStatus.Failed, message: 'No head element found' };
      }
      
      head.appendChild(canonicalTag);
      
      // Get the modified HTML
      const modifiedHtml = dom.serialize();
      
      // Save the changes
      await this.saveHtml(issue.url, modifiedHtml);
      
      return { 
        status: FixStatus.Fixed, 
        message: `Added canonical link: "${issue.url}"` 
      };
    } catch (error) {
      logger.error(`Error fixing missing canonical for ${issue.url}:`, error);
      return { status: FixStatus.Failed, message: error.message };
    }
  }
  
  /**
   * Fix missing viewport meta tag
   */
  private async fixMissingViewport(issue: SEOIssue): Promise<{ status: FixStatus; message?: string }> {
    if (!issue.url) {
      return { status: FixStatus.Failed, message: 'No URL provided' };
    }
    
    try {
      const { dom, html } = await this.loadHtml(issue.url);
      const document = dom.window.document;
      
      // Check if viewport already exists
      const existingViewport = document.querySelector('meta[name="viewport"]');
      if (existingViewport) {
        return { status: FixStatus.NotApplicable, message: 'Viewport meta tag already exists' };
      }
      
      // Create new viewport tag
      const viewportTag = document.createElement('meta');
      viewportTag.setAttribute('name', 'viewport');
      viewportTag.setAttribute('content', 'width=device-width, initial-scale=1');
      
      // Append to head
      const head = document.querySelector('head');
      if (!head) {
        return { status: FixStatus.Failed, message: 'No head element found' };
      }
      
      head.appendChild(viewportTag);
      
      // Get the modified HTML
      const modifiedHtml = dom.serialize();
      
      // Save the changes
      await this.saveHtml(issue.url, modifiedHtml);
      
      return { 
        status: FixStatus.Fixed, 
        message: 'Added viewport meta tag' 
      };
    } catch (error) {
      logger.error(`Error fixing missing viewport for ${issue.url}:`, error);
      return { status: FixStatus.Failed, message: error.message };
    }
  }
  
  /**
   * Fix missing structured data
   */
  private async fixMissingStructuredData(issue: SEOIssue): Promise<{ status: FixStatus; message?: string }> {
    if (!issue.url) {
      return { status: FixStatus.Failed, message: 'No URL provided' };
    }
    
    try {
      const { dom, html } = await this.loadHtml(issue.url);
      const document = dom.window.document;
      
      // Check if structured data already exists
      const existingStructuredData = document.querySelector('script[type="application/ld+json"]');
      if (existingStructuredData) {
        return { status: FixStatus.NotApplicable, message: 'Structured data already exists' };
      }
      
      // Generate basic structured data
      const title = document.title || '';
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      const h1 = document.querySelector('h1')?.textContent || '';
      
      const url = new URL(issue.url);
      const organizationName = 'HempLaunch';
      
      // Create basic webpage structured data
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'url': issue.url,
        'name': title,
        'description': description,
        'isPartOf': {
          '@type': 'WebSite',
          'url': `${url.protocol}//${url.host}`,
          'name': organizationName,
          'description': 'All-in-One Hemp Business Solutions'
        }
      };
      
      // Create script tag for structured data
      const scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.textContent = JSON.stringify(structuredData, null, 2);
      
      // Append to head
      const head = document.querySelector('head');
      if (!head) {
        return { status: FixStatus.Failed, message: 'No head element found' };
      }
      
      head.appendChild(scriptTag);
      
      // Get the modified HTML
      const modifiedHtml = dom.serialize();
      
      // Save the changes
      await this.saveHtml(issue.url, modifiedHtml);
      
      return { 
        status: FixStatus.Fixed, 
        message: 'Added basic structured data' 
      };
    } catch (error) {
      logger.error(`Error fixing missing structured data for ${issue.url}:`, error);
      return { status: FixStatus.Failed, message: error.message };
    }
  }
  
  /**
   * Fix missing H1 heading
   */
  private async fixMissingH1(issue: SEOIssue): Promise<{ status: FixStatus; message?: string }> {
    // Similar implementation to other fix functions
    return { status: FixStatus.NotApplicable, message: 'Implementation pending' };
  }
  
  /**
   * Fix multiple H1 headings
   */
  private async fixMultipleH1(issue: SEOIssue): Promise<{ status: FixStatus; message?: string }> {
    // Similar implementation to other fix functions
    return { status: FixStatus.NotApplicable, message: 'Implementation pending' };
  }
  
  /**
   * Fix generic link text
   */
  private async fixGenericLinkText(issue: SEOIssue): Promise<{ status: FixStatus; message?: string }> {
    // Similar implementation to other fix functions
    return { status: FixStatus.NotApplicable, message: 'Implementation pending' };
  }
  
  /**
   * Fix missing noopener attribute on external links
   */
  private async fixMissingNoopener(issue: SEOIssue): Promise<{ status: FixStatus; message?: string }> {
    // Similar implementation to other fix functions
    return { status: FixStatus.NotApplicable, message: 'Implementation pending' };
  }
}

// Export a singleton instance
export const autoFixEngine = new AutoFixEngine();