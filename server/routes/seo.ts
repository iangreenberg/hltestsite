import { Router, type Express } from "express";
import { createLogger } from "../logger";
import { db } from "../db";
import { sql } from "drizzle-orm";
import { z } from "zod";
import { storageSeo } from "../storageSeo";
import { seoReports, seoIssues, pageAudits } from "../../shared/schema";
import { JSDOM } from "jsdom";
import fetch from "node-fetch";

const logger = createLogger("seo-routes");
const router = Router();

// Raw proxy endpoint for diagnostic purposes
router.get("/raw-proxy", async (req, res) => {
  try {
    // Get target URL from request query params
    const targetUrl = req.query?.url as string;
    const method = ((req.query?.method as string) || 'GET').toUpperCase();
    
    if (!targetUrl) {
      return res.status(400).json({
        success: false,
        error: 'Missing target URL parameter'
      });
    }
    
    console.log(`Raw Proxy request to: ${targetUrl} (Method: ${method})`);
    
    // Prepare browser-like headers to avoid security blocks
    const headers = {
      'User-Agent': 'Mozilla/5.0 (HempLaunch SEO API Diagnostic Tool)',
      'Accept': 'application/json, text/html, */*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Origin': req.headers.origin || 'https://thehemplaunch.com',
      'Content-Type': 'application/json'
    };
    
    // Add optional body for non-GET requests
    const options: RequestInit = {
      method,
      headers,
      redirect: 'follow',
    };
    
    if (method !== 'GET' && req.body?.payload) {
      options.body = JSON.stringify(req.body.payload);
    }
    
    // Make the request to the target URL
    // @ts-ignore - Ignore TypeScript error about RequestInit body type
    const response = await fetch(targetUrl, options);
    
    // Get the raw response text
    const responseText = await response.text();
    
    // Collect headers information
    const headers_received: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers_received[key] = value;
    });
    
    // Attempt to parse JSON if content-type is application/json
    let parsedJson = null;
    let jsonError = null;
    
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      try {
        parsedJson = JSON.parse(responseText);
      } catch (error) {
        jsonError = `JSON parse error: ${(error as Error).message}`;
      }
    }
    
    // Return the complete diagnostic information
    return res.status(200).json({
      success: true,
      diagnostics: {
        url: targetUrl,
        method,
        status: response.status,
        statusText: response.statusText,
        headers_sent: headers,
        headers_received,
        response_size: responseText.length,
        response_content: responseText.substring(0, 5000), // Limit to first 5000 chars
        content_truncated: responseText.length > 5000,
        parsed_json: parsedJson,
        json_error: jsonError,
        is_text_html: contentType?.includes('text/html'),
        is_json: contentType?.includes('application/json'),
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Raw Proxy Error:', error);
    
    // Return detailed error information
    return res.status(500).json({
      success: false,
      error: "Error occurred during raw proxy request",
      error_details: {
        message: (error as Error).message,
        stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
      }
    });
  }
});

// Export function to register all SEO routes
export function registerSeoRoutes(apiApp: Express | Router) {
  // Mount all the routes defined in this file under /seo
  // @ts-ignore - Ignore TypeScript error about router assignment
  apiApp.use("/seo", router);
  
  logger.info("SEO routes registered successfully");
}

// This endpoint is used as a simple connectivity test
router.get("/test", async (req, res) => {
  try {
    res.json({ success: true });
  } catch (error) {
    logger.error("Error in test endpoint:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Endpoint to trigger a crawl of a website
router.post("/crawl", async (req, res) => {
  try {
    const schema = z.object({
      url: z.string().url(),
      maxPages: z.number().int().min(1).max(100).default(20)
    });

    const { url, maxPages } = schema.parse(req.body);
    
    logger.info(`Starting crawl for ${url} with max pages: ${maxPages}`);
    
    // Create a new report entry to associate with this crawl
    const [report] = await db.insert(seoReports).values({
      date: new Date(),
      totalIssues: JSON.stringify({ high: 0, medium: 0, low: 0, total: 0 }),
      newIssues: 0,
      fixedIssues: 0,
      overallScore: 0
    }).returning();
    
    logger.info(`Created report with ID: ${report.id}`);
    
    // Return immediately to client, continue processing in background
    res.status(200).json({ 
      success: true, 
      message: "Crawl started successfully", 
      reportId: report.id,
      timestamp: new Date().toISOString()
    });
    
    // Start the crawl process asynchronously (don't await)
    startCrawl(url, maxPages, report.id);
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error("Validation error:", error.errors);
      return res.status(400).json({ 
        success: false, 
        error: "Invalid request data", 
        details: error.errors 
      });
    }
    
    logger.error("Error starting crawl:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Function to handle the actual crawling process - runs in background
async function startCrawl(baseUrl: string, maxPages: number, reportId: number) {
  const visited = new Set<string>();
  const queue: string[] = [baseUrl];
  const issues: Array<{ 
    title: string;
    description: string;
    type: string;
    url: string | null;
    severity: string;
    reportId: number;
  }> = [];
  
  const pageData: Array<{
    url: string;
    title: string;
    reportId: number;
    metaDescription: string | null;
    h1: string | null;
    h2Count: number;
    wordCount: number;
    imageCount: number;
    imagesWithAlt: number;
    internalLinks: number;
    externalLinks: number;
  }> = [];

  // Process URLs until queue is empty or maxPages is reached
  while (queue.length > 0 && visited.size < maxPages) {
    const currentUrl = queue.shift()!;
    
    // Skip if already visited
    if (visited.has(currentUrl)) continue;
    visited.add(currentUrl);
    
    try {
      logger.info(`Crawling: ${currentUrl}`);
      const response = await fetch(currentUrl);
      const html = await response.text();
      const dom = new JSDOM(html);
      const document = dom.window.document;
      
      // Extract page data
      const title = document.title;
      const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || null;
      const h1Element = document.querySelector('h1');
      const h1Text = h1Element ? h1Element.textContent?.trim() : null;
      const h2Elements = document.querySelectorAll('h2');
      const images = document.querySelectorAll('img');
      const imagesWithAltCount = Array.from(images).filter(img => img.hasAttribute('alt') && img.getAttribute('alt')?.trim()).length;
      
      // Count words in the body
      const bodyText = document.body.textContent || '';
      const wordCount = bodyText.split(/\s+/).filter(word => word.length > 0).length;
      
      // Process links
      const links = document.querySelectorAll('a');
      const internalLinks: string[] = [];
      const externalLinks: string[] = [];
      
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        try {
          const url = new URL(href, currentUrl);
          
          if (url.origin === new URL(baseUrl).origin) {
            // Internal link
            internalLinks.push(url.href);
            
            // Add to queue if not already visited
            if (!visited.has(url.href) && !queue.includes(url.href)) {
              queue.push(url.href);
            }
          } else {
            // External link
            externalLinks.push(url.href);
          }
        } catch (e) {
          // Skip invalid URLs
        }
      });
      
      // Add page data to the collection
      pageData.push({
        url: currentUrl,
        title,
        reportId,
        metaDescription: metaDescription || null, // Ensure null instead of undefined
        h1: h1Text || null, // Ensure null instead of undefined
        h2Count: h2Elements.length,
        wordCount,
        imageCount: images.length,
        imagesWithAlt: imagesWithAltCount,
        internalLinks: internalLinks.length,
        externalLinks: externalLinks.length
      });
      
      // Check for issues
      
      // 1. Missing meta description
      if (!metaDescription) {
        issues.push({
          title: "Missing meta description",
          description: `The page at ${currentUrl} doesn't have a meta description.`,
          type: "meta",
          url: currentUrl,
          severity: "medium",
          reportId
        });
      } else if (metaDescription.length < 50) {
        issues.push({
          title: "Meta description too short",
          description: `The meta description on ${currentUrl} is only ${metaDescription.length} characters. It should be at least 50 characters.`,
          type: "meta",
          url: currentUrl,
          severity: "low",
          reportId
        });
      } else if (metaDescription.length > 160) {
        issues.push({
          title: "Meta description too long",
          description: `The meta description on ${currentUrl} is ${metaDescription.length} characters. It should be no more than 160 characters.`,
          type: "meta",
          url: currentUrl,
          severity: "low",
          reportId
        });
      }
      
      // 2. Missing H1
      if (!h1Text) {
        issues.push({
          title: "Missing H1 heading",
          description: `The page at ${currentUrl} doesn't have an H1 heading.`,
          type: "structure",
          url: currentUrl,
          severity: "high",
          reportId
        });
      }
      
      // 3. Title issues
      if (!title) {
        issues.push({
          title: "Missing page title",
          description: `The page at ${currentUrl} doesn't have a title.`,
          type: "meta",
          url: currentUrl,
          severity: "high",
          reportId
        });
      } else if (title.length < 10) {
        issues.push({
          title: "Page title too short",
          description: `The title on ${currentUrl} is only ${title.length} characters. It should be at least 10 characters.`,
          type: "meta",
          url: currentUrl,
          severity: "medium",
          reportId
        });
      } else if (title.length > 60) {
        issues.push({
          title: "Page title too long",
          description: `The title on ${currentUrl} is ${title.length} characters. It should be no more than 60 characters.`,
          type: "meta",
          url: currentUrl,
          severity: "low",
          reportId
        });
      }
      
      // 4. Images without alt text
      if (images.length > 0 && imagesWithAltCount < images.length) {
        issues.push({
          title: "Images missing alt text",
          description: `${images.length - imagesWithAltCount} out of ${images.length} images on ${currentUrl} are missing alt text.`,
          type: "accessibility",
          url: currentUrl,
          severity: "medium",
          reportId
        });
      }
      
      // 5. Low word count
      if (wordCount < 300) {
        issues.push({
          title: "Low word count",
          description: `The page at ${currentUrl} only has ${wordCount} words. Consider adding more content for better SEO.`,
          type: "content",
          url: currentUrl,
          severity: "medium",
          reportId
        });
      }
      
      // Wait a bit before the next request to avoid overloading the server
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      logger.error(`Error crawling ${currentUrl}:`, error);
      issues.push({
        title: "Crawl error",
        description: `Failed to crawl ${currentUrl}: ${error instanceof Error ? error.message : String(error)}`,
        type: "error",
        url: currentUrl,
        severity: "high",
        reportId
      });
    }
  }
  
  try {
    // Save page audits to database
    if (pageData.length > 0) {
      await db.insert(pageAudits).values(pageData);
      logger.info(`Saved ${pageData.length} page audits to database`);
    }
    
    // Save issues to database
    if (issues.length > 0) {
      await db.insert(seoIssues).values(issues);
      logger.info(`Saved ${issues.length} issues to database`);
    }
    
    // Count issues by severity
    const highCount = issues.filter(issue => issue.severity === "high").length;
    const mediumCount = issues.filter(issue => issue.severity === "medium").length;
    const lowCount = issues.filter(issue => issue.severity === "low").length;
    
    // Calculate a very simple score out of 100
    // High issues subtract 10 points, medium 5 points, low 2 points
    let score = 100 - (highCount * 10 + mediumCount * 5 + lowCount * 2);
    score = Math.max(0, Math.min(100, score)); // Keep between 0-100
    
    // Update the report with the calculated data
    await db
      .update(seoReports)
      .set({
        totalIssues: JSON.stringify({
          high: highCount,
          medium: mediumCount,
          low: lowCount,
          total: issues.length
        }),
        newIssues: issues.length,
        fixedIssues: 0,
        overallScore: score
      })
      .where(sql`${seoReports.id} = ${reportId}`);
    
    logger.info(`Completed crawl of ${visited.size} pages. Found ${issues.length} issues.`);
    
  } catch (error) {
    logger.error("Error saving crawl results:", error);
  }
}

// Get latest report endpoint
router.get("/reports/latest", async (req, res) => {
  try {
    // Get the most recent report from database
    const [report] = await db
      .select()
      .from(seoReports)
      .orderBy(sql`${seoReports.date} DESC`)
      .limit(1);
    
    if (!report) {
      return res.status(404).json({ 
        success: false, 
        error: "No reports found" 
      });
    }

    // Parse the totalIssues - it might be a JSON string or already an object
    let totalIssues = null;
    if (report.totalIssues) {
      try {
        // If it's a string, try to parse it
        if (typeof report.totalIssues === 'string') {
          totalIssues = JSON.parse(report.totalIssues);
        } else {
          // Otherwise assume it's already an object
          totalIssues = report.totalIssues;
        }
      } catch (e) {
        logger.error("Error parsing totalIssues:", e);
        totalIssues = { error: "Could not parse issues data" };
      }
    }
    
    // Return a formatted response with the report data
    res.json({
      success: true,
      report: {
        ...report,
        totalIssues,
        date: report.date.toISOString(),
        // Add other needed fields for the dashboard
        keywordRankings: [],  // This would come from another table
        topPriorityFixes: [], // This would be derived from seoIssues
        contentSuggestions: [], // This could be generated or stored
        performanceMetrics: [] // Metrics related to performance over time
      }
    });
  } catch (error) {
    logger.error("Error getting latest report:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Get all page audits
router.get("/audits", async (req, res) => {
  try {
    const pageAuditResults = await db
      .select()
      .from(pageAudits)
      .orderBy(sql`${pageAudits.url} ASC`);
    
    res.json({
      success: true,
      pages: pageAuditResults.map(page => ({
        ...page,
        lastAuditDate: page.lastAuditDate ? page.lastAuditDate.toISOString() : null
      }))
    });
  } catch (error) {
    logger.error("Error fetching page audits:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Get fixable issues
router.get("/fixable-issues", async (req, res) => {
  try {
    const fixableIssues = await db
      .select()
      .from(seoIssues)
      .where(sql`${seoIssues.fixed} IS NULL OR ${seoIssues.fixed} = false`)
      .orderBy(sql`
        CASE 
          WHEN ${seoIssues.severity} = 'critical' THEN 1
          WHEN ${seoIssues.severity} = 'high' THEN 2
          WHEN ${seoIssues.severity} = 'medium' THEN 3
          WHEN ${seoIssues.severity} = 'low' THEN 4
          ELSE 5
        END
      `);
    
    res.json({
      success: true,
      issues: fixableIssues.map(issue => ({
        ...issue,
        fixedDate: issue.fixedDate ? issue.fixedDate.toISOString() : null
      }))
    });
  } catch (error) {
    logger.error("Error fetching fixable issues:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Fix a specific issue
router.post("/fix-issue/:id", async (req, res) => {
  try {
    const issueId = parseInt(req.params.id);
    
    if (isNaN(issueId)) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid issue ID" 
      });
    }
    
    await db
      .update(seoIssues)
      .set({
        fixed: true,
        fixedDate: new Date()
      })
      .where(sql`${seoIssues.id} = ${issueId}`);
    
    res.json({
      success: true,
      message: "Issue marked as fixed"
    });
  } catch (error) {
    logger.error("Error fixing issue:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Fix all issues automatically
router.post("/fix-all-issues", async (req, res) => {
  try {
    // For demonstration purposes, just mark issues as fixed
    // In a real implementation, this would actually fix the issues
    const result = await db
      .update(seoIssues)
      .set({
        fixed: true,
        fixedDate: new Date()
      })
      .where(sql`(${seoIssues.fixed} IS NULL OR ${seoIssues.fixed} = false) AND ${seoIssues.autoFixable} = true`);
    
    res.json({
      success: true,
      message: "Auto-fix completed",
      succeeded: result.rowCount || 0,
      failed: 0
    });
  } catch (error) {
    logger.error("Error auto-fixing issues:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Get top keywords (placeholder for now)
router.get("/top-keywords", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const minVolume = parseInt(req.query.minVolume as string) || 0;
    
    // For demonstration, return placeholder data
    // In a real implementation, this would query a keywords table
    const keywords = [
      { keyword: "hemp business", position: 5, volume: 1200, change: 2 },
      { keyword: "hemp derived products", position: 8, volume: 880, change: -1 },
      { keyword: "hemp business startup", position: 3, volume: 750, change: 5 },
      { keyword: "legal hemp business", position: 12, volume: 650, change: 0 },
      { keyword: "hemp launch", position: 2, volume: 450, change: 4 }
    ];
    
    res.json({
      success: true,
      keywords: keywords.filter(k => k.volume >= minVolume).slice(0, limit)
    });
  } catch (error) {
    logger.error("Error fetching top keywords:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Get suggested topics (placeholder for now)
router.get("/suggested-topics", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;
    const minVolume = parseInt(req.query.minVolume as string) || 0;
    
    // For demonstration, return placeholder data
    // In a real implementation, this would query a content_topics table
    const topics = [
      { topic: "Starting a Hemp Business in 2025", volume: 850, competition: "medium" },
      { topic: "Hemp Business Legal Requirements", volume: 720, competition: "high" },
      { topic: "Hemp Product Marketing Strategies", volume: 680, competition: "medium" },
      { topic: "Sourcing Hemp Materials", volume: 550, competition: "low" },
      { topic: "Hemp Business Financing Options", volume: 490, competition: "medium" }
    ];
    
    res.json({
      success: true,
      topics: topics.filter(t => t.volume >= minVolume).slice(0, limit)
    });
  } catch (error) {
    logger.error("Error fetching suggested topics:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Research keywords (placeholder implementation)
router.post("/research-keywords", async (req, res) => {
  try {
    const schema = z.object({
      seedKeywords: z.array(z.string()).min(1).max(10)
    });
    
    const { seedKeywords } = schema.parse(req.body);
    
    // For demonstration, just return success
    // In a real implementation, this would trigger a keyword research process
    res.json({
      success: true,
      message: `Started research for ${seedKeywords.length} seed keywords`,
      seedKeywords
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid request data", 
        details: error.errors 
      });
    }
    
    logger.error("Error researching keywords:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Get report by ID endpoint
router.get("/reports/:id", async (req, res) => {
  try {
    const reportId = parseInt(req.params.id);
    
    if (isNaN(reportId)) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid report ID" 
      });
    }
    
    const [report] = await db
      .select()
      .from(seoReports)
      .where(sql`${seoReports.id} = ${reportId}`);
    
    if (!report) {
      return res.status(404).json({ 
        success: false, 
        error: "Report not found" 
      });
    }

    // Parse the totalIssues - it might be a JSON string or already an object
    let totalIssues = null;
    if (report.totalIssues) {
      try {
        // If it's a string, try to parse it
        if (typeof report.totalIssues === 'string') {
          totalIssues = JSON.parse(report.totalIssues);
        } else {
          // Otherwise assume it's already an object
          totalIssues = report.totalIssues;
        }
      } catch (e) {
        logger.error("Error parsing totalIssues:", e);
        totalIssues = { error: "Could not parse issues data" };
      }
    }
    
    res.json({
      success: true,
      report: {
        ...report,
        totalIssues,
        date: report.date.toISOString()
      }
    });
  } catch (error) {
    logger.error("Error getting report:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default router;