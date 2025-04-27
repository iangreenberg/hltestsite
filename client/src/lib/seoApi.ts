import { queryClient, apiRequest } from "@/lib/queryClient";
import { SeoReport, SeoIssue, KeywordRanking, ContentSuggestion, SeoStatusRecord } from "@shared/schema";

// Base URL for all SEO API endpoints
const SEO_API_BASE = "/api/seo";

// Helper to handle errors consistently
async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    // Try to parse the error message from the response
    try {
      const errorData = await response.json();
      throw new Error(errorData.error || errorData.message || `API Error: ${response.status} ${response.statusText}`);
    } catch (e) {
      // If we can't parse the error, throw a generic one
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
  }
  
  return response.json() as Promise<T>;
}

// SEO API endpoints
export const seoApi = {
  // Test endpoint to check if SEO API is available
  async testConnection(): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${SEO_API_BASE}/test`);
      return handleApiResponse<{ success: boolean }>(response);
    } catch (error) {
      console.error("Error testing SEO API connection:", error);
      return { success: false };
    }
  },
  
  // Debug endpoint to check authentication
  async debugAuth(): Promise<any> {
    try {
      const response = await fetch(`${SEO_API_BASE}/debug-auth`);
      return handleApiResponse<any>(response);
    } catch (error) {
      console.error("Error debugging authentication:", error);
      return { error: String(error) };
    }
  },
  
  // Get the latest SEO report with all related data
  async getLatestReport(): Promise<SeoReport & { pageAudits: any[]; issues: SeoIssue[] }> {
    const response = await apiRequest("GET", `${SEO_API_BASE}/report/latest`);
    return handleApiResponse(response);
  },
  
  // Get current SEO status
  async getSeoStatus(): Promise<SeoStatusRecord> {
    const response = await apiRequest("GET", `${SEO_API_BASE}/status`);
    return handleApiResponse(response);
  },
  
  // Get all SEO issues
  async getAllIssues(): Promise<SeoIssue[]> {
    const response = await apiRequest("GET", `${SEO_API_BASE}/issues`);
    return handleApiResponse(response);
  },
  
  // Get fixable issues
  async getFixableIssues(): Promise<SeoIssue[]> {
    const response = await apiRequest("GET", `${SEO_API_BASE}/fixable-issues`);
    return handleApiResponse(response);
  },
  
  // Mark an issue as fixed
  async fixIssue(id: number): Promise<{ success: boolean }> {
    const response = await apiRequest("POST", `${SEO_API_BASE}/issues/${id}/fix`);
    return handleApiResponse(response);
  },
  
  // Ignore/unignore an issue
  async ignoreIssue(id: number, ignore: boolean): Promise<{ success: boolean }> {
    const response = await apiRequest("POST", `${SEO_API_BASE}/issues/${id}/ignore`, { ignore });
    return handleApiResponse(response);
  },
  
  // Get top keywords by search volume
  async getTopKeywords(limit = 10): Promise<KeywordRanking[]> {
    const response = await apiRequest("GET", `${SEO_API_BASE}/top-keywords?limit=${limit}`);
    return handleApiResponse(response);
  },
  
  // Get content suggestions that haven't been implemented
  async getSuggestedTopics(limit = 10): Promise<ContentSuggestion[]> {
    const response = await apiRequest("GET", `${SEO_API_BASE}/suggested-topics?limit=${limit}`);
    return handleApiResponse(response);
  },
  
  // Mark a content suggestion as implemented
  async implementSuggestion(id: number): Promise<{ success: boolean }> {
    const response = await apiRequest("POST", `${SEO_API_BASE}/suggestions/${id}/implement`);
    return handleApiResponse(response);
  },
  
  // Run a new SEO audit
  async runAudit(): Promise<{ success: boolean; message: string }> {
    const response = await apiRequest("POST", `${SEO_API_BASE}/run-audit`);
    return handleApiResponse(response);
  },
  
  // Invalidate all SEO-related queries to refresh data
  invalidateQueries() {
    queryClient.invalidateQueries({ queryKey: [`${SEO_API_BASE}/report/latest`] });
    queryClient.invalidateQueries({ queryKey: [`${SEO_API_BASE}/status`] });
    queryClient.invalidateQueries({ queryKey: [`${SEO_API_BASE}/issues`] });
    queryClient.invalidateQueries({ queryKey: [`${SEO_API_BASE}/fixable-issues`] });
    queryClient.invalidateQueries({ queryKey: [`${SEO_API_BASE}/top-keywords`] });
    queryClient.invalidateQueries({ queryKey: [`${SEO_API_BASE}/suggested-topics`] });
  }
};