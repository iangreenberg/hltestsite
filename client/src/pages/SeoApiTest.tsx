import { useState, useEffect } from 'react';
import { seoApi } from '@/lib/seoApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export default function SeoApiTest() {
  const [testResults, setTestResults] = useState<Record<string, boolean | string>>({});
  const [loading, setLoading] = useState(false);
  const [authDetails, setAuthDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to run all tests
  async function runTests() {
    setLoading(true);
    setError(null);
    const results: Record<string, boolean | string> = {};

    try {
      // Test basic connection
      const connectionTest = await seoApi.testConnection();
      results.connection = connectionTest.success;

      // Check auth
      try {
        const authDebug = await seoApi.debugAuth();
        setAuthDetails(authDebug);
        results.auth = true;
      } catch (error) {
        results.auth = false;
      }

      // Test SEO status
      try {
        await seoApi.getSeoStatus();
        results.status = true;
      } catch (error) {
        results.status = error instanceof Error ? error.message : String(error);
      }

      // Test keywords
      try {
        await seoApi.getTopKeywords();
        results.keywords = true;
      } catch (error) {
        results.keywords = error instanceof Error ? error.message : String(error);
      }

      // Test content suggestions
      try {
        await seoApi.getSuggestedTopics();
        results.suggestions = true;
      } catch (error) {
        results.suggestions = error instanceof Error ? error.message : String(error);
      }

      // Test report
      try {
        await seoApi.getLatestReport();
        results.report = true;
      } catch (error) {
        results.report = error instanceof Error ? error.message : String(error);
      }

    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setTestResults(results);
      setLoading(false);
    }
  }

  // Run tests on component mount
  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">SEO API Test</h1>
      <p className="text-muted-foreground mb-8">
        This page tests the connection to the SEO API endpoints and displays the results.
      </p>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>API Connection Test Results</CardTitle>
            <CardDescription>Status of various SEO API endpoints</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                <span className="ml-3">Testing API endpoints...</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    {testResults.connection === true ? (
                      <CheckCircle2 className="text-green-500 h-5 w-5" />
                    ) : (
                      <XCircle className="text-red-500 h-5 w-5" />
                    )}
                    <span>Basic Connection</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {testResults.auth === true ? (
                      <CheckCircle2 className="text-green-500 h-5 w-5" />
                    ) : (
                      <XCircle className="text-red-500 h-5 w-5" />
                    )}
                    <span>Authentication</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {testResults.status === true ? (
                      <CheckCircle2 className="text-green-500 h-5 w-5" />
                    ) : (
                      <XCircle className="text-red-500 h-5 w-5" />
                    )}
                    <span>SEO Status</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {testResults.keywords === true ? (
                      <CheckCircle2 className="text-green-500 h-5 w-5" />
                    ) : (
                      <XCircle className="text-red-500 h-5 w-5" />
                    )}
                    <span>Keywords</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {testResults.suggestions === true ? (
                      <CheckCircle2 className="text-green-500 h-5 w-5" />
                    ) : (
                      <XCircle className="text-red-500 h-5 w-5" />
                    )}
                    <span>Content Suggestions</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {testResults.report === true ? (
                      <CheckCircle2 className="text-green-500 h-5 w-5" />
                    ) : (
                      <XCircle className="text-red-500 h-5 w-5" />
                    )}
                    <span>SEO Report</span>
                  </div>
                </div>
                
                {Object.values(testResults).some(value => value !== true) && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Some tests failed</AlertTitle>
                    <AlertDescription>
                      One or more API endpoints are not working correctly. Check the error details below.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={runTests} disabled={loading}>
              {loading ? "Testing..." : "Run Tests Again"}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Authentication Details */}
        {authDetails && (
          <Card>
            <CardHeader>
              <CardTitle>Authentication Details</CardTitle>
              <CardDescription>Current authentication status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">isAuthenticated:</span>{" "}
                  {typeof authDetails.isAuthenticated === 'boolean' 
                    ? authDetails.isAuthenticated ? "Yes" : "No" 
                    : String(authDetails.isAuthenticated)}
                </div>
                <div>
                  <span className="font-medium">User Available:</span> {authDetails.userAvailable ? "Yes" : "No"}
                </div>
                <div>
                  <span className="font-medium">Is Admin:</span> {authDetails.isAdmin ? "Yes" : "No"}
                </div>
                <div>
                  <span className="font-medium">Session Available:</span> {authDetails.sessionAvailable ? "Yes" : "No"}
                </div>
                <div>
                  <span className="font-medium">Session ID:</span> {authDetails.sessionID}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Error Details */}
        {Object.entries(testResults).filter(([_, result]) => result !== true).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Error Details</CardTitle>
              <CardDescription>Information about failed tests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(testResults)
                  .filter(([_, result]) => result !== true)
                  .map(([endpoint, error]) => (
                    <div key={endpoint} className="space-y-2">
                      <h3 className="font-medium capitalize flex items-center">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        {endpoint}
                      </h3>
                      <p className="text-sm text-muted-foreground pl-6">
                        {typeof error === 'string' ? error : 'Failed to connect'}
                      </p>
                      <Separator className="my-2" />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Troubleshooting */}
        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting</CardTitle>
            <CardDescription>Common issues and how to fix them</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Database connection:</strong> Make sure your PostgreSQL database is properly set up and DATABASE_URL environment variable is correct.</li>
              <li><strong>API routes:</strong> Verify that SEO routes are properly registered in your server/routes.ts file.</li>
              <li><strong>Authentication:</strong> Check that authentication middleware is properly configured.</li>
              <li><strong>Database tables:</strong> Ensure SEO tables have been created by running database migrations.</li>
              <li><strong>CORS issues:</strong> Make sure CORS is properly configured if accessing from a different domain.</li>
            </ul>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => window.location.href = "/admin/seo-dashboard"}>
              Go to SEO Dashboard
            </Button>
            <Button variant="default" onClick={() => window.location.href = "/admin-nav"}>
              Go to Admin Navigation
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}