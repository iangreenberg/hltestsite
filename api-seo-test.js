/**
 * Simple SEO API testing client to verify our SEO API routes
 * Run with: node api-seo-test.js
 */

// You can provide an optional environment parameter
const ENV = process.argv[2] || 'local';

// Set the base URL based on environment
const BASE_URLS = {
  local: 'http://localhost:5000',
  dev: 'https://hltestsite-4vq3.vercel.app',
  prod: 'https://thehemplaunch.com'
};

const BASE_URL = BASE_URLS[ENV] || BASE_URLS.local;
console.log(`Testing SEO API on: ${BASE_URL}`);

async function testSeoAPI() {
  try {
    // Helper function to make HTTP requests
    async function makeRequest(url, method = 'GET', data = null) {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      console.log(`${method} ${url}`);
      const response = await fetch(url, options);
      // Clone the response before consuming the body
      const responseClone = response.clone();
      
      // Try to parse as JSON first
      let responseData;
      try {
        responseData = await response.json();
        return {
          status: response.status,
          ok: response.ok,
          data: responseData
        };
      } catch (error) {
        // If JSON parsing fails, try to get the raw text
        try {
          const rawText = await responseClone.text();
          return {
            status: responseClone.status,
            ok: responseClone.ok,
            data: null,
            rawText: rawText.substring(0, 200) + (rawText.length > 200 ? '...' : '')
          };
        } catch (textError) {
          // If both fail, return basic info
          return {
            status: responseClone.status,
            ok: responseClone.ok,
            data: null,
            rawText: `Failed to read response body: ${textError.message}`
          };
        }
      }
      
      return {
        status: response.status,
        ok: response.ok,
        data: responseData
      };
    }

    // Test the basic connectivity endpoint
    console.log('\n🔍 Testing SEO API connectivity...');
    const testResponse = await makeRequest(`${BASE_URL}/api/seo/test`);
    console.log(`Status: ${testResponse.status}`);
    if (testResponse.data) {
      console.log('Response:', testResponse.data);
    } else if (testResponse.rawText) {
      console.log('Raw Response:', testResponse.rawText);
    }
    
    if (!testResponse.ok) {
      throw new Error('SEO API connection test failed');
    }
    
    // Try to get the latest report
    console.log('\n🔍 Testing latest report endpoint...');
    const latestReportResponse = await makeRequest(`${BASE_URL}/api/seo/reports/latest`);
    console.log(`Status: ${latestReportResponse.status}`);
    if (latestReportResponse.ok) {
      console.log('Latest report data available');
    } else {
      console.log('Latest report data not available (this may be normal if no reports exist yet)');
    }
    
    // Test getting top keywords
    console.log('\n🔍 Testing top keywords endpoint...');
    const keywordsResponse = await makeRequest(`${BASE_URL}/api/seo/top-keywords`);
    console.log(`Status: ${keywordsResponse.status}`);
    if (keywordsResponse.ok) {
      console.log(`Retrieved ${keywordsResponse.data.keywords?.length || 0} keywords`);
    } else {
      console.log('Keywords data not available');
    }
    
    // Test getting suggested topics
    console.log('\n🔍 Testing suggested topics endpoint...');
    const topicsResponse = await makeRequest(`${BASE_URL}/api/seo/suggested-topics`);
    console.log(`Status: ${topicsResponse.status}`);
    if (topicsResponse.ok) {
      console.log(`Retrieved ${topicsResponse.data.topics?.length || 0} suggested topics`);
    } else {
      console.log('Suggested topics data not available');
    }
    
    // Overall summary
    console.log('\n✅ SEO API Test Summary:');
    console.log(`API connectivity: ${testResponse.ok ? 'SUCCESS' : 'FAILED'}`);
    console.log(`Latest report: ${latestReportResponse.ok ? 'Available' : 'Not available'}`);
    console.log(`Keywords: ${keywordsResponse.ok ? 'Available' : 'Not available'}`);
    console.log(`Suggested topics: ${topicsResponse.ok ? 'Available' : 'Not available'}`);
    
    return testResponse.ok;
  } catch (error) {
    console.error('\n❌ Error testing SEO API:', error.message);
    return false;
  }
}

// Run the test
testSeoAPI().then(success => {
  console.log('\nTest completed');
  process.exit(success ? 0 : 1);
});