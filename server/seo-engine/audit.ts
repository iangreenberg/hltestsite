import axios from 'axios';
import { JSDOM } from 'jsdom';
import { v4 as uuidv4 } from 'uuid';
import { createLogger } from '../logger';
import { 
  SEOIssue, 
  SeverityLevel, 
  IssueCategory, 
  PageAudit,
  KeywordRanking,
  PerformanceMetric
} from './types';
import { BASE_URL, createCrawler } from './crawler';
import { storageSeo } from './storage';

const logger = createLogger('seo-audit');

/**
 * Runs a complete SEO audit for a URL
 */
export async function auditPage(url: string): Promise<PageAudit> {
  try {
    logger.info(`Starting SEO audit for ${url}`);
    
    // Load page content using the crawler
    const crawler = createCrawler();
    const crawledPage = await crawler.crawlPage(url);
    
    if (!crawledPage || crawledPage.statusCode !== 200) {
      throw new Error(`Failed to load page: ${url}, status: ${crawledPage ? crawledPage.statusCode : 'unknown'}`);
    }
    
    // Create DOM from HTML
    const dom = new JSDOM(crawledPage.html);
    
    // Extract basic page metadata
    const title = crawledPage.title;
    const metaTags = crawledPage.metaTags;
    const metaDescription = metaTags.find(tag => tag.name === 'description')?.content || '';
    const h1Elements = crawledPage.h1;
    const wordCount = countWords(dom.window.document.body.textContent || '');
    
    // Run various checks
    const issues = [
      ...checkMetaTags(url, metaTags, title),
      ...checkHeadings(url, dom),
      ...checkImages(url, dom),
      ...checkLinks(url, dom),
      ...checkMobileOptimization(url, metaTags),
      ...checkPerformance(url),
      ...checkStructuredData(url, crawledPage.html)
    ];
    
    // Count issues by severity
    const issueCount = {
      critical: issues.filter(i => i.severity === SeverityLevel.Critical).length,
      high: issues.filter(i => i.severity === SeverityLevel.High).length,
      medium: issues.filter(i => i.severity === SeverityLevel.Medium).length,
      low: issues.filter(i => i.severity === SeverityLevel.Low).length,
      info: issues.filter(i => i.severity === SeverityLevel.Info).length
    };
    
    // Calculate SEO score (100 - weighted issues)
    const score = calculateSEOScore(issueCount);
    
    // Create and return audit result
    const audit: PageAudit = {
      url,
      title,
      metaDescription,
      h1: h1Elements,
      wordCount,
      issueCount,
      auditedAt: new Date(),
      issues,
      score
    };
    
    // Store the audit
    await storageSeo.savePageAudit(audit);
    
    logger.info(`Audit completed for ${url} with score ${score}`);
    return audit;
    
  } catch (error) {
    logger.error(`Error auditing page ${url}:`, error);
    throw error;
  }
}

/**
 * Checks meta tags for SEO issues
 */
function checkMetaTags(url: string, metaTags: Array<{name: string, content: string}>, title: string): SEOIssue[] {
  const issues: SEOIssue[] = [];
  
  // Check title length
  if (!title) {
    issues.push(createIssue(
      'missing_title',
      'Missing page title',
      'The page does not have a title tag, which is critical for SEO.',
      SeverityLevel.Critical,
      IssueCategory.MetaTags,
      url,
      '<title>',
      'Add a descriptive, keyword-rich title between 50-60 characters.'
    ));
  } else if (title.length < 30) {
    issues.push(createIssue(
      'title_too_short',
      'Title tag too short',
      'The page title is shorter than 30 characters, which is not optimal for SEO.',
      SeverityLevel.Medium,
      IssueCategory.MetaTags,
      url,
      '<title>',
      'Make the title more descriptive and aim for 50-60 characters.'
    ));
  } else if (title.length > 60) {
    issues.push(createIssue(
      'title_too_long',
      'Title tag too long',
      'The page title exceeds 60 characters and may be truncated in search results.',
      SeverityLevel.Low,
      IssueCategory.MetaTags,
      url,
      '<title>',
      'Shorten the title to 50-60 characters while keeping important keywords.'
    ));
  }
  
  // Check meta description
  const description = metaTags.find(tag => tag.name === 'description');
  if (!description) {
    issues.push(createIssue(
      'missing_description',
      'Missing meta description',
      'The page does not have a meta description, which is important for SEO and click-through rates.',
      SeverityLevel.High,
      IssueCategory.MetaTags,
      url,
      '<meta name="description">',
      'Add a compelling meta description between 120-155 characters.'
    ));
  } else if (description.content.length < 70) {
    issues.push(createIssue(
      'description_too_short',
      'Meta description too short',
      'The meta description is shorter than 70 characters, which is not optimal for SEO.',
      SeverityLevel.Medium,
      IssueCategory.MetaTags,
      url,
      '<meta name="description">',
      'Make the description more compelling and aim for 120-155 characters.'
    ));
  } else if (description.content.length > 155) {
    issues.push(createIssue(
      'description_too_long',
      'Meta description too long',
      'The meta description exceeds 155 characters and may be truncated in search results.',
      SeverityLevel.Low,
      IssueCategory.MetaTags,
      url,
      '<meta name="description">',
      'Shorten the description to 120-155 characters while keeping it compelling.'
    ));
  }
  
  // Check for canonical URL
  const canonical = metaTags.find(tag => tag.name === 'canonical');
  if (!canonical) {
    issues.push(createIssue(
      'missing_canonical',
      'Missing canonical tag',
      'The page does not have a canonical URL specified, which can lead to duplicate content issues.',
      SeverityLevel.Medium,
      IssueCategory.MetaTags,
      url,
      '<link rel="canonical">',
      `Add a canonical tag: <link rel="canonical" href="${url}">`
    ));
  }
  
  // Check for viewport meta tag
  const viewport = metaTags.find(tag => tag.name === 'viewport');
  if (!viewport) {
    issues.push(createIssue(
      'missing_viewport',
      'Missing viewport meta tag',
      'The page does not have a viewport meta tag, which is essential for mobile optimization.',
      SeverityLevel.High,
      IssueCategory.Mobile,
      url,
      '<meta name="viewport">',
      'Add a viewport meta tag: <meta name="viewport" content="width=device-width, initial-scale=1">'
    ));
  }
  
  return issues;
}

/**
 * Checks heading structure for SEO issues
 */
function checkHeadings(url: string, dom: JSDOM): SEOIssue[] {
  const issues: SEOIssue[] = [];
  const document = dom.window.document;
  
  // Check for H1 heading
  const h1Elements = document.querySelectorAll('h1');
  if (h1Elements.length === 0) {
    issues.push(createIssue(
      'missing_h1',
      'Missing H1 heading',
      'The page does not have an H1 heading, which is important for SEO and document structure.',
      SeverityLevel.High,
      IssueCategory.Structure,
      url,
      '<h1>',
      'Add an H1 heading that contains your primary keyword.'
    ));
  } else if (h1Elements.length > 1) {
    issues.push(createIssue(
      'multiple_h1',
      'Multiple H1 headings',
      `The page has ${h1Elements.length} H1 headings. It's best practice to have only one H1 heading per page.`,
      SeverityLevel.Medium,
      IssueCategory.Structure,
      url,
      '<h1>',
      'Keep only one H1 heading that contains your primary keyword.'
    ));
  }
  
  // Check for heading hierarchy
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  let previousLevel = 0;
  
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    const level = parseInt(heading.tagName.substring(1));
    
    // Check for skipped heading levels (e.g., h1 -> h3)
    if (level > previousLevel + 1 && previousLevel !== 0) {
      issues.push(createIssue(
        'skipped_heading_level',
        'Skipped heading level',
        `Heading hierarchy skips from H${previousLevel} to H${level}, which can confuse screen readers and hurt SEO.`,
        SeverityLevel.Medium,
        IssueCategory.Structure,
        url,
        heading.tagName.toLowerCase(),
        `Consider adding an H${previousLevel + 1} heading before this H${level} heading.`
      ));
    }
    
    previousLevel = level;
  }
  
  return issues;
}

/**
 * Checks images for SEO issues
 */
function checkImages(url: string, dom: JSDOM): SEOIssue[] {
  const issues: SEOIssue[] = [];
  const images = dom.window.document.querySelectorAll('img');
  
  images.forEach((img, index) => {
    const alt = img.getAttribute('alt');
    const src = img.getAttribute('src');
    
    // Check for missing alt attribute
    if (!alt && img.getAttribute('role') !== 'presentation') {
      issues.push(createIssue(
        `missing_alt_${index}`,
        'Missing image alt text',
        'Image has no alt attribute, which is important for accessibility and SEO.',
        SeverityLevel.Medium,
        IssueCategory.Content,
        url,
        `<img src="${src}">`,
        'Add descriptive alt text to the image.'
      ));
    } else if (alt && alt.length > 100) {
      issues.push(createIssue(
        `long_alt_${index}`,
        'Alt text too long',
        'Image alt text exceeds 100 characters, which is unnecessarily long.',
        SeverityLevel.Low,
        IssueCategory.Content,
        url,
        `<img src="${src}" alt="${alt}">`,
        'Shorten the alt text to be more concise while still being descriptive.'
      ));
    }
    
    // Check for missing width and height attributes
    if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
      issues.push(createIssue(
        `missing_dimensions_${index}`,
        'Missing image dimensions',
        'Image is missing width and/or height attributes, which can cause layout shifts and affect Core Web Vitals.',
        SeverityLevel.Medium,
        IssueCategory.Performance,
        url,
        `<img src="${src}">`,
        'Add width and height attributes to the image to prevent layout shifts.'
      ));
    }
  });
  
  return issues;
}

/**
 * Checks links for SEO issues
 */
function checkLinks(url: string, dom: JSDOM): SEOIssue[] {
  const issues: SEOIssue[] = [];
  const links = dom.window.document.querySelectorAll('a');
  
  links.forEach((link, index) => {
    const href = link.getAttribute('href');
    const text = link.textContent?.trim();
    
    // Check for empty links
    if (!href || href === '#') {
      issues.push(createIssue(
        `empty_link_${index}`,
        'Empty or hash-only link',
        'Link has no destination (empty or # href), which is bad for SEO and user experience.',
        SeverityLevel.Medium,
        IssueCategory.Links,
        url,
        `<a href="${href || ''}">${text || ''}</a>`,
        'Add a proper URL to the href attribute or remove the link.'
      ));
    }
    
    // Check for generic link text
    if (text && ['click here', 'read more', 'learn more', 'more', 'link'].includes(text.toLowerCase())) {
      issues.push(createIssue(
        `generic_link_text_${index}`,
        'Generic link text',
        'Link uses generic text which is not descriptive and is bad for SEO and accessibility.',
        SeverityLevel.Low,
        IssueCategory.Links,
        url,
        `<a href="${href || ''}">${text}</a>`,
        'Use descriptive link text that explains where the link goes.'
      ));
    }
    
    // Check for links without rel="noopener" for external links
    if (href && href.startsWith('http') && !href.includes(BASE_URL) && !link.getAttribute('rel')?.includes('noopener')) {
      issues.push(createIssue(
        `missing_noopener_${index}`,
        'External link without noopener',
        'External link is missing rel="noopener" attribute, which is a security risk.',
        SeverityLevel.Low,
        IssueCategory.Security,
        url,
        `<a href="${href}">${text || ''}</a>`,
        'Add rel="noopener" to all external links.'
      ));
    }
  });
  
  return issues;
}

/**
 * Checks for mobile optimization issues
 */
function checkMobileOptimization(url: string, metaTags: Array<{name: string, content: string}>): SEOIssue[] {
  const issues: SEOIssue[] = [];
  
  // Check viewport meta tag
  const viewport = metaTags.find(tag => tag.name === 'viewport');
  if (viewport && !viewport.content.includes('width=device-width')) {
    issues.push(createIssue(
      'improper_viewport',
      'Improper viewport settings',
      'The viewport meta tag does not include width=device-width, which is necessary for responsive design.',
      SeverityLevel.Medium,
      IssueCategory.Mobile,
      url,
      '<meta name="viewport">',
      'Update the viewport meta tag: <meta name="viewport" content="width=device-width, initial-scale=1">'
    ));
  }
  
  // Other mobile checks can be added here
  // For example: checking touch target sizes, font sizes, etc.
  
  return issues;
}

/**
 * Check performance issues that impact SEO
 */
function checkPerformance(url: string): SEOIssue[] {
  // This would normally involve running Lighthouse or similar tools
  // For now, we'll return an empty array as a placeholder
  return [];
}

/**
 * Check structured data/schema markup
 */
function checkStructuredData(url: string, html: string): SEOIssue[] {
  const issues: SEOIssue[] = [];
  
  // Check for JSON-LD structured data
  if (!html.includes('<script type="application/ld+json">')) {
    issues.push(createIssue(
      'missing_structured_data',
      'Missing structured data markup',
      'The page does not have JSON-LD structured data, which helps search engines understand the content.',
      SeverityLevel.Medium,
      IssueCategory.Schema,
      url,
      '<script type="application/ld+json">',
      'Add appropriate JSON-LD structured data for this page type.'
    ));
  }
  
  return issues;
}

/**
 * Count words in text
 */
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Calculate SEO score based on issues
 */
function calculateSEOScore(issueCount: { critical: number; high: number; medium: number; low: number; info: number }): number {
  // Start with a perfect score
  let score = 100;
  
  // Subtract points based on issue severity
  score -= issueCount.critical * 15;
  score -= issueCount.high * 5;
  score -= issueCount.medium * 2;
  score -= issueCount.low * 0.5;
  
  // Ensure score doesn't go below 0
  return Math.max(0, Math.round(score));
}

/**
 * Create a new SEO issue
 */
function createIssue(
  id: string, 
  title: string, 
  description: string, 
  severity: SeverityLevel, 
  category: IssueCategory,
  url?: string,
  affectedElement?: string,
  recommendedFix?: string
): SEOIssue {
  return {
    id: `${id}_${uuidv4().substring(0, 8)}`,
    title,
    description,
    severity,
    category,
    url,
    affectedElement,
    recommendedFix,
    detected: new Date()
  };
}

/**
 * Run a complete site audit
 */
export async function auditSite(): Promise<{ url: string; score: number }[]> {
  try {
    logger.info('Starting site-wide SEO audit');
    
    // Get a list of URLs to audit
    const urls = [
      `${BASE_URL}/`, 
      `${BASE_URL}/packages`,
      `${BASE_URL}/how-it-works`,
      `${BASE_URL}/about`,
      `${BASE_URL}/contact`,
      `${BASE_URL}/blog`,
      `${BASE_URL}/services/compliance`,
      `${BASE_URL}/services/product-development`,
      `${BASE_URL}/services/brand-development`,
      `${BASE_URL}/services/distribution`,
      `${BASE_URL}/services/marketing`,
      `${BASE_URL}/services/support`,
      `${BASE_URL}/blog/farm-bill-updates`,
      `${BASE_URL}/blog/meta-ads-strategies`,
      `${BASE_URL}/blog/llc-vs-corporation`,
      `${BASE_URL}/blog/vetting-manufacturers`,
      `${BASE_URL}/blog/brand-differentiation`,
      `${BASE_URL}/blog/payment-processing`
    ];
    
    // Audit each URL
    const results = [];
    for (const url of urls) {
      try {
        const audit = await auditPage(url);
        results.push({
          url: url,
          score: audit.score
        });
      } catch (error) {
        logger.error(`Error auditing ${url}:`, error);
        results.push({
          url: url,
          score: 0
        });
      }
    }
    
    logger.info('Site-wide audit completed');
    return results;
  } catch (error) {
    logger.error('Error in site audit:', error);
    throw error;
  }
}