/**
 * Serverless function handler for the SEO API /crawl endpoint
 * This is a specialized endpoint just for crawl requests
 */

import { setCorsHeaders, tryProxyRequest, respondWithSimulatedData } from '../seo-api-utils.js';

export default async function handler(req, res) {
  // Handle OPTIONS requests for CORS preflight
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res);
    return res.status(200).end();
  }
  
  // Only accept POST requests
  if (req.method !== 'POST') {
    setCorsHeaders(res);
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
      message: "Only POST requests are accepted for this endpoint"
    });
  }

  try {
    // Set CORS headers for all responses
    setCorsHeaders(res);
    
    // Validate request body
    const body = req.body;
    if (!body || !body.url) {
      return res.status(400).json({
        success: false,
        error: "Invalid request",
        message: "URL is required in the request body"
      });
    }
    
    // Log crawl request
    console.log(`SEO Crawl Request for URL: ${body.url}`);
    
    // First try to proxy the request to the actual API
    const proxySuccess = await tryProxyRequest(req, res, 'crawl');
    
    // If proxy succeeded, the response has already been sent
    if (proxySuccess) {
      return;
    }
    
    // Otherwise, generate fallback data
    console.log(`Using fallback data for crawl of: ${body.url}`);
    
    // Add fallback indicator to the response
    const fallbackResponse = { 
      success: true, 
      useFallbackApi: true,
      url: body.url,
      maxPages: body.maxPages || 20
    };
    
    // Handle the request with simulated data
    respondWithSimulatedData(res, 'crawl', fallbackResponse);
  } catch (error) {
    console.error('SEO Crawl API Error:', error);
    
    // Return a friendly error response
    setCorsHeaders(res);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message
    });
  }
}