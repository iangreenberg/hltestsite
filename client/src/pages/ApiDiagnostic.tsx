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
  ArrowRight,
  Globe
} from "lucide-react";
import { testSeoApi } from "@/lib/seoApi";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select";

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
  
  const [directTest, setDirectTest] = useState<{
    loading: boolean, 
    result: any | null,
    error: string | null,
    responseText: string | null,
    diagnostics?: {
      headers_received?: Record<string, string>,
      status?: number,
      statusText?: string,
      is_text_html?: boolean,
      is_json?: boolean,
      content_type?: string,
      url?: string,
      method?: string
    } | null
  }>({
    loading: false,
    result: null,
    error: null,
    responseText: null,
    diagnostics: null
  });
  
  const [apiUrl, setApiUrl] = useState("https://api.thehemplaunch.com/api/seo/test");
  const [method, setMethod] = useState("GET");
  
  // Predefined test endpoints
  const testEndpoints = [
    { label: "SEO API Test Endpoint", value: "https://api.thehemplaunch.com/api/seo/test" },
    { label: "Public API (httpbin.org)", value: "https://httpbin.org/get" },
    { label: "Google Homepage", value: "https://www.google.com" },
  ];
  
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
  
  // Run a direct test against the API server through our raw proxy
  const runDirectTest = async () => {
    setDirectTest({
      loading: true, 
      result: null, 
      error: null, 
      responseText: null
    });
    
    try {
      // Use our special raw proxy endpoint to bypass CORS issues
      const response = await fetch(`/api/seo/raw-proxy?url=${encodeURIComponent(apiUrl)}&method=${method}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Proxy error (${response.status}): ${errorText}`);
      }
      
      const proxyResult = await response.json();
      
      if (!proxyResult.success) {
        throw new Error(proxyResult.error || 'Proxy request failed');
      }
      
      const diagnostics = proxyResult.diagnostics;
      
      // Set the complete response info
      setDirectTest({
        loading: false,
        result: diagnostics.parsed_json,
        error: diagnostics.json_error,
        responseText: diagnostics.response_content,
        diagnostics: {
          headers_received: diagnostics.headers_received,
          status: diagnostics.status,
          statusText: diagnostics.statusText,
          is_text_html: diagnostics.is_text_html,
          is_json: diagnostics.is_json, 
          content_type: diagnostics.headers_received['content-type'],
          url: diagnostics.url,
          method: diagnostics.method
        }
      });
      
    } catch (err) {
      setDirectTest({
        loading: false,
        result: null,
        error: err instanceof Error ? err.message : 'Request failed',
        responseText: null
      });
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
          <TabsTrigger value="direct">Direct API Test</TabsTrigger>
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
                        {test.contentType && (
                          <p className="text-sm text-muted-foreground">
                            Content-Type: {test.contentType}
                          </p>
                        )}
                        {test.ok ? (
                          <p className="text-sm text-muted-foreground">
                            Status: {test.status} ({test.statusText})
                          </p>
                        ) : (
                          <>
                            <p className="text-sm text-destructive">
                              Error: {test.error || `HTTP ${test.status}`}
                            </p>
                            {test.responsePreview && (
                              <div className="mt-2 p-2 bg-gray-900 text-gray-200 rounded-md text-xs overflow-auto max-h-20">
                                <pre>{test.responsePreview}</pre>
                              </div>
                            )}
                          </>
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
        
        <TabsContent value="direct">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Direct API Test</h2>
              <Button 
                onClick={runDirectTest} 
                variant="outline" 
                disabled={directTest.loading}
              >
                {directTest.loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Globe className="mr-2 h-4 w-4" />
                    Run Direct Test
                  </>
                )}
              </Button>
            </div>
            
            <div className="space-y-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="apiUrl">API URL</label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input 
                      id="apiUrl"
                      value={apiUrl}
                      onChange={(e) => setApiUrl(e.target.value)}
                      placeholder="Enter API URL to test"
                    />
                  </div>
                  <Select onValueChange={(value) => setApiUrl(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Test Endpoints" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Test Endpoints</SelectLabel>
                        {testEndpoints.map((endpoint) => (
                          <SelectItem key={endpoint.value} value={endpoint.value}>
                            {endpoint.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="method">Method</label>
                <Select value={method} onValueChange={(value) => setMethod(value)}>
                  <SelectTrigger id="method">
                    <SelectValue placeholder="Select HTTP method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {directTest.error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
                <p className="font-medium">Error:</p>
                <p className="text-sm">{directTest.error}</p>
              </div>
            )}
            
            {directTest.diagnostics && (
              <div className="space-y-4 mb-4">
                <div>
                  <h3 className="text-md font-medium mb-2">Response Details</h3>
                  <div className="p-4 bg-muted rounded-md text-sm grid gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">Status:</div>
                      <div className={directTest.diagnostics.status && directTest.diagnostics.status >= 400 ? "text-destructive" : ""}>
                        {directTest.diagnostics.status} {directTest.diagnostics.statusText && `(${directTest.diagnostics.statusText})`}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">Content Type:</div>
                      <div>
                        {directTest.diagnostics.content_type || 'Not specified'}
                        {directTest.diagnostics.is_json && <span className="ml-2 text-green-500">(JSON)</span>}
                        {directTest.diagnostics.is_text_html && <span className="ml-2 text-yellow-500">(HTML)</span>}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">URL:</div>
                      <div className="truncate">{directTest.diagnostics.url}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">Method:</div>
                      <div>{directTest.diagnostics.method}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2">Response Headers</h3>
                  <div className="p-3 bg-muted rounded-md overflow-auto max-h-40">
                    <div className="grid grid-cols-1 gap-1 text-sm">
                      {directTest.diagnostics.headers_received && 
                        Object.entries(directTest.diagnostics.headers_received).map(([key, value]) => {
                          // Check if the value might contain an API key or sensitive data
                          const isSensitive = key.toLowerCase().includes('key') || 
                                              key.toLowerCase().includes('token') || 
                                              key.toLowerCase().includes('auth') ||
                                              key.toLowerCase().includes('secret') ||
                                              key.toLowerCase().includes('password');
                          
                          const valueStr = value as string;
                          const displayValue = isSensitive 
                            ? `${valueStr.substring(0, 6)}...${valueStr.substring(valueStr.length - 4)}`
                            : valueStr;
                          
                          return (
                            <div key={key} className="grid grid-cols-5 gap-2">
                              <div className="font-medium col-span-1">{key}:</div>
                              <div className="col-span-4 truncate">
                                {displayValue}
                                {isSensitive && 
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="ml-2 h-5 py-0 px-2"
                                    onClick={() => window.alert(`Full value: ${valueStr}`)}
                                  >
                                    Show
                                  </Button>
                                }
                              </div>
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {directTest.result && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-medium mb-2">JSON Response</h3>
                  <div className="p-3 bg-gray-900 text-gray-200 rounded-md overflow-auto max-h-80">
                    <pre className="text-xs">
                      {JSON.stringify(directTest.result, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            )}
            
            {directTest.responseText && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-medium mb-2">
                    {directTest.result ? 'Raw Response' : 'Response (non-JSON)'}
                  </h3>
                  <div className="p-3 bg-gray-900 text-gray-200 rounded-md overflow-auto max-h-80">
                    <pre className="text-xs whitespace-pre-wrap">
                      {directTest.responseText}
                    </pre>
                  </div>
                </div>
              </div>
            )}
            
            {!directTest.result && !directTest.responseText && !directTest.loading && !directTest.error && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  Enter an API URL and click "Run Direct Test" to test a direct connection to the API
                </p>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}