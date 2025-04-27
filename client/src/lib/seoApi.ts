import { apiRequest } from "./queryClient";
import { 
  SeoReport as SelectSeoReport, 
  SeoIssue as SelectSeoIssue,
  PageAudit as SelectPageAudit,
  KeywordRanking as SelectKeywordRanking,
  ContentSuggestion as SelectContentSuggestion,
  SeoStatusRecord as SelectSeoStatus 
} from "@shared/schema";

// Re-export the types with shorter names for convenience
export type SeoReport = SelectSeoReport;
export type SeoIssue = SelectSeoIssue;
export type PageAudit = SelectPageAudit;
export type KeywordRanking = SelectKeywordRanking;
export type ContentSuggestion = SelectContentSuggestion;
export type SeoStatus = SelectSeoStatus;

// SEO API functions

/**
 * Tests the connection to the SEO API
 * @returns True if the API is accessible
 */
export async function testSeoApi(): Promise<{ success: boolean }> {
  try {
    const response = await apiRequest("GET", "/api/seo/test");
    return await response.json();
  } catch (error) {
    console.error("Error testing SEO API:", error);
    return { success: false };
  }
}

/**
 * Starts a crawl of a website
 * @param url The URL to crawl
 * @param maxPages Maximum number of pages to crawl (default: 20)
 * @returns The response from the API including report ID
 */
export async function startCrawl(url: string, maxPages: number = 20): Promise<{
  success: boolean;
  message?: string;
  reportId?: number;
  timestamp?: string;
  error?: string;
}> {
  try {
    const response = await apiRequest("POST", "/api/seo/crawl", { url, maxPages });
    return await response.json();
  } catch (error) {
    console.error("Error starting crawl:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error"
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
 * Fetches the most recent SEO report
 * @returns The latest report data
 */
export async function getLatestSeoReport(): Promise<SeoReport | null> {
  try {
    const response = await apiRequest("GET", "/api/seo/reports/latest");
    const data = await response.json();
    return data.report || null;
  } catch (error) {
    console.error("Error fetching latest SEO report:", error);
    return null;
  }
}