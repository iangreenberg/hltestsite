import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { testSeoApi, getLatestSeoReport, startCrawl } from '@/lib/seoApi';
import type { SeoReport, SeoIssue, ContentSuggestion, PageAudit } from '@/lib/seoApi';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';

import { 
  FileWarning, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  RefreshCcw,
  Lightbulb,
  FileText,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Minus,
  WandSparkles,
  Search,
  Sparkles,
  Hammer,
  Bot,
  TrendingUp,
  BookText,
  Braces,
  Tag
} from 'lucide-react';

// Additional interfaces for the dashboard
interface KeywordRanking {
  keyword: string;
  position: number;
  url: string;
  lastUpdated: string;
  previousPosition?: number;
  change?: number;
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  status: 'good' | 'needs_improvement' | 'poor';
}

interface KeywordResearchResult {
  keyword: string;
  searchVolume: number;
  difficulty: number; 
  relevance: number;
  cpc?: number;
  trend?: 'up' | 'down' | 'stable';
  userIntent?: 'informational' | 'navigational' | 'transactional' | 'commercial';
  relatedKeywords?: string[];
  suggestedContent?: string[];
}

interface ContentTopic {
  id: string;
  topic: string;
  totalSearchVolume: number;
  averageDifficulty: number;
  keywords: KeywordResearchResult[];
  suggestedTitle: string;
  suggestedSubheadings: string[];
}

// Extend the imported SeoReport interface for our dashboard
interface DashboardSeoReport extends SeoReport {
  keywordRankings?: KeywordRanking[];
  topPriorityFixes?: SeoIssue[];
  contentSuggestions?: ContentSuggestion[];
  performanceMetrics?: PerformanceMetric[];
}

function SEODashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [researchKeywords, setResearchKeywords] = useState<string>('');
  const [seedKeywords, setSeedKeywords] = useState<string[]>([]);
  
  // State for API connection status
  const [apiConnected, setApiConnected] = useState<boolean | null>(null);
  
  // Check API connection on component mount
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        const result = await testSeoApi();
        const isConnected = result.success;
        setApiConnected(isConnected);
        
        if (isConnected) {
          toast({
            title: "SEO API Connected",
            description: "Successfully connected to the SEO API",
          });
        } else {
          toast({
            title: "SEO API Connection Issue",
            description: "Could not connect to the SEO API. Some features may be limited.",
            variant: "destructive",
          });
        }
      } catch (error) {
        setApiConnected(false);
        toast({
          title: "SEO API Connection Error",
          description: "Failed to connect to the SEO API. Please try again later.",
          variant: "destructive",
        });
      }
    };
    
    checkApiConnection();
  }, [toast]);
  
  // Fetch latest SEO report
  const { 
    data: report,
    isLoading: reportLoading,
    error: reportError,
    refetch: refetchReport
  } = useQuery({
    queryKey: ['seo', 'report', 'latest'],
    queryFn: async () => {
      const data = await getLatestSeoReport();
      
      // If we couldn't get a report, return a minimal structure to avoid UI errors
      if (!data) {
        return {
          date: new Date().toISOString(),
          totalIssues: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
          newIssues: 0,
          fixedIssues: 0,
          overallScore: 0,
          keywordRankings: [],
          topPriorityFixes: [],
          contentSuggestions: [],
          performanceMetrics: []
        };
      }
      
      return data;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Fetch page audits
  const { 
    data: pageAudits,
    isLoading: auditsLoading,
  } = useQuery({
    queryKey: ['seo', 'page-audits'],
    queryFn: async () => {
      try {
        const response = await apiRequest('GET', '/api/seo/audits');
        return await response.json();
      } catch (error) {
        console.error('Error fetching page audits:', error);
        // Return empty array to avoid UI errors
        return [];
      }
    },
    enabled: activeTab === 'pages',
    retry: 1,
  });
  
  // Fetch fixable issues for the automation tab
  const {
    data: fixableIssues,
    isLoading: fixableIssuesLoading,
  } = useQuery({
    queryKey: ['seo', 'fixable-issues'],
    queryFn: async () => {
      // Direct API request since we don't have a dedicated function for this yet
      const response = await apiRequest('GET', '/api/seo/fixable-issues');
      return await response.json();
    },
    enabled: activeTab === 'automation',
    retry: 1,
  });
  
  // Fetch top keywords for the automation tab
  const {
    data: topKeywords,
    isLoading: topKeywordsLoading,
  } = useQuery({
    queryKey: ['seo', 'top-keywords'],
    queryFn: async () => {
      // Direct API request since we don't have a dedicated function for this yet
      const response = await apiRequest('GET', '/api/seo/top-keywords?limit=10&minVolume=100');
      return await response.json();
    },
    enabled: activeTab === 'automation',
    retry: 1,
  });
  
  // Fetch suggested content topics
  const {
    data: suggestedTopics,
    isLoading: suggestedTopicsLoading,
  } = useQuery({
    queryKey: ['seo', 'suggested-topics'],
    queryFn: async () => {
      // Direct API request since we don't have a dedicated function for this yet
      const response = await apiRequest('GET', '/api/seo/suggested-topics?limit=5&minVolume=100');
      return await response.json();
    },
    enabled: activeTab === 'automation',
    retry: 1,
  });
  
  // Mutation to run a new audit
  const runAuditMutation = useMutation({
    mutationFn: async () => {
      return await startCrawl('https://thehemplaunch.com', 50);
    },
    onSuccess: () => {
      toast({
        title: "SEO Audit Started",
        description: "The audit is running in the background. Check back in a few minutes.",
      });
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['seo', 'report', 'latest'] });
    },
    onError: (error) => {
      toast({
        title: "Audit Failed",
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: "destructive",
      });
    }
  });
  
  // Mutation to fix all issues
  const fixAllIssuesMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/seo/fix-all-issues');
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Auto-fix Completed",
        description: `Successfully fixed ${data.succeeded || 0} issues. ${data.failed || 0} issues could not be fixed.`,
      });
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['seo', 'fixable-issues'] });
      queryClient.invalidateQueries({ queryKey: ['seo', 'report', 'latest'] });
    },
    onError: (error) => {
      toast({
        title: "Auto-fix Failed",
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: "destructive",
      });
    }
  });
  
  // Mutation to fix a specific issue
  const fixIssueMutation = useMutation({
    mutationFn: async (issueId: string) => {
      const response = await apiRequest('POST', `/api/seo/fix-issue/${issueId}`);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Issue Fixed",
        description: "Successfully fixed the issue.",
      });
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['seo', 'fixable-issues'] });
      queryClient.invalidateQueries({ queryKey: ['seo', 'report', 'latest'] });
    },
    onError: (error) => {
      toast({
        title: "Fix Failed",
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: "destructive",
      });
    }
  });
  
  // Mutation to research keywords
  const researchKeywordsMutation = useMutation({
    mutationFn: async (seedKeywords: string[]) => {
      // Use the API client to research keywords
      const response = await apiRequest('POST', '/api/seo/research-keywords', { seedKeywords });
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Keyword Research Complete",
        description: "Successfully researched keywords. Check the results below.",
      });
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['seo', 'top-keywords'] });
    },
    onError: (error) => {
      toast({
        title: "Keyword Research Failed",
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: "destructive",
      });
    }
  });
  
  // Handle loading state
  if (reportLoading) {
    return (
      <div className="container mx-auto py-10 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4">Loading SEO Dashboard...</p>
      </div>
    );
  }
  
  // Handle error state
  if (reportError) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load SEO data. Please try again later or contact support.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">SEO Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and improve your site's search engine performance
          </p>
        </div>
        <Button 
          onClick={() => runAuditMutation.mutate()}
          disabled={runAuditMutation.isPending}
        >
          {runAuditMutation.isPending ? (
            <span className="flex items-center">
              <span className="animate-spin mr-1">
                <RefreshCcw className="h-4 w-4" />
              </span>
              Running...
            </span>
          ) : (
            <span className="flex items-center">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Run New Audit
            </span>
          )}
        </Button>
      </div>
      
      <Tabs 
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="actions">Action Plan</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
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
                    {report?.overallScore}/100
                  </div>
                  <Progress 
                    value={report?.overallScore || 0} 
                    className={`w-full mt-2 ${
                      (report?.overallScore || 0) >= 90 ? "bg-green-500/20" :
                      (report?.overallScore || 0) >= 70 ? "bg-yellow-500/20" :
                      "bg-red-500/20"
                    }`}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Issues Summary */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Critical
                    </span>
                    <span className="font-bold">{report?.totalIssues.critical}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-500 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      High
                    </span>
                    <span className="font-bold">{report?.totalIssues.high}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-500 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Medium
                    </span>
                    <span className="font-bold">{report?.totalIssues.medium}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Low
                    </span>
                    <span className="font-bold">{report?.totalIssues.low}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="text-sm text-muted-foreground w-full">
                  <div className="flex justify-between w-full">
                    <span>New issues: {report?.newIssues}</span>
                    <span>Fixed: {report?.fixedIssues}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
            
            {/* Top Keywords */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Top Keywords</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  {report?.keywordRankings.slice(0, 3).map((keyword, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="truncate text-sm" title={keyword.keyword}>
                        {keyword.keyword}
                      </span>
                      <div className="flex items-center">
                        <span className="font-bold mr-2">#{keyword.position}</span>
                        {keyword.change ? (
                          keyword.change > 0 ? (
                            <span className="text-green-500 flex items-center text-xs">
                              <ArrowUp className="h-3 w-3" />
                              {keyword.change}
                            </span>
                          ) : keyword.change < 0 ? (
                            <span className="text-red-500 flex items-center text-xs">
                              <ArrowDown className="h-3 w-3" />
                              {Math.abs(keyword.change)}
                            </span>
                          ) : (
                            <span className="text-muted-foreground flex items-center text-xs">
                              <Minus className="h-3 w-3" />
                            </span>
                          )
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" size="sm" className="px-0" onClick={() => setActiveTab('keywords')}>
                  View all keywords
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Priority Issues */}
          <Card>
            <CardHeader>
              <CardTitle>Priority Issues to Fix</CardTitle>
              <CardDescription>
                Addressing these issues will have the biggest impact on your SEO performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issue</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Page</TableHead>
                    <TableHead className="hidden md:table-cell">Recommendation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {report?.topPriorityFixes.slice(0, 5).map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell>
                        <div className="font-medium">{issue.title}</div>
                        <div className="text-sm text-muted-foreground hidden md:block">
                          {issue.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          issue.severity === 'critical' ? 'destructive' :
                          issue.severity === 'high' ? 'destructive' :
                          issue.severity === 'medium' ? 'default' :
                          'outline'
                        }>
                          {issue.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="truncate max-w-[150px]" title={issue.url}>
                        {issue.url ? new URL(issue.url).pathname : 'N/A'}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {issue.recommendedFix}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => setActiveTab('issues')}>
                View All Issues
              </Button>
            </CardFooter>
          </Card>
          
          {/* Content Ideas */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Content</CardTitle>
              <CardDescription>
                Content suggestions to improve search visibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report?.contentSuggestions.slice(0, 2).map((suggestion) => (
                  <div key={suggestion.id} className="space-y-2">
                    <h3 className="font-medium text-lg">{suggestion.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">
                        {suggestion.keyword}
                      </Badge>
                      <Badge variant={
                        suggestion.expectedTraffic === 'high' ? 'default' :
                        suggestion.expectedTraffic === 'medium' ? 'secondary' :
                        'outline'
                      }>
                        {suggestion.expectedTraffic} traffic
                      </Badge>
                      <Badge variant="outline">
                        {suggestion.suggestedWordCount} words
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <strong>Suggested Headings:</strong>
                      <ul className="pl-5 list-disc">
                        {suggestion.suggestedHeadings.slice(0, 3).map((heading, index) => (
                          <li key={index}>{heading}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Issues Tab */}
        <TabsContent value="issues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All SEO Issues</CardTitle>
              <CardDescription>
                Complete list of identified SEO issues across the site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Issue</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Page</TableHead>
                      <TableHead className="hidden md:table-cell">Recommendation</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report?.topPriorityFixes.map((issue) => (
                      <TableRow key={issue.id}>
                        <TableCell>
                          <div className="font-medium">{issue.title}</div>
                          <div className="text-sm text-muted-foreground hidden sm:block">
                            {issue.description}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            issue.severity === 'critical' ? 'destructive' :
                            issue.severity === 'high' ? 'destructive' :
                            issue.severity === 'medium' ? 'default' :
                            'outline'
                          }>
                            {issue.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {issue.category.replace('_', ' ')}
                        </TableCell>
                        <TableCell className="truncate max-w-[100px]" title={issue.url}>
                          {issue.url ? new URL(issue.url).pathname : 'N/A'}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {issue.recommendedFix}
                        </TableCell>
                        <TableCell>
                          {issue.fixed ? (
                            <span className="text-green-500 flex items-center">
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Fixed
                            </span>
                          ) : issue.ignored ? (
                            <span className="text-muted-foreground flex items-center">
                              <Minus className="h-4 w-4 mr-1" />
                              Ignored
                            </span>
                          ) : (
                            <span className="text-yellow-500 flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              Pending
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <div className="w-full flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('automation')}>
                  <WandSparkles className="h-4 w-4 mr-2" />
                  Auto-Fix Issues
                </Button>
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Pages Tab */}
        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Page Audits</CardTitle>
              <CardDescription>
                SEO performance of individual pages
              </CardDescription>
            </CardHeader>
            <CardContent>
              {auditsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Page</TableHead>
                      <TableHead>SEO Score</TableHead>
                      <TableHead className="hidden md:table-cell">Title</TableHead>
                      <TableHead>Issues</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pageAudits?.map((page) => (
                      <TableRow key={page.url}>
                        <TableCell className="truncate max-w-[150px]" title={page.url}>
                          {page.url ? new URL(page.url).pathname : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Progress 
                              value={page.score} 
                              className={`w-[60px] mr-2 ${
                                page.score >= 90 ? "bg-green-500/20" :
                                page.score >= 70 ? "bg-yellow-500/20" :
                                "bg-red-500/20"
                              }`}
                            />
                            <span>{page.score}/100</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell truncate max-w-[200px]" title={page.title}>
                          {page.title}
                        </TableCell>
                        <TableCell>
                          {page.issues.length}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Keywords Tab */}
        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Rankings</CardTitle>
              <CardDescription>
                Track your position for key search terms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keyword</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Change</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report?.keywordRankings.map((keyword, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {keyword.keyword}
                        </TableCell>
                        <TableCell>
                          <div className="font-bold">#{keyword.position}</div>
                        </TableCell>
                        <TableCell>
                          {keyword.change ? (
                            <div className="flex items-center">
                              {keyword.change > 0 ? (
                                <span className="text-green-500 flex items-center">
                                  <ArrowUp className="h-4 w-4 mr-1" />
                                  {keyword.change}
                                </span>
                              ) : keyword.change < 0 ? (
                                <span className="text-red-500 flex items-center">
                                  <ArrowDown className="h-4 w-4 mr-1" />
                                  {Math.abs(keyword.change)}
                                </span>
                              ) : (
                                <span className="text-muted-foreground flex items-center">
                                  <Minus className="h-4 w-4 mr-1" />
                                  0
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">New</span>
                          )}
                        </TableCell>
                        <TableCell className="truncate max-w-[200px]" title={keyword.url}>
                          {keyword.url ? new URL(keyword.url).pathname : 'N/A'}
                        </TableCell>
                        <TableCell>
                          {new Date(keyword.lastUpdated).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <div className="w-full flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('automation')}>
                  <Search className="h-4 w-4 mr-2" />
                  Research Keywords
                </Button>
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Actions Tab */}
        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Action Plan</CardTitle>
              <CardDescription>
                Follow these steps to improve your SEO performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Critical Actions</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 bg-red-100 p-1.5 rounded-full text-red-600">
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Fix critical issues</p>
                        <p className="text-sm text-muted-foreground">
                          Address the {report?.totalIssues.critical} critical issues identified in the
                          SEO Audit. These are the most urgent improvements needed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">High Priority Actions</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 bg-orange-100 p-1.5 rounded-full text-orange-600">
                        <FileWarning className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Optimize meta descriptions</p>
                        <p className="text-sm text-muted-foreground">
                          Add or improve meta descriptions across the site to increase click-through rates
                          from search results.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 bg-orange-100 p-1.5 rounded-full text-orange-600">
                        <Lightbulb className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Create content for top keywords</p>
                        <p className="text-sm text-muted-foreground">
                          Develop high-quality content targeting your key ranking opportunities
                          based on the content suggestions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Medium Priority Actions</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 bg-yellow-100 p-1.5 rounded-full text-yellow-600">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Improve internal linking structure</p>
                        <p className="text-sm text-muted-foreground">
                          Add more internal links between related pages to improve site 
                          crawlability and user navigation.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5 bg-yellow-100 p-1.5 rounded-full text-yellow-600">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">Improve page loading speed</p>
                        <p className="text-sm text-muted-foreground">
                          Optimize images, minimize JavaScript, and implement browser caching
                          to improve page loading times.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => setActiveTab('issues')}>
                View All Issues
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Automation Tab */}
        <TabsContent value="automation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Auto-Fix Issues Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <WandSparkles className="h-5 w-5 mr-2 text-primary" />
                  Automatic Issue Fixing
                </CardTitle>
                <CardDescription>
                  Let our AI automatically fix common SEO issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                {fixableIssuesLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : fixableIssues?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mb-3" />
                    <h3 className="text-xl font-medium">All Issues Fixed!</h3>
                    <p className="text-muted-foreground mt-2">
                      There are no auto-fixable issues detected on your site right now.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="mb-4">
                      We found {fixableIssues?.length} issues that can be automatically fixed:
                    </p>
                    <ScrollArea className="h-[250px] pr-4">
                      <div className="space-y-3">
                        {fixableIssues?.map((issue) => (
                          <div 
                            key={issue.id} 
                            className="border rounded-md p-3 relative"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{issue.title}</p>
                                <p className="text-sm text-muted-foreground truncate max-w-md" title={issue.url}>
                                  {issue.url && new URL(issue.url).pathname}
                                </p>
                              </div>
                              <Badge variant={
                                issue.severity === 'critical' ? 'destructive' :
                                issue.severity === 'high' ? 'destructive' :
                                issue.severity === 'medium' ? 'default' :
                                'outline'
                              }>
                                {issue.severity}
                              </Badge>
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">
                                {issue.category.replace('_', ' ')}
                              </span>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => fixIssueMutation.mutate(issue.id)}
                                disabled={fixIssueMutation.isPending}
                                className="flex items-center"
                              >
                                {fixIssueMutation.isPending ? (
                                  <>
                                    <span className="animate-spin mr-1">
                                      <RefreshCcw className="h-3 w-3" />
                                    </span>
                                    Fixing...
                                  </>
                                ) : (
                                  <>
                                    <WandSparkles className="h-3 w-3 mr-1" />
                                    Auto-Fix
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => fixAllIssuesMutation.mutate()}
                  disabled={fixAllIssuesMutation.isPending || fixableIssuesLoading || (fixableIssues?.length === 0)}
                >
                  {fixAllIssuesMutation.isPending ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-1">
                        <RefreshCcw className="h-4 w-4" />
                      </span>
                      Fixing All Issues...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Auto-Fix All Issues
                    </span>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {/* Keyword Research Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2 text-primary" />
                  Keyword Research
                </CardTitle>
                <CardDescription>
                  Discover high-value keywords to target in your content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="keyword-research" className="text-sm font-medium mb-1 block">
                      Research a keyword
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        id="keyword-research"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter a keyword (e.g., hemp business)"
                        value={researchKeywords}
                        onChange={(e) => setResearchKeywords(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && researchKeywords.trim() !== '') {
                            setSeedKeywords([researchKeywords.trim()]);
                            researchKeywordsMutation.mutate([researchKeywords.trim()]);
                          }
                        }}
                      />
                      <Button 
                        onClick={() => {
                          if (researchKeywords.trim() !== '') {
                            setSeedKeywords([researchKeywords.trim()]);
                            researchKeywordsMutation.mutate([researchKeywords.trim()]);
                          }
                        }}
                        disabled={researchKeywordsMutation.isPending || !researchKeywords.trim()}
                      >
                        {researchKeywordsMutation.isPending ? (
                          <span className="animate-spin">
                            <RefreshCcw className="h-4 w-4" />
                          </span>
                        ) : (
                          <Search className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Top keywords for your site</h3>
                    {topKeywordsLoading ? (
                      <div className="flex justify-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      </div>
                    ) : (
                      <ScrollArea className="h-[180px] pr-4">
                        <div className="space-y-3">
                          {topKeywords?.map((keyword, index) => (
                            <div key={index} className="border rounded-md p-3">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">{keyword.keyword}</h4>
                                <div className="flex items-center">
                                  <span className="text-sm font-bold mr-1">{keyword.searchVolume}</span>
                                  <span className="text-xs text-muted-foreground">searches/mo</span>
                                </div>
                              </div>
                              <div className="mt-1 flex justify-between text-sm">
                                <div className="space-x-2">
                                  <Badge variant="outline" className="font-normal">
                                    {keyword.userIntent}
                                  </Badge>
                                  {keyword.trend && (
                                    <Badge variant={keyword.trend === 'up' ? 'default' : 'secondary'} className="font-normal">
                                      {keyword.trend === 'up' ? (
                                        <ArrowUp className="h-3 w-3 mr-1" />
                                      ) : keyword.trend === 'down' ? (
                                        <ArrowDown className="h-3 w-3 mr-1" />
                                      ) : (
                                        <Minus className="h-3 w-3 mr-1" />
                                      )}
                                      {keyword.trend}
                                    </Badge>
                                  )}
                                </div>
                                <span className="text-muted-foreground">
                                  Difficulty: {keyword.difficulty}/100
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => {
                    // Take the top 5 keywords and research them
                    if (topKeywords && topKeywords.length > 0) {
                      const seeds = topKeywords.slice(0, 5).map(k => k.keyword);
                      setSeedKeywords(seeds);
                      researchKeywordsMutation.mutate(seeds);
                    }
                  }}
                  disabled={researchKeywordsMutation.isPending || topKeywordsLoading || !topKeywords?.length}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Research Similar
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setActiveTab('keywords');
                  }}
                >
                  <Tag className="h-4 w-4 mr-2" />
                  View Rankings
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Content Topic Suggestions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookText className="h-5 w-5 mr-2 text-primary" />
                Suggested Content Topics
              </CardTitle>
              <CardDescription>
                Topics that can help you attract more relevant traffic to your site
              </CardDescription>
            </CardHeader>
            <CardContent>
              {suggestedTopicsLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : !suggestedTopics?.length ? (
                <div className="text-center py-12">
                  <p>No suggested topics available. Run a keyword research to generate topics.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {suggestedTopics?.map((topic) => (
                    <div key={topic.id} className="border rounded-md p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-medium">{topic.suggestedTitle}</h3>
                        <div className="text-right">
                          <div className="text-sm font-medium">{topic.totalSearchVolume.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">monthly searches</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Suggested Outline:</h4>
                        <ul className="space-y-1 text-sm pl-5 list-disc">
                          {topic.suggestedSubheadings.map((heading, idx) => (
                            <li key={idx}>{heading}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">
                          Difficulty: {topic.averageDifficulty}/100
                        </span>
                        <Button variant="outline" size="sm">
                          <Braces className="h-3 w-3 mr-1" />
                          Copy Outline
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="w-full flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => {
                    // Generate new content topics based on current keywords
                    // In real implementation, this would call an API
                    toast({
                      title: "Generating New Topics",
                      description: "Our AI is analyzing your keywords to generate new content topics.",
                    });
                  }}
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Generate New Topics
                </Button>
                <Button variant="default">
                  <FileText className="h-4 w-4 mr-2" />
                  Create Content Plan
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SEODashboard;