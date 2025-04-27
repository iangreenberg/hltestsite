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

// Export function to register all SEO routes
export function registerSeoRoutes(apiApp: Express | Router) {
  // Mount all the routes defined in this file under /seo
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
        metaDescription,
        h1: h1Text,
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

export default router;