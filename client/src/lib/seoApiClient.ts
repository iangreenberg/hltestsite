/**
 * SEO API client for making requests to the SEO API endpoints
 * This specialized client handles all SEO API communication
 */

// Handle API errors consistently
function handleError(error: any): never {
  console.error('SEO API error:', error);
  throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
}

// Helper function to make API requests
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  try {
    // Ensure endpoint starts with /api/seo/
    const apiEndpoint = endpoint.startsWith('/api/seo/')
      ? endpoint
      : `/api/seo/${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`;
    
    console.log(`Fetching from SEO API: ${apiEndpoint}`);
    
    // Make the request with credentials included
    const response = await fetch(apiEndpoint, {
      ...options,
      credentials: 'include',
      headers: {
        ...options.headers,
        'Accept': 'application/json',
        ...(options.method === 'POST' ? {'Content-Type': 'application/json'} : {})
      }
    });
    
    // Check if the response was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error (${response.status}): ${errorText}`);
    }
    
    // Parse the response as JSON
    return await response.json() as T;
  } catch (error) {
    return handleError(error);
  }
}

// SEO API client with strongly typed methods
export const seoApiClient = {
  // Get the latest SEO report
  getLatestReport: () => 
    request('/api/seo/report/latest'),
  
  // Get all SEO reports
  getAllReports: (limit?: number) => 
    request(`/api/seo/reports${limit ? `?limit=${limit}` : ''}`),
  
  // Get the SEO engine status
  getStatus: () => 
    request('/api/seo/status'),
  
  // Run a new SEO audit
  runAudit: () => 
    request('/api/seo/run-audit', { method: 'POST' }),
  
  // Get all page audits
  getAllPageAudits: () => 
    request('/api/seo/audits'),
  
  // Get a specific page audit
  getPageAudit: (url: string) => 
    request(`/api/seo/audit/${encodeURIComponent(url)}`),
  
  // Get all SEO issues
  getAllIssues: () => 
    request('/api/seo/issues'),
  
  // Mark an issue as fixed
  markIssueFixed: (id: string) => 
    request(`/api/seo/issues/${id}/fix`, { method: 'POST' }),
  
  // Ignore an issue
  ignoreIssue: (id: string, ignore: boolean) => 
    request(`/api/seo/issues/${id}/ignore`, { 
      method: 'POST', 
      body: JSON.stringify({ ignore }) 
    }),
  
  // Get all keyword rankings
  getKeywordRankings: () => 
    request('/api/seo/keywords'),
  
  // Get all content suggestions
  getContentSuggestions: () => 
    request('/api/seo/content-suggestions'),
  
  // Mark a content suggestion as implemented
  markSuggestionImplemented: (id: string) => 
    request(`/api/seo/content-suggestions/${id}/implement`, { method: 'POST' }),
  
  // Get all issues that can be automatically fixed
  getFixableIssues: () => 
    request('/api/seo/fixable-issues'),
  
  // Auto-fix all fixable issues
  fixAllIssues: () => 
    request('/api/seo/fix-all-issues', { method: 'POST' }),
  
  // Fix a specific issue
  fixIssue: (id: string) => 
    request(`/api/seo/fix-issue/${id}`, { method: 'POST' }),
  
  // Perform keyword research
  researchKeywords: (seedKeywords: string[]) => 
    request('/api/seo/research-keywords', { 
      method: 'POST', 
      body: JSON.stringify({ seedKeywords }) 
    }),
  
  // Get top keywords
  getTopKeywords: (limit: number = 10, minSearchVolume: number = 100) => 
    request(`/api/seo/top-keywords?limit=${limit}&minSearchVolume=${minSearchVolume}`),
  
  // Get suggested content topics
  getSuggestedTopics: (limit: number = 10, minSearchVolume: number = 100) => 
    request(`/api/seo/suggested-topics?limit=${limit}&minSearchVolume=${minSearchVolume}`),
    
  // Test the API connection
  testApiConnection: () =>
    request('/api/seo/test')
};