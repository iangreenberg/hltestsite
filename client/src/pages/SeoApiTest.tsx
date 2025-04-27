import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';

export default function SeoApiTest() {
  const [testData, setTestData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiRequest('GET', '/api/seo/test');
        const data = await response.json();
        setTestData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching SEO test data:', err);
        setError('Failed to fetch test data');
      } finally {
        setLoading(false);
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
        <div className="bg-green-100 p-4 rounded-md">
          <h2 className="font-bold text-xl mb-2">Test Data</h2>
          <pre className="bg-white p-3 rounded overflow-auto">
            {JSON.stringify(testData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}