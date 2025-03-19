/**
 * Simple API testing client to verify our API routes work correctly
 * Run with: node api-test-client.js
 */

async function testAPI() {
  const BASE_URL = 'http://localhost:5000';

  // Helper function to make API requests
  async function makeRequest(url, method = 'GET', data = null) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      options.body = JSON.stringify(data);
    }

    try {
      console.log(`Making ${method} request to ${url}`);
      const response = await fetch(`${BASE_URL}${url}`, options);
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = await response.json();
        return {
          status: response.status,
          statusText: response.statusText,
          data: jsonResponse,
          headers: Object.fromEntries(response.headers.entries())
        };
      } else {
        const textResponse = await response.text();
        return {
          status: response.status,
          statusText: response.statusText,
          text: textResponse,
          headers: Object.fromEntries(response.headers.entries())
        };
      }
    } catch (error) {
      console.error(`Error making request to ${url}:`, error.message);
      return { error: error.message };
    }
  }

  // Test GET endpoints
  console.log('Testing GET /api/debug endpoint...');
  const debugResult = await makeRequest('/api/debug');
  console.log('Debug endpoint result:', JSON.stringify(debugResult, null, 2));

  console.log('\nTesting GET /api/test endpoint...');
  const testResult = await makeRequest('/api/test');
  console.log('Test endpoint result:', JSON.stringify(testResult, null, 2));

  console.log('\nTesting GET /direct-test endpoint...');
  const directTestResult = await makeRequest('/direct-test');
  console.log('Direct test endpoint result:', JSON.stringify(directTestResult, null, 2));

  // Test POST endpoints
  console.log('\nTesting POST /api/test endpoint...');
  const postTestResult = await makeRequest('/api/test', 'POST', { testData: 'This is test data' });
  console.log('POST test endpoint result:', JSON.stringify(postTestResult, null, 2));

  console.log('\nTesting POST /api/debug endpoint...');
  const postDebugResult = await makeRequest('/api/debug', 'POST', { debugData: 'This is debug data' });
  console.log('POST debug endpoint result:', JSON.stringify(postDebugResult, null, 2));

  // Test Application Submission
  console.log('\nTesting POST /api/application endpoint...');
  const applicationData = {
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '555-123-4567',
    investment: '5-10k',
    message: 'This is a test application submission'
  };
  const applicationResult = await makeRequest('/api/application', 'POST', applicationData);
  console.log('Application submission result:', JSON.stringify(applicationResult, null, 2));
}

testAPI().catch(console.error);