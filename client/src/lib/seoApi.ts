import { apiRequest } from "./queryClient";
import { 
  SeoReport as SelectSeoReport, 
  SeoIssue as SelectSeoIssue,
  PageAudit as SelectPageAudit,
  KeywordRanking as SelectKeywordRanking,
  ContentSuggestion as SelectContentSuggestion,
  SeoStatusRecord as SelectSeoStatus 
} from "@shared/schema";
import { seoApiClient } from "./seoApiClient";

// Re-export the types with shorter names for convenience
export type SeoReport = SelectSeoReport;
export type SeoIssue = SelectSeoIssue;
export type PageAudit = SelectPageAudit;
export type KeywordRanking = SelectKeywordRanking;
export type ContentSuggestion = SelectContentSuggestion;
export type SeoStatus = SelectSeoStatus;

// Configuration for resilience strategy
const MAX_RETRIES = 2;           // Maximum number of retry attempts
const RETRY_DELAY = 1000;        // Base delay in ms (will be multiplied by 2^retries)
const FALLBACK_ENABLED = true;   // Whether to use the fallback API when main API fails

// Utility functions for retry logic
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// SEO API functions

/**
 * Tests the connection to the SEO API with fallback mechanisms
 * If the main API fails, it will try to use the standalone serverless endpoint
 * @returns Response indicating if any API connection is available
 */
export async function testSeoApi(): Promise<{ success: boolean, useFallbackApi?: boolean }> {
  // Try the main API first
  try {
    let retries = 0;
    
    while (retries <= MAX_RETRIES) {
      try {
        const response = await apiRequest("GET", "/api/seo/test");
        const result = await response.json();
        return { ...result, useFallbackApi: false };
      } catch (error) {
        if (retries < MAX_RETRIES) {
          const delayMs = RETRY_DELAY * Math.pow(2, retries);
          console.warn(`API connection test failed, retrying in ${delayMs}ms...`);
          await sleep(delayMs);
          retries++;
        } else {
          throw error;
        }
      }
    }
    
    throw new Error("Max retries reached for main API"); 
  } catch (mainApiError) {
    console.error("Error testing main SEO API:", mainApiError);
    
    // If main API fails, try the fallback API (seoApiClient)
    try {
      console.log("Testing fallback SEO API connection...");
      const result = await seoApiClient.testApiConnection();
      console.log("Fallback API connection successful");
      return { success: true, useFallbackApi: true };
    } catch (fallbackError) {
      console.error("Error testing fallback SEO API:", fallbackError);
      return { success: false, useFallbackApi: false };
    }
  }
}

/**
 * Starts a crawl of a website with retry and fallback mechanisms
 * @param url The URL to crawl
 * @param maxPages Maximum number of pages to crawl (default: 20)
 * @param useFallback Whether to use the fallback API immediately
 * @returns The response from the API including report ID
 */
export async function startCrawl(
  url: string, 
  maxPages: number = 20, 
  useFallback: boolean = false
): Promise<{
  success: boolean;
  message?: string;
  reportId?: number;
  timestamp?: string;
  error?: string;
}> {
  // If explicitly told to use fallback, skip main API
  if (useFallback) {
    try {
      console.log("Using fallback API for crawl");
      return await seoApiClient.startCrawl(url, maxPages);
    } catch (error) {
      console.error("Error starting crawl with fallback API:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error from fallback API"
      };
    }
  }

  // Try the main API first
  try {
    let retries = 0;
    
    while (retries <= MAX_RETRIES) {
      try {
        const response = await apiRequest("POST", "/api/seo/crawl", { url, maxPages });
        return await response.json();
      } catch (error) {
        if (retries < MAX_RETRIES) {
          const delayMs = RETRY_DELAY * Math.pow(2, retries);
          console.warn(`Start crawl failed, retrying in ${delayMs}ms...`);
          await sleep(delayMs);
          retries++;
        } else {
          throw error;
        }
      }
    }
    
    throw new Error("Max retries reached for main API");
  } catch (mainApiError) {
    console.error("Error starting crawl with main API:", mainApiError);
    
    // If fallback is enabled and main API fails, try the fallback API
    if (FALLBACK_ENABLED) {
      try {
        console.log("Trying fallback API for crawl");
        return await seoApiClient.startCrawl(url, maxPages);
      } catch (fallbackError) {
        console.error("Error starting crawl with fallback API:", fallbackError);
        return { 
          success: false, 
          error: fallbackError instanceof Error ? fallbackError.message : "Unknown error from fallback API"
        };
      }
    }
    
    return { 
      success: false, 
      error: mainApiError instanceof Error ? mainApiError.message : "Unknown error"
    };
  }
}

/**
 * Fetches a single SEO report by ID
 * @param reportId The ID of the report to fetch
 * @returns The report data
 */
export async function getSeoReport(reportId: number): Promise<SeoReport | null> {
  try {
    const response = await apiRequest("GET", `/api/seo/reports/${reportId}`);
    const data = await response.json();
    return data.report || null;
  } catch (error) {
    console.error("Error fetching SEO report:", error);
    return null;
  }
}

/**
 * Fetches the most recent SEO report with fallback mechanism
 * If the main API fails, it will try to use the standalone serverless endpoint
 * @param useFallback Whether to use the fallback API immediately 
 * @returns The latest report data
 */
export async function getLatestSeoReport(useFallback = false): Promise<SeoReport | null> {
  // If explicitly told to use fallback, skip main API
  if (useFallback) {
    try {
      console.log("Using fallback API for latest report");
      const result = await seoApiClient.getLatestReport();
      return result?.report || null;
    } catch (error) {
      console.error("Error fetching latest SEO report from fallback API:", error);
      return null;
    }
  }
  
  // Try the main API first
  try {
    let retries = 0;
    
    while (retries <= MAX_RETRIES) {
      try {
        const response = await apiRequest("GET", "/api/seo/reports/latest");
        const data = await response.json();
        return data.report || null;
      } catch (error) {
        if (retries < MAX_RETRIES) {
          const delayMs = RETRY_DELAY * Math.pow(2, retries);
          console.warn(`Latest report fetch failed, retrying in ${delayMs}ms...`);
          await sleep(delayMs);
          retries++;
        } else {
          throw error;
        }
      }
    }
    
    throw new Error("Max retries reached for main API");
  } catch (mainApiError) {
    console.error("Error fetching latest SEO report from main API:", mainApiError);
    
    // If main API fails, try the fallback API
    try {
      console.log("Trying fallback API for latest report");
      const result = await seoApiClient.getLatestReport();
      return result?.report || null;
    } catch (fallbackError) {
      console.error("Error fetching latest SEO report from fallback API:", fallbackError);
      return null;
    }
  }
}