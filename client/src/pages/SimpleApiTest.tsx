import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

export default function SimpleApiTest() {
  const [testResult, setTestResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function testApi() {
    setLoading(true);
    setError(null);
    setTestResult(null);
    
    try {
      console.log("Testing API...");
      const response = await fetch('/api/seo/test', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} ${errorText}`);
      }
      
      const data = await response.json();
      console.log("API test result:", data);
      
      setTestResult(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Error testing API:", err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }
  
  // Run test on mount
  useEffect(() => {
    testApi();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Simple SEO API Test</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>SEO API Connection Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            {loading && <p>Testing API connection...</p>}
            {error && (
              <div className="text-red-500 p-4 border border-red-200 rounded bg-red-50">
                <p className="font-semibold">Error:</p>
                <p>{error}</p>
              </div>
            )}
            {testResult && (
              <div className="p-4 border border-green-200 rounded bg-green-50">
                <p className="font-semibold text-green-700 mb-2">Success!</p>
                <pre className="text-sm bg-black text-green-400 p-4 rounded overflow-x-auto">
                  {testResult}
                </pre>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={testApi} disabled={loading}>
            {loading ? "Testing..." : "Test API Again"}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => window.location.href = '/admin/seo-test'}>
          Go to Full API Test
        </Button>
        <Button variant="outline" onClick={() => window.location.href = '/admin-nav'}>
          Back to Admin Navigation
        </Button>
      </div>
    </div>
  );
}