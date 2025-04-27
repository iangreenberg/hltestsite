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
              'Accept': 'application/json',
              'Origin': req.headers.origin || 'https://thehemplaunch.com'
            },
            redirect: 'follow',
            signal: AbortSignal.timeout(5000) // 5 second timeout
          });
          
          return {
            endpoint,
            url: targetUrl,
            status: response.status,
            ok: response.ok,
            statusText: response.statusText
          };
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