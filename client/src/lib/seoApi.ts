/**
 * SEO API utility for making requests to the SEO API endpoints
 */
import { queryClient, apiRequest } from './queryClient';

// Define types for SEO data
export interface IssueCount {
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
}

export interface SeoIssue {
  id: string;
  title: string;
  description: string;
  url?: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  type: string;
  fixed?: boolean;
  ignored?: boolean;
  fixedDate?: string;
  detectedDate: string;
  pageUrl?: string;
  selector?: string;
  recommendation?: string;
  impact?: string;
  autoFixable?: boolean;
}

export interface PageAudit {
  url: string;
  title: string;
  metaDescription: string;
  h1: string;
  h2Count: number;
  wordCount: number;
  imageCount: number;
  imagesWithAlt: number;
  internalLinks: number;
  externalLinks: number;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  mobile: number;
  lastAuditDate: string;
  issues: SeoIssue[];
}

export interface SeoReport {
  date: string;
  totalIssues: IssueCount;
  newIssues: number;
  fixedIssues: number;
  overallScore: number;
  pageAudits: PageAudit[];
  issues: SeoIssue[];
}

export interface SeoKeyword {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  position?: number;
  url?: string;
  change?: number;
}

export interface ContentSuggestion {
  id: string;
  title: string;
  description: string;
  targetKeywords: string[];
  searchVolume: number;
  difficulty: number;
  suggestedDate: string;
  implemented?: boolean;
  implementedDate?: string;
  type: 'blog' | 'landing' | 'product';
}

export interface SeoStatus {
  lastAuditDate: string;
  auditInProgress: boolean;
  totalPagesAudited: number;
  totalIssuesFound: number;
  totalIssuesFixed: number;
  health: number;
}

// Helper function to handle API errors consistently
function handleError(error: any): never {
  console.error('SEO API error:', error);
  throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
}

/**
 * SEO API client
 */
export const seoApi = {
  /**
   * Get the latest SEO report
   * @returns Promise with the latest SEO report or null if not available
   */
  getLatestReport: async (): Promise<SeoReport | null> => {
    try {
      const response = await apiRequest('GET', '/api/seo/report/latest');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch SEO report:', error);
      return null;
    }
  },
  
  /**
   * Get the SEO engine status
   * @returns Promise with the current SEO engine status or null if not available
   */
  getStatus: async (): Promise<SeoStatus | null> => {
    try {
      const response = await apiRequest('GET', '/api/seo/status');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch SEO status:', error);
      return null;
    }
  },
  
  /**
   * Run a new SEO audit
   * @returns Promise with the result of starting the audit
   */
  runAudit: async () => {
    try {
      const response = await apiRequest('POST', '/api/seo/run-audit');
      return await response.json();
    } catch (error) {
      handleError(error);
    }
  },
  
  /**
   * Get all SEO issues
   * @returns Promise with all SEO issues or empty array if not available
   */
  getAllIssues: async (): Promise<SeoIssue[]> => {
    try {
      const response = await apiRequest('GET', '/api/seo/issues');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch SEO issues:', error);
      return [];
    }
  },
  
  /**
   * Get all issues that can be automatically fixed
   * @returns Promise with all fixable issues or empty array if not available
   */
  getFixableIssues: async (): Promise<SeoIssue[]> => {
    try {
      const response = await apiRequest('GET', '/api/seo/fixable-issues');
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch fixable issues:', error);
      return [];
    }
  },
  
  /**
   * Get top keywords
   * @param limit Maximum number of keywords to return
   * @param minSearchVolume Minimum search volume for keywords
   * @returns Promise with top keywords or empty array if not available
   */
  getTopKeywords: async (
    limit: number = 10, 
    minSearchVolume: number = 100
  ): Promise<SeoKeyword[]> => {
    try {
      const response = await apiRequest(
        'GET', 
        `/api/seo/top-keywords?limit=${limit}&minSearchVolume=${minSearchVolume}`
      );
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch top keywords:', error);
      return [];
    }
  },
  
  /**
   * Get suggested content topics
   * @param limit Maximum number of topics to return
   * @param minSearchVolume Minimum search volume for topics
   * @returns Promise with suggested topics or empty array if not available
   */
  getSuggestedTopics: async (
    limit: number = 10, 
    minSearchVolume: number = 100
  ): Promise<ContentSuggestion[]> => {
    try {
      const response = await apiRequest(
        'GET', 
        `/api/seo/suggested-topics?limit=${limit}&minSearchVolume=${minSearchVolume}`
      );
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch suggested topics:', error);
      return [];
    }
  },
  
  /**
   * Test the API connection
   * @returns Promise with a boolean indicating if the API is working
   */
  testConnection: async (): Promise<boolean> => {
    try {
      const response = await apiRequest('GET', '/api/seo/test');
      const data = await response.json();
      return data && data.success === true;
    } catch (error) {
      console.error('SEO API connection test failed:', error);
      return false;
    }
  }
};