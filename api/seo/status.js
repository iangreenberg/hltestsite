/**
 * Serverless function handler for the SEO API /status endpoint
 * This returns the current status of the SEO engine
 */

import { setCorsHeaders, tryProxyRequest, respondWithSimulatedData } from '../seo-api-utils.js';

export default async function handler(req, res) {
  // Handle OPTIONS requests for CORS preflight
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res);
    return res.status(200).end();
  }
  
  // Only accept GET requests
  if (req.method !== 'GET') {
    setCorsHeaders(res);
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
      message: "Only GET requests are accepted for this endpoint"
    });
  }

  try {
    // Set CORS headers for all responses
    setCorsHeaders(res);
    
    // Log request
    console.log(`SEO Status Request`);
    
    // First try to proxy the request to the actual API
    const proxySuccess = await tryProxyRequest(req, res, 'status');
    
    // If proxy succeeded, the response has already been sent
    if (proxySuccess) {
      return;
    }
    
    // Otherwise, generate fallback data
    console.log(`Using fallback data for status`);
    
    // Add fallback indicator to the response
    const fallbackResponse = { 
      success: true, 
      useFallbackApi: true
    };
    
    // Handle the request with simulated data
    respondWithSimulatedData(res, 'status', fallbackResponse);
  } catch (error) {
    console.error('SEO Status API Error:', error);
    
    // Return a friendly error response
    setCorsHeaders(res);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message
    });
  }
}