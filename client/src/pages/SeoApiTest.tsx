import { useState } from 'react';

type ApiResponse = {
  success: boolean;
  data?: any;
  status?: number;
  error?: string;
};

export default function SeoApiTest() {
  const [results, setResults] = useState<Record<string, ApiResponse>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  
  // List of API endpoints to test
  const endpoints = [
    '/api/seo/test',
    '/api/seo/status',
    '/api/seo/top-keywords',
    '/api/seo/fixable-issues',
    '/api/seo/suggested-topics',
    '/api/seo/report/latest'
  ];

  // Function to fetch data from any API endpoint
  const testEndpoint = async (endpoint: string) => {
    try {
      // Mark this endpoint as loading
      setLoading(prev => ({ ...prev, [endpoint]: true }));
      console.log(`Testing endpoint: ${endpoint}`);
      
      // Use the fetch API directly
      const response = await fetch(endpoint, {
        credentials: 'include'
      });
      
      console.log(`Response status for ${endpoint}:`, response.status);
      let data: any;
      
      try {
        data = await response.json();
        console.log(`Data received from ${endpoint}:`, data);
      } catch (parseError) {
        setResults(prev => ({
          ...prev,
          [endpoint]: {
            success: false,
            status: response.status,
            error: 'Failed to parse JSON response'
          }
        }));
        return;
      }
      
      // Store successful result
      setResults(prev => ({
        ...prev,
        [endpoint]: {
          success: true,
          data,
          status: response.status
        }
      }));
    } catch (err) {
      console.error(`Error with ${endpoint}:`, err);
      
      // Store error result
      setResults(prev => ({
        ...prev,
        [endpoint]: {
          success: false,
          error: err instanceof Error ? err.message : 'Unknown error'
        }
      }));
    } finally {
      // Mark endpoint as no longer loading
      setLoading(prev => ({ ...prev, [endpoint]: false }));
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">SEO API Test</h1>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Test All Endpoints</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {endpoints.map(endpoint => (
            <button
              key={endpoint}
              onClick={() => testEndpoint(endpoint)}
              disabled={loading[endpoint]}
              className={`p-3 rounded-md text-white text-left ${
                loading[endpoint] ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm">{endpoint}</span>
                {loading[endpoint] && (
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                )}
              </div>
            </button>
          ))}
        </div>
        
        <button
          onClick={() => endpoints.forEach(endpoint => testEndpoint(endpoint))}
          className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Test All Endpoints
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {endpoints.map(endpoint => {
          const result = results[endpoint];
          if (!result) return null;
          
          const isSuccess = result.success;
          const statusCode = result.status;
          
          return (
            <div 
              key={endpoint}
              className={`border rounded-lg overflow-hidden ${
                isSuccess ? 'border-green-200' : 'border-red-200'
              }`}
            >
              <div className={`p-4 flex justify-between items-center ${
                isSuccess ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <h3 className="font-mono text-sm font-bold">{endpoint}</h3>
                <div className="flex items-center">
                  {statusCode && (
                    <span className={`inline-block px-2 py-1 rounded text-xs mr-2 ${
                      statusCode >= 200 && statusCode < 300 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {statusCode}
                    </span>
                  )}
                  <span className={`inline-block w-3 h-3 rounded-full ${
                    isSuccess ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </div>
              </div>
              
              <div className="p-4 bg-white">
                {result.error ? (
                  <div className="text-red-600 font-mono text-sm">
                    Error: {result.error}
                  </div>
                ) : (
                  <pre className="bg-gray-50 p-3 rounded overflow-auto text-xs max-h-60">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}