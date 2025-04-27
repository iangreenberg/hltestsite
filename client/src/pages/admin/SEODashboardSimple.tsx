import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { testSeoApi, getLatestSeoReport, startCrawl } from '@/lib/seoApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, AlertTriangle, CheckCircle2, BarChart4, BookText, KeyRound } from 'lucide-react';

export default function SEODashboardSimple() {
  const [activeTab, setActiveTab] = useState('overview');
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Test API connection on component mount
  useEffect(() => {
    async function checkConnection() {
      try {
        const result = await testSeoApi();
        if (result.success) {
          setConnectionStatus('connected');
        } else {
          setConnectionStatus('error');
          setErrorMessage('API connection test failed');
        }
      } catch (error) {
        setConnectionStatus('error');
        setErrorMessage(`Error connecting to SEO API: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
    
    checkConnection();
  }, []);
  
  // Fetch latest report
  const { 
    data: latestReport, 
    isLoading: reportLoading, 
    error: reportError 
  } = useQuery({
    queryKey: ['/api/seo/reports/latest'],
    queryFn: () => getLatestSeoReport(),
    enabled: connectionStatus === 'connected',
    retry: 1
  });
  
  // Set up placeholders for not-yet-implemented features
  const seoStatus = {};
  const statusLoading = reportLoading;
  const statusError = reportError;
  
  const keywords = [];
  const keywordsLoading = false;
  const keywordsError = null;
  
  const contentSuggestions = [];
  const suggestionsLoading = false;
  const suggestionsError = null;
  
  // Handle API status
  if (connectionStatus === 'checking') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-xl font-medium">Connecting to SEO API...</p>
      </div>
    );
  }
  
  if (connectionStatus === 'error') {
    return (
      <div className="p-6">
        <Alert variant="destructive" className="mb-8">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Error connecting to SEO API</AlertTitle>
          <AlertDescription>
            {errorMessage || "We couldn't connect to the SEO API. Please check your configuration and try again."}
          </AlertDescription>
        </Alert>
        
        <Card>
          <CardHeader>
            <CardTitle>Connection Troubleshooting</CardTitle>
            <CardDescription>
              Follow these steps to fix the connection issues:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-decimal pl-5 space-y-2">
              <li>Verify that the SEO API endpoints are properly configured and accessible</li>
              <li>Check your database connection in production</li>
              <li>Ensure the proper authentication is set up</li>
              <li>Make sure your database migrations have been run</li>
              <li>Check the server logs for any errors</li>
            </ol>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="mr-2"
            >
              Retry Connection
            </Button>
            <Button 
              variant="default" 
              onClick={() => {
                alert("Debug Authentication feature has been deprecated in the new API structure");
              }}
            >
              Debug Authentication
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  // Main dashboard display
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SEO Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and improve your website's search engine performance
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
          <span>API Connected</span>
        </Badge>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full md:w-auto grid-cols-4 md:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          {statusLoading ? (
            <div className="flex justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : statusError ? (
            <Alert variant="destructive">
              <AlertTitle>Error loading SEO status</AlertTitle>
              <AlertDescription>
                {statusError instanceof Error ? statusError.message : "Unknown error occurred"}
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">SEO Health Score</CardTitle>
                    <BarChart4 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{seoStatus?.health || 0}/100</div>
                    <p className="text-xs text-muted-foreground">
                      Last updated: {seoStatus?.lastAuditDate 
                        ? new Date(seoStatus.lastAuditDate).toLocaleDateString() 
                        : 'Never'}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pages Audited</CardTitle>
                    <BookText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{seoStatus?.totalPagesAudited || 0}</div>
                    <p className="text-xs text-muted-foreground">
                      {seoStatus?.auditInProgress ? 'Audit in progress' : 'Ready for next audit'}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{seoStatus?.totalIssuesFound || 0}</div>
                    <p className="text-xs text-muted-foreground">
                      Fixed: {seoStatus?.totalIssuesFixed || 0}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>SEO Status</CardTitle>
                  <CardDescription>
                    Summary of your website's SEO performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* SEO Status Content */}
                  <p className="text-sm">
                    Your website's SEO is being monitored. The system analyzes your content, meta data, 
                    and technical aspects to provide recommendations for improvement.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={async () => {
                      try {
                        // Using the startCrawl API directly
                        const response = await startCrawl('https://example.com', 10);
                        alert(`SEO audit started! Report ID: ${response.reportId}`);
                        window.location.reload();
                      } catch (error) {
                        alert(`Error starting audit: ${error instanceof Error ? error.message : String(error)}`);
                      }
                    }}
                  >
                    Run New Audit
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}
        </TabsContent>
        
        {/* Keywords Tab */}
        <TabsContent value="keywords" className="space-y-4">
          {keywordsLoading ? (
            <div className="flex justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : keywordsError ? (
            <Alert variant="destructive">
              <AlertTitle>Error loading keywords</AlertTitle>
              <AlertDescription>
                {keywordsError instanceof Error ? keywordsError.message : "Unknown error occurred"}
              </AlertDescription>
            </Alert>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Top Keywords</CardTitle>
                <CardDescription>
                  Your most important search terms ranked by search volume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {keywords && keywords.length > 0 ? (
                    <div className="rounded-md border">
                      <table className="min-w-full divide-y divide-border">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="px-4 py-3 text-left text-sm font-medium">Keyword</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Search Volume</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Difficulty</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Position</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">Change</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {keywords.map((keyword) => (
                            <tr key={keyword.id}>
                              <td className="px-4 py-3 text-sm">{keyword.keyword}</td>
                              <td className="px-4 py-3 text-sm">{keyword.searchVolume || 0}</td>
                              <td className="px-4 py-3 text-sm">{keyword.difficulty || 0}/100</td>
                              <td className="px-4 py-3 text-sm">{keyword.position || '-'}</td>
                              <td className="px-4 py-3 text-sm">
                                {keyword.change ? (
                                  <span className={keyword.change > 0 ? "text-green-500" : "text-red-500"}>
                                    {keyword.change > 0 ? `+${keyword.change}` : keyword.change}
                                  </span>
                                ) : (
                                  '-'
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center p-8 text-muted-foreground">
                      No keyword data available yet
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  Download Keyword Report
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          {suggestionsLoading ? (
            <div className="flex justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : suggestionsError ? (
            <Alert variant="destructive">
              <AlertTitle>Error loading content suggestions</AlertTitle>
              <AlertDescription>
                {suggestionsError instanceof Error ? suggestionsError.message : "Unknown error occurred"}
              </AlertDescription>
            </Alert>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Content Suggestions</CardTitle>
                <CardDescription>
                  Recommended content topics to improve your SEO
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contentSuggestions && contentSuggestions.length > 0 ? (
                  <div className="space-y-4">
                    {contentSuggestions.map((suggestion) => (
                      <div key={suggestion.id} className="border rounded-lg p-4">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-lg">{suggestion.title}</h3>
                          <Badge>{suggestion.type}</Badge>
                        </div>
                        <p className="text-sm mt-2 text-muted-foreground">{suggestion.description}</p>
                        <div className="mt-2">
                          <div className="flex items-center gap-2 flex-wrap mt-2">
                            {suggestion.targetKeywords?.map((keyword, i) => (
                              <Badge key={i} variant="secondary">{keyword}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3 text-sm">
                          <span className="font-medium">Search Volume:</span> {suggestion.searchVolume || 0}
                          <span className="ml-4 font-medium">Difficulty:</span> {suggestion.difficulty || 0}/100
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 text-muted-foreground">
                    No content suggestions available yet
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline">
                  View All Content Suggestions
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        {/* Tools Tab */}
        <TabsContent value="tools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Tools</CardTitle>
              <CardDescription>
                Useful tools to improve your SEO performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="outline" size="lg" className="h-24 flex flex-col items-center justify-center">
                  <span className="mb-1">Keyword Research</span>
                  <KeyRound className="h-5 w-5" />
                </Button>
                
                <Button variant="outline" size="lg" className="h-24 flex flex-col items-center justify-center">
                  <span className="mb-1">Technical Audit</span>
                  <BarChart4 className="h-5 w-5" />
                </Button>
                
                <Button variant="outline" size="lg" className="h-24 flex flex-col items-center justify-center">
                  <span className="mb-1">Content Analyzer</span>
                  <BookText className="h-5 w-5" />
                </Button>
                
                <Button variant="outline" size="lg" className="h-24 flex flex-col items-center justify-center">
                  <span className="mb-1">Backlink Analysis</span>
                  <Loader2 className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                These tools help you identify opportunities and fix issues on your website.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}