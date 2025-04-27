import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Loader2, 
  RefreshCw, 
  Wifi, 
  WifiOff,
  Server,
  ArrowRight
} from "lucide-react";
import { testSeoApi } from "@/lib/seoApi";

// API diagnostic page for testing and troubleshooting API connections
export default function ApiDiagnostic() {
  const [apiTest, setApiTest] = useState<{loading: boolean, result: any | null}>({
    loading: false,
    result: null
  });
  
  const [healthCheck, setHealthCheck] = useState<{loading: boolean, result: any | null}>({
    loading: false,
    result: null
  });
  
  const [error, setError] = useState<string | null>(null);
  
  // Run basic API test on page load
  useEffect(() => {
    runBasicTest();
  }, []);
  
  // Run a basic API test
  const runBasicTest = async () => {
    setApiTest({loading: true, result: null});
    setError(null);
    
    try {
      // Test the API connection
      const result = await testSeoApi();
      setApiTest({loading: false, result});
    } catch (err) {
      setApiTest({loading: false, result: null});
      setError(err instanceof Error ? err.message : 'Unknown error testing API');
    }
  };
  
  // Run a more comprehensive health check
  const runHealthCheck = async () => {
    setHealthCheck({loading: true, result: null});
    setError(null);
    
    try {
      // Fetch the detailed health check
      const response = await fetch('/api/seo/api-health');
      const result = await response.json();
      setHealthCheck({loading: false, result});
    } catch (err) {
      setHealthCheck({loading: false, result: null});
      setError(err instanceof Error ? err.message : 'Unknown error checking API health');
    }
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">SEO API Diagnostic</h1>
          <p className="text-muted-foreground">
            Test and diagnose API connectivity issues
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="basic">
        <TabsList className="mb-4">
          <TabsTrigger value="basic">Basic Test</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Diagnostics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">API Connection Test</h2>
              <Button 
                onClick={runBasicTest} 
                variant="outline" 
                disabled={apiTest.loading}
              >
                {apiTest.loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Run Test
                  </>
                )}
              </Button>
            </div>
            
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
                <p className="font-medium">Error testing API:</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            {apiTest.result && (
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="mr-4">
                    {apiTest.result.success ? (
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    ) : (
                      <XCircle className="h-8 w-8 text-destructive" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">
                      {apiTest.result.success ? 'API Responding' : 'API Not Responding'}
                    </h3>
                    <p className="text-muted-foreground">
                      {apiTest.result.success 
                        ? 'API is accessible and returning responses'
                        : 'Could not connect to the API server'
                      }
                    </p>
                  </div>
                </div>
                
                {apiTest.result.useFallbackApi && (
                  <div className="flex items-center p-3 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 rounded-md mt-4">
                    <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Using Fallback API</p>
                      <p className="text-sm">
                        The primary API server could not be reached. Currently operating in fallback mode with limited functionality.
                      </p>
                    </div>
                  </div>
                )}
                
                {apiTest.result.message && (
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                    <p className="font-medium">Message:</p>
                    <p>{apiTest.result.message}</p>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={runHealthCheck}
                  >
                    Run Detailed Health Check
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">API Health Diagnostics</h2>
              <Button 
                onClick={runHealthCheck} 
                variant="outline" 
                disabled={healthCheck.loading}
              >
                {healthCheck.loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Server className="mr-2 h-4 w-4" />
                    Run Health Check
                  </>
                )}
              </Button>
            </div>
            
            {!healthCheck.result && !healthCheck.loading && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  Click "Run Health Check" to perform a comprehensive API diagnostics test
                </p>
              </div>
            )}
            
            {healthCheck.result && (
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div>
                    {healthCheck.result.apiConnected ? (
                      <Wifi className="h-6 w-6 text-green-500" />
                    ) : (
                      <WifiOff className="h-6 w-6 text-destructive" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">
                      {healthCheck.result.apiConnected ? 'API Connected' : 'API Disconnected'}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Base URL: {healthCheck.result.apiBaseUrl}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Badge className={healthCheck.result.apiConnected ? "bg-green-500 hover:bg-green-600" : "bg-destructive hover:bg-destructive/90"}>
                      {healthCheck.result.apiConnected ? 'ONLINE' : 'OFFLINE'}
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2">Environment</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-muted p-2 rounded-md">
                      <span className="font-medium">Vercel Env:</span> {healthCheck.result.environment.vercelEnv}
                    </div>
                    <div className="bg-muted p-2 rounded-md">
                      <span className="font-medium">Node Env:</span> {healthCheck.result.environment.nodeEnv}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-md font-medium mb-2">Endpoint Tests</h3>
                  <div className="space-y-3">
                    {healthCheck.result.endpointTests.map((test: any, index: number) => (
                      <div key={index} className="p-3 bg-muted rounded-md">
                        <div className="flex justify-between">
                          <div className="font-medium">
                            {test.endpoint}
                          </div>
                          <Badge className={test.ok ? "bg-green-500 hover:bg-green-600" : "bg-destructive hover:bg-destructive/90"}>
                            {test.ok ? 'OK' : 'FAILED'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 truncate">
                          URL: {test.url}
                        </p>
                        {test.ok ? (
                          <p className="text-sm text-muted-foreground">
                            Status: {test.status} ({test.statusText})
                          </p>
                        ) : (
                          <p className="text-sm text-destructive">
                            Error: {test.error || `HTTP ${test.status}`}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground">
                    Last checked: {new Date(healthCheck.result.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}