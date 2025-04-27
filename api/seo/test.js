/**
 * Serverless function handler for the SEO API /test endpoint
 * This is used to check API connectivity
 */

import { setCorsHeaders, tryProxyRequest, respondWithSimulatedData } from '../seo-api-utils.js';

export default async function handler(req, res) {
  // Handle OPTIONS requests for CORS preflight
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res);
    return res.status(200).end();
  }

  try {
    // Set CORS headers for all responses
    setCorsHeaders(res);
    
    // Log test request
    console.log(`SEO API Test Request`);
    
    // First try to proxy the request to the actual API
    const proxySuccess = await tryProxyRequest(req, res, 'test');
    
    // If proxy succeeded, the response has already been sent
    if (proxySuccess) {
      return;
    }
    
    // Otherwise, generate fallback data
    console.log(`Using fallback data for API test`);
    
    // Add detailed fallback indicator to the response
    const fallbackResponse = { 
      success: true, 
      useFallbackApi: true,
      message: "Unable to connect to the primary SEO API. Using fallback mode.",
      apiEndpoint: `${process.env.SEO_API_BASE_URL || 'https://api.thehemplaunch.com'}/api/seo/test`
    };
    
    // Handle the request with simulated data
    respondWithSimulatedData(res, 'test', fallbackResponse);
  } catch (error) {
    console.error('SEO Test API Error:', error);
    
    // Return a friendly error response
    setCorsHeaders(res);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message
    });
  }
}