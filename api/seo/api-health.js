/**
 * Serverless function handler for testing direct API connectivity
 * This performs a more thorough health check than the basic test endpoint
 */

import { setCorsHeaders, SEO_API_BASE_URL, sleep } from '../seo-api-utils.js';

const TEST_ENDPOINTS = [
  'test',
  'status',
  'reports/latest'
];

export default async function handler(req, res) {
  // Handle OPTIONS requests for CORS preflight
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res);
    return res.status(200).end();
  }

  try {
    // Set CORS headers for all responses
    setCorsHeaders(res);
    
    // Log health check
    console.log(`SEO API Health Check Started`);
    
    // Test multiple endpoints to diagnose connectivity issues
    const results = await Promise.all(
      TEST_ENDPOINTS.map(async (endpoint) => {
        try {
          // Build the target URL
          const targetUrl = `${SEO_API_BASE_URL}/api/seo/${endpoint}`;
          console.log(`Testing connectivity to: ${targetUrl}`);
          
          // Use fetch with a short timeout to test connectivity
          const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/html, */*',
              'User-Agent': 'Mozilla/5.0 (HempLaunch SEO API Client)',
              'Accept-Language': 'en-US,en;q=0.9',
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Origin': req.headers.origin || 'https://thehemplaunch.com'
            },
            redirect: 'follow',
            signal: AbortSignal.timeout(5000) // 5 second timeout
          });
          
          // Check for non-JSON response which is a common issue
          const contentType = response.headers.get('content-type');
          const isJson = contentType && contentType.includes('application/json');
          
          let responseDetails = {
            endpoint,
            url: targetUrl,
            status: response.status,
            ok: response.ok && isJson, // Only consider successful if it's valid JSON
            statusText: response.statusText,
            contentType
          };
          
          if (!isJson && response.ok) {
            // For HTML responses, capture a sample of the response text
            const text = await response.text();
            responseDetails.error = "Non-JSON response returned";
            responseDetails.responsePreview = text.substring(0, 200); // First 200 chars
            responseDetails.ok = false; // Override to false since we need JSON
          }
          
          return responseDetails;
        } catch (error) {
          return {
            endpoint,
            url: `${SEO_API_BASE_URL}/api/seo/${endpoint}`,
            error: error.message,
            ok: false,
            status: 0
          };
        }
      })
    );
    
    // Prepare the health check response
    const allSuccessful = results.every(result => result.ok);
    const response = {
      success: true,
      apiBaseUrl: SEO_API_BASE_URL,
      apiConnected: allSuccessful,
      endpointTests: results,
      timestamp: new Date().toISOString(),
      environment: {
        vercelEnv: process.env.VERCEL_ENV || 'development',
        nodeEnv: process.env.NODE_ENV || 'development'
      }
    };
    
    // Return the health check results
    res.status(200).json(response);
  } catch (error) {
    console.error('SEO API Health Check Error:', error);
    
    // Return a friendly error response
    setCorsHeaders(res);
    return res.status(500).json({
      success: false,
      error: "Internal server error during API health check",
      message: error.message
    });
  }
}