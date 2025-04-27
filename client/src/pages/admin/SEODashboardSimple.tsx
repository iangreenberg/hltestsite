import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, RefreshCw, AlertTriangle, Search } from "lucide-react";
import { seoApiClient } from "@/lib/seoApiClient";
import { Link } from "wouter";

// A simple SEO Dashboard that connects to our API
export default function SEODashboardSimple() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for API data
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<boolean | null>(null);
  const [seoScore, setSeoScore] = useState<number>(0);
  const [issueCount, setIssueCount] = useState({ critical: 0, high: 0, medium: 0, low: 0, info: 0 });
  const [fixableIssues, setFixableIssues] = useState<any[]>([]);
  const [topKeywords, setTopKeywords] = useState<any[]>([]);
  
  // Test API connection
  const testApiConnection = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await seoApiClient.testApiConnection();
      setApiStatus(true);
      toast({
        title: "API Connection Successful",
        description: result.message || "SEO API is working correctly",
        variant: "default",
      });
    } catch (err) {
      setApiStatus(false);
      setError(err instanceof Error ? err.message : 'Failed to connect to SEO API');
      toast({
        title: "API Connection Failed",
        description: err instanceof Error ? err.message : 'Could not connect to SEO API',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // First test API connection
        await testApiConnection();
        
        // Try to load report data
        try {
          const report = await seoApiClient.getLatestReport();
          
          if (report) {
            setSeoScore(report.overallScore || 0);
            setIssueCount(report.totalIssues || { critical: 0, high: 0, medium: 0, low: 0, info: 0 });
          }
        } catch (reportErr) {
          console.warn('Could not load SEO report:', reportErr);
          // Continue with other data even if report fails
        }
        
        // Try to load fixable issues
        try {
          const issues = await seoApiClient.getFixableIssues();
          setFixableIssues(Array.isArray(issues) ? issues : []);
        } catch (issuesErr) {
          console.warn('Could not load fixable issues:', issuesErr);
        }
        
        // Try to load top keywords
        try {
          const keywords = await seoApiClient.getTopKeywords();
          setTopKeywords(Array.isArray(keywords) ? keywords : []);
        } catch (keywordsErr) {
          console.warn('Could not load top keywords:', keywordsErr);
        }
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load SEO data');
        toast({
          title: "Failed to load SEO data",
          description: "Please try again later or contact support.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, []);
  
  // Run a new SEO audit
  const runAudit = async () => {
    try {
      setIsLoading(true);
      const result = await seoApiClient.runAudit();
      
      toast({
        title: "SEO Audit Started",
        description: "The audit is now running in the background.",
        variant: "default",
      });
      
      // Refresh data after audit starts
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (err) {
      toast({
        title: "Failed to Start Audit",
        description: err instanceof Error ? err.message : 'An error occurred',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">SEO Dashboard</h2>
          <p className="text-muted-foreground">
            Monitor and improve your website's search engine optimization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={testApiConnection}
            disabled={isLoading}
          >
            Test API Connection
          </Button>
          <Link href="/admin/seo-test">
            <Button variant="outline">
              API Testing Tool
            </Button>
          </Link>
        </div>
      </div>
      
      {/* API Status Indicator */}
      {apiStatus === false && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <p className="font-medium">
                API Connection Failed: {error || "Could not connect to the SEO API"}
              </p>
            </div>
            <p className="mt-2 text-sm text-red-600">
              Please check your network connection or contact support.
              You can use the API Testing Tool to diagnose connectivity issues.
            </p>
          </CardContent>
        </Card>
      )}
      
      {apiStatus === true && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <p className="font-medium">
                API Connection Successful
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* SEO Score */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Overall SEO Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold">
                    {seoScore}/100
                  </div>
                  <Progress 
                    value={seoScore} 
                    className={`w-full mt-2 ${
                      seoScore >= 90 ? "bg-green-500/20" :
                      seoScore >= 70 ? "bg-yellow-500/20" :
                      "bg-red-500/20"
                    }`}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Total Issues */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Current Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" /> Critical
                    </span>
                    <span className="font-semibold">{issueCount.critical}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-500 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" /> High
                    </span>
                    <span className="font-semibold">{issueCount.high}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-500">Medium</span>
                    <span className="font-semibold">{issueCount.medium}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-500">Low</span>
                    <span className="font-semibold">{issueCount.low}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    onClick={runAudit}
                    disabled={isLoading}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Run SEO Audit
                  </Button>
                  <Button 
                    className="w-full"
                    variant="outline"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Research Keywords
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Issues Tab */}
        <TabsContent value="issues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fixable SEO Issues</CardTitle>
              <CardDescription>
                These issues can be automatically fixed by our system
              </CardDescription>
            </CardHeader>
            <CardContent>
              {fixableIssues.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  {isLoading ? "Loading issues..." : "No fixable issues found"}
                </p>
              ) : (
                <div className="space-y-4">
                  {fixableIssues.map((issue: any, index: number) => (
                    <div key={issue.id || index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{issue.title}</h3>
                          <p className="text-sm text-muted-foreground">{issue.description}</p>
                          {issue.url && (
                            <p className="text-xs text-blue-500 mt-1">
                              {issue.url}
                            </p>
                          )}
                        </div>
                        <Button size="sm">Fix Issue</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Keywords Tab */}
        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Keywords</CardTitle>
              <CardDescription>
                These keywords are bringing the most traffic to your site
              </CardDescription>
            </CardHeader>
            <CardContent>
              {topKeywords.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  {isLoading ? "Loading keywords..." : "No keyword data available"}
                </p>
              ) : (
                <div className="relative">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium p-2">Keyword</th>
                        <th className="text-right font-medium p-2">Search Volume</th>
                        <th className="text-right font-medium p-2">Difficulty</th>
                        <th className="text-right font-medium p-2">Ranking</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topKeywords.map((keyword: any, index: number) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="p-2">{keyword.keyword}</td>
                          <td className="p-2 text-right">{keyword.searchVolume || 'N/A'}</td>
                          <td className="p-2 text-right">{keyword.difficulty || 'N/A'}</td>
                          <td className="p-2 text-right">{keyword.position || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Actions Tab */}
        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Actions</CardTitle>
              <CardDescription>
                Improve your website's search engine ranking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="w-full p-8 h-auto flex flex-col items-center justify-center">
                  <RefreshCw className="h-8 w-8 mb-2" />
                  <span>Run Full Site Audit</span>
                </Button>
                
                <Button className="w-full p-8 h-auto flex flex-col items-center justify-center" variant="outline">
                  <CheckCircle className="h-8 w-8 mb-2" />
                  <span>Fix All Issues</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}