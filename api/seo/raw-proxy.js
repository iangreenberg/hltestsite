/**
 * A special proxy endpoint for diagnostic purposes that returns the raw response
 * including headers and body content without JSON parsing
 */

import { setCorsHeaders } from '../seo-api-utils';

export default async function handler(req, res) {
  // Handle OPTIONS requests for CORS preflight
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res);
    return res.status(200).end();
  }

  try {
    // Set CORS headers for all responses
    setCorsHeaders(res);
    
    // Get target URL from request body or query params
    const targetUrl = req.body?.url || req.query?.url;
    const method = (req.body?.method || req.query?.method || 'GET').toUpperCase();
    
    if (!targetUrl) {
      return res.status(400).json({
        success: false,
        error: 'Missing target URL parameter'
      });
    }
    
    console.log(`Raw Proxy request to: ${targetUrl} (Method: ${method})`);
    
    // Prepare browser-like headers to avoid security blocks
    const headers = {
      'User-Agent': 'Mozilla/5.0 (HempLaunch SEO API Diagnostic Tool)',
      'Accept': 'application/json, text/html, */*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Origin': req.headers.origin || 'https://thehemplaunch.com',
      'Content-Type': 'application/json'
    };
    
    // Add optional body for non-GET requests
    const options = {
      method,
      headers,
      redirect: 'follow',
      // Add a timeout to avoid hanging
      signal: AbortSignal.timeout(15000) // 15 second timeout
    };
    
    if (method !== 'GET' && req.body?.payload) {
      options.body = JSON.stringify(req.body.payload);
    }
    
    // Make the request to the target URL
    const response = await fetch(targetUrl, options);
    
    // Get the raw response text
    const responseText = await response.text();
    
    // Collect headers information
    const headers_received = {};
    response.headers.forEach((value, key) => {
      headers_received[key] = value;
    });
    
    // Attempt to parse JSON if content-type is application/json
    let parsedJson = null;
    let jsonError = null;
    
    if (headers_received['content-type']?.includes('application/json')) {
      try {
        parsedJson = JSON.parse(responseText);
      } catch (error) {
        jsonError = `JSON parse error: ${error.message}`;
      }
    }
    
    // Return the complete diagnostic information
    return res.status(200).json({
      success: true,
      diagnostics: {
        url: targetUrl,
        method,
        status: response.status,
        statusText: response.statusText,
        headers_sent: headers,
        headers_received,
        response_size: responseText.length,
        response_content: responseText.substring(0, 5000), // Limit to first 5000 chars
        content_truncated: responseText.length > 5000,
        parsed_json: parsedJson,
        json_error: jsonError,
        is_text_html: headers_received['content-type']?.includes('text/html'),
        is_json: headers_received['content-type']?.includes('application/json'),
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Raw Proxy Error:', error);
    
    // Return detailed error information
    setCorsHeaders(res);
    return res.status(500).json({
      success: false,
      error: "Error occurred during raw proxy request",
      error_details: {
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        code: error.code,
        cause: error.cause
      }
    });
  }
}