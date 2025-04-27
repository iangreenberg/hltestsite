/**
 * SEO API client for making requests to the SEO API endpoints
 * This specialized client handles all SEO API communication
 */

// Define retry configuration
const MAX_RETRIES = 2;
const RETRY_DELAY = 500; // milliseconds

// Handle API errors consistently
function handleError(error: any): never {
  console.error('SEO API error:', error);
  // Provide more detailed error information when available
  const message = error instanceof Error 
    ? error.message 
    : (typeof error === 'string' ? error : 'Unknown error occurred');
  throw new Error(message);
}

/**
 * Sleep function for retry delays
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Helper function to determine the base URL for API requests
 * This handles different environments (local dev, production, etc.)
 */
function getBaseUrl(): string {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    // For production sites
    if (hostname === 'thehemplaunch.com' || hostname.includes('vercel.app')) {
      // Use the built-in API routes on the same domain 
      // (serverless functions in /api/ folder)
      return '';
    }
    
    // For local Replit development
    if (hostname.includes('replit.dev')) {
      return '';
    }
    
    // For any other development environment
    return '';
  }
  
  // Default fallback for server-side rendering
  return '';
}

/**
 * Helper function to make API requests with retries and fallback options
 */
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  let retries = 0;
  let lastError: any = null;
  
  // Ensure endpoint starts with /api/seo/
  const baseUrl = getBaseUrl();
  const apiEndpoint = endpoint.startsWith('/api/seo/')
    ? `${baseUrl}${endpoint}`
    : `${baseUrl}/api/seo/${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`;
  
  // Try the request with retries
  while (retries <= MAX_RETRIES) {
    try {
      console.log(`Fetching from SEO API: ${apiEndpoint}${retries > 0 ? ` (retry ${retries})` : ''}`);
      
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
      
      // Always get clones of the response to avoid consuming it
      const responseClone = response.clone();
      
      // Check if the response was successful
      if (!response.ok) {
        let errorText;
        try {
          // Try to get meaningful error text
          errorText = await responseClone.text();
        } catch (e) {
          errorText = 'Could not read error response';
        }
        
        // Check if this is a CORS error
        if (response.status === 0 || response.type === 'opaque') {
          throw new Error(`CORS error or network failure. This may be a cross-origin issue.`);
        }
        
        throw new Error(`API error (${response.status}): ${errorText}`);
      }
      
      // Try to parse the response as JSON
      try {
        // First try to parse the JSON normally
        const data = await response.json();
        
        // Check if we have a valid response with the right shape
        // If the endpoint is 'test', we only care about the success field
        if (endpoint.includes('test') && 'success' in data) {
          return data as T;
        }
        
        // For other endpoints, do specific validation
        if (endpoint.includes('crawl') && 'success' in data) {
          // For crawl endpoint, we need to validate the specific response shape
          return {
            success: data.success,
            reportId: data.reportId || null,
            message: data.message || '',
            timestamp: data.timestamp || new Date().toISOString(),
            error: data.error || null
          } as unknown as T;
        }
        
        // For reports/latest, check for report field
        if (endpoint.includes('reports/latest') && 'report' in data) {
          return data as T;
        }
        
        // Default: return the data as is
        return data as T;
      } catch (jsonError) {
        console.error('JSON parsing error:', jsonError);
        throw new Error(`Error parsing JSON: ${jsonError instanceof Error ? jsonError.message : 'Unknown parsing error'}`);
      }
    } catch (error) {
      lastError = error;
      
      if (retries < MAX_RETRIES) {
        // Wait before retrying with exponential backoff
        const delayMs = RETRY_DELAY * Math.pow(2, retries);
        console.warn(`API request failed, retrying in ${delayMs}ms...`, error);
        await sleep(delayMs);
        retries++;
      } else {
        console.error('API request failed after all retries', error);
        break;
      }
    }
  }
  
  // Create a suitable fallback response based on the endpoint type
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  console.warn(`Using fallback response for ${endpoint} on ${hostname}`);
  
  // Generate a basic fallback response for test endpoints
  if (endpoint.includes('test')) {
    return { success: false, error: 'Failed to connect to API' } as unknown as T;
  }
  
  // Generate a fallback response for crawl endpoints
  if (endpoint.includes('crawl')) {
    return {
      success: false,
      error: 'Failed to connect to API server, please try again later',
      message: 'API connection failed'
    } as unknown as T;
  }
  
  // If all else fails, throw the original error
  throw lastError || new Error('Failed to connect to SEO API'); 
}

// SEO API client with strongly typed methods
export const seoApiClient = {
  // Start a crawl of a website
  startCrawl: (url: string, maxPages: number = 20) => 
    request('/api/seo/crawl', { 
      method: 'POST', 
      body: JSON.stringify({ url, maxPages }) 
    }),
    
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