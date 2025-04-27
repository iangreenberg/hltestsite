/**
 * Shared utilities for SEO API serverless functions
 */

// Constants for the actual SEO API
export const SEO_API_BASE_URL = process.env.SEO_API_BASE_URL || 'https://api.thehemplaunch.com';
export const MAX_RETRIES = 1;
export const RETRY_DELAY = 300; // milliseconds

// Helper function to set CORS headers
export function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
}

// Sleep function for retries
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Attempts to forward the request to the actual SEO API
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {string} endpoint - The API endpoint to forward to
 * @returns {Promise<boolean>} - Whether the proxy request succeeded
 */
export async function tryProxyRequest(req, res, endpoint) {
  let retries = 0;
  
  while (retries <= MAX_RETRIES) {
    try {
      // Build the target URL
      const targetUrl = `${SEO_API_BASE_URL}/api/seo/${endpoint}`;
      console.log(`Proxying request to: ${targetUrl}`);
      
      // Prepare headers but don't forward cookie/auth
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      
      // Prepare fetch options
      const fetchOptions = {
        method: req.method,
        headers: headers,
        redirect: 'follow',
      };
      
      // Add body for non-GET requests
      if (req.method !== 'GET' && req.body) {
        fetchOptions.body = JSON.stringify(req.body);
      }
      
      // Make the request to the actual API
      const proxyResponse = await fetch(targetUrl, fetchOptions);
      
      // If the API responded but with an error, still return that error
      if (!proxyResponse.ok) {
        // Forward the status code and error message
        const errorBody = await proxyResponse.text();
        res.status(proxyResponse.status).send(errorBody);
        return true; // We got a response, even if it's an error
      }
      
      // Get the response body
      const data = await proxyResponse.json();
      
      // Return the successful response
      res.status(200).json(data);
      return true;
    } catch (error) {
      console.log(`Proxy attempt ${retries + 1} failed:`, error.message);
      
      if (retries < MAX_RETRIES) {
        await sleep(RETRY_DELAY * Math.pow(2, retries));
        retries++;
      } else {
        console.log('All proxy attempts failed, falling back to simulated data');
        return false;
      }
    }
  }
  
  return false;
}

/**
 * Responds with simulated data for development and testing
 * @param {object} res - Response object
 * @param {string} endpoint - The API endpoint being requested
 * @param {object} additionalData - Optional additional data to include in the response
 */
export function respondWithSimulatedData(res, endpoint, additionalData = {}) {
  // Default response structure
  const response = {
    success: true,
    ...additionalData
  };

  // Add endpoint-specific data
  switch (endpoint) {
    case 'test':
      // No additional data needed
      break;
      
    case 'crawl':
      // Handle crawl request - generate a valid response for crawl
      response.reportId = Math.floor(Math.random() * 10000) + 1;
      response.timestamp = new Date().toISOString();
      response.message = "Crawl started successfully";
      break;
    
    case 'status':
      response.status = {
        health: 'good',
        lastAuditDate: new Date().toISOString(),
        auditInProgress: false,
        totalPagesAudited: 76,
        totalIssuesFound: 124,
        totalIssuesFixed: 89
      };
      break;
    
    case 'report/latest':
    case 'reports/latest':
      response.report = {
        id: 1,
        date: new Date().toISOString(),
        totalIssues: {
          critical: 5,
          high: 12,
          medium: 18,
          low: 24,
          info: 65
        },
        newIssues: 8,
        fixedIssues: 15,
        overallScore: 87,
        crawledUrls: 76,
        keywordRankings: [
          { keyword: "hemp business setup", position: 12, change: 3 },
          { keyword: "hemp derived products", position: 8, change: 5 },
          { keyword: "hemp business guide", position: 15, change: -2 },
          { keyword: "hemp derived thc", position: 6, change: 8 },
          { keyword: "start hemp business", position: 5, change: 2 }
        ],
        topPriorityFixes: [
          { url: "/services", title: "Missing meta description", severity: "high", type: "meta_description" },
          { url: "/blog/hemp-regulations", title: "Low word count", severity: "medium", type: "content_length" },
          { url: "/about", title: "Missing alt text", severity: "medium", type: "image_alt" }
        ],
        contentSuggestions: [
          { topic: "Hemp Business Compliance Guide", keywords: ["hemp compliance", "legal hemp business", "hemp regulations"], competition: "medium" },
          { topic: "Starting a Hemp Business in Texas", keywords: ["texas hemp laws", "hemp business texas", "texas hemp license"], competition: "low" }
        ],
        performanceMetrics: [
          { url: "/", performance: 92, wordCount: 1250, title: "Home" },
          { url: "/services", performance: 87, wordCount: 950, title: "Services" },
          { url: "/about", performance: 95, wordCount: 850, title: "About Us" }
        ]
      };
      break;
    
    case 'top-keywords':
    case 'keywords':
      response.keywords = [
        { keyword: "hemp business setup", volume: 1200, difficulty: 45, position: 12 },
        { keyword: "hemp derived products", volume: 2500, difficulty: 65, position: 8 },
        { keyword: "hemp business guide", volume: 980, difficulty: 35, position: 15 },
        { keyword: "hemp derived thc", volume: 4500, difficulty: 75, position: 6 },
        { keyword: "start hemp business", volume: 3200, difficulty: 55, position: 5 }
      ];
      break;
    
    case 'suggested-topics':
    case 'content-suggestions':
      response.topics = [
        { topic: "Hemp Business Compliance Guide", keywords: ["hemp compliance", "legal hemp business", "hemp regulations"], competition: "medium" },
        { topic: "Starting a Hemp Business in Texas", keywords: ["texas hemp laws", "hemp business texas", "texas hemp license"], competition: "low" },
        { topic: "Hemp Product Marketing Strategies", keywords: ["hemp marketing", "hemp product promotion", "hemp brand"], competition: "high" },
        { topic: "Hemp vs CBD: What's the Difference", keywords: ["hemp cbd difference", "hemp or cbd", "hemp and cbd"], competition: "medium" },
        { topic: "Hemp Business Funding Options", keywords: ["hemp funding", "hemp business loans", "hemp startup capital"], competition: "low" }
      ];
      break;
    
    default:
      // Unknown endpoint
      res.status(404).json({
        success: false,
        error: "Unknown endpoint",
        endpoint: endpoint
      });
      return;
  }

  // Send the response
  res.status(200).json(response);
}