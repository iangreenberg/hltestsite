import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';

export default function SeoApiTest() {
  const [testData, setTestData] = useState<any>(null);
  const [statusData, setStatusData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiUrl, setApiUrl] = useState('/api/seo/test');

  // Function to fetch data from any API endpoint
  const fetchFromApi = async (endpoint: string) => {
    try {
      setLoading(true);
      console.log(`Fetching from: ${endpoint}`);
      
      // Use the fetch API directly to avoid any wrapper issues
      const response = await fetch(endpoint, {
        credentials: 'include'
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Data received:', data);
      
      return {
        success: true,
        data,
        status: response.status
      };
    } catch (err) {
      console.error(`Error fetching from ${endpoint}:`, err);
      return {
        success: false, 
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch from the test endpoint
    const fetchData = async () => {
      const testResult = await fetchFromApi('/api/seo/test');
      if (testResult.success) {
        setTestData(testResult.data);
      } else {
        setError(testResult.error);
      }
      
      // Also fetch from the status endpoint for comparison
      const statusResult = await fetchFromApi('/api/seo/status');
      if (statusResult.success) {
        setStatusData(statusResult.data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">SEO API Test</h1>
      
      {loading && (
        <div className="bg-blue-100 p-4 rounded-md">
          <p>Loading...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 p-4 rounded-md">
          <h2 className="font-bold text-xl mb-2">Error</h2>
          <p>{error}</p>
        </div>
      )}
      
      {testData && (
        <div className="bg-green-100 p-4 rounded-md mb-4">
          <h2 className="font-bold text-xl mb-2">Test Endpoint Response</h2>
          <pre className="bg-white p-3 rounded overflow-auto">
            {JSON.stringify(testData, null, 2)}
          </pre>
        </div>
      )}
      
      {statusData && (
        <div className="bg-green-100 p-4 rounded-md mb-4">
          <h2 className="font-bold text-xl mb-2">Status Endpoint Response</h2>
          <pre className="bg-white p-3 rounded overflow-auto">
            {JSON.stringify(statusData, null, 2)}
          </pre>
        </div>
      )}
      
      <div className="mt-8 bg-blue-50 p-4 rounded-md">
        <h2 className="font-bold text-xl mb-2">API Connectivity Tests</h2>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => fetchFromApi('/api/seo/top-keywords').then(result => {
              if (result.success) alert(JSON.stringify(result.data, null, 2));
              else alert(`Error: ${result.error}`);
            })}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Test Top Keywords API
          </button>
          
          <button 
            onClick={() => fetchFromApi('/api/seo/fixable-issues').then(result => {
              if (result.success) alert(JSON.stringify(result.data, null, 2));
              else alert(`Error: ${result.error}`);
            })}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Test Fixable Issues API
          </button>
          
          <button 
            onClick={() => fetchFromApi('/api/seo/suggested-topics').then(result => {
              if (result.success) alert(JSON.stringify(result.data, null, 2));
              else alert(`Error: ${result.error}`);
            })}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Test Suggested Topics API
          </button>
          
          <button 
            onClick={() => fetchFromApi('/api/seo/report/latest').then(result => {
              if (result.success) alert(JSON.stringify(result.data, null, 2));
              else alert(`Error: ${result.error}`);
            })}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Test Latest Report API
          </button>
        </div>
      </div>
    </div>
  );
}