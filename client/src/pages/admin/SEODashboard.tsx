import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { queryClient } from '@/lib/queryClient';

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
  Minus
} from 'lucide-react';

// Interface for SEO data - simplified version of server types
interface SEOIssue {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  category: string;
  url?: string;
  affectedElement?: string;
  recommendedFix?: string;
  detected: string;
  fixed?: string;
  ignored?: boolean;
}

interface KeywordRanking {
  keyword: string;
  position: number;
  url: string;
  lastUpdated: string;
  previousPosition?: number;
  change?: number;
}

interface ContentSuggestion {
  id: string;
  keyword: string;
  title: string;
  suggestedHeadings: string[];
  suggestedWordCount: number;
  competitorUrls: string[];
  expectedDifficulty: 'easy' | 'medium' | 'hard';
  expectedTraffic: 'low' | 'medium' | 'high';
  createdAt: string;
  implementedAt?: string;
}

// Interface for SEO actions (removed unused types)

interface IssueCount {
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  status: 'good' | 'needs_improvement' | 'poor';
}

interface SeoReport {
  date: string;
  totalIssues: IssueCount;
  newIssues: number;
  fixedIssues: number;
  overallScore: number;
  keywordRankings: KeywordRanking[];
  topPriorityFixes: SEOIssue[];
  contentSuggestions: ContentSuggestion[];
  performanceMetrics: PerformanceMetric[];
}

interface PageAudit {
  url: string;
  title: string;
  score: number;
  issues: SEOIssue[];
}

function SEODashboard() {
  const { toast } = useToast();
  // Removed user auth check since we're allowing public access
  const [activeTab, setActiveTab] = useState('overview');
  
  // Removed admin check to allow public access
  
  // Fetch latest SEO report
  const { 
    data: report,
    isLoading: reportLoading,
    error: reportError
  } = useQuery({
    queryKey: ['/api/seo/report/latest'],
    queryFn: async () => {
      // For development, return mock data
      const mockReport: SeoReport = {
        date: new Date().toISOString(),
        totalIssues: {
          critical: 3,
          high: 5,
          medium: 12,
          low: 18,
          info: 8
        },
        newIssues: 7,
        fixedIssues: 4,
        overallScore: 84,
        keywordRankings: [
          {
            keyword: 'hemp business startup',
            position: 8,
            url: 'https://hltestsite-4vq3.vercel.app/hemp-business-startup',
            lastUpdated: new Date().toISOString(),
            previousPosition: 10,
            change: 2
          },
          {
            keyword: 'hemp product compliance',
            position: 15,
            url: 'https://hltestsite-4vq3.vercel.app/services/compliance',
            lastUpdated: new Date().toISOString(),
            previousPosition: 16,
            change: 1
          },
          {
            keyword: 'hemp brand development',
            position: 12,
            url: 'https://hltestsite-4vq3.vercel.app/services/brand-development',
            lastUpdated: new Date().toISOString(),
            previousPosition: 11,
            change: -1
          }
        ],
        topPriorityFixes: [
          {
            id: 'missing_meta_desc_1',
            title: 'Missing meta description',
            description: 'The page is missing a meta description tag, which is important for SEO.',
            severity: 'high',
            category: 'meta_tags',
            url: 'https://hltestsite-4vq3.vercel.app/services/support',
            recommendedFix: 'Add a descriptive meta description between 120-155 characters.',
            detected: new Date().toISOString()
          },
          {
            id: 'slow_lcp_2',
            title: 'Slow Largest Contentful Paint',
            description: 'The LCP is over 2.5 seconds, which may impact user experience and SEO.',
            severity: 'high',
            category: 'performance',
            url: 'https://hltestsite-4vq3.vercel.app/',
            recommendedFix: 'Optimize the hero image and defer non-critical JavaScript.',
            detected: new Date().toISOString()
          }
        ],
        contentSuggestions: [
          {
            id: 'suggestion_1',
            keyword: 'hemp payment processing solutions',
            title: 'The Ultimate Guide to Secure Payment Processing for Hemp Businesses in 2025',
            suggestedHeadings: [
              'Current Payment Processing Challenges for Hemp Businesses',
              'Top 5 Payment Processors that Accept Hemp Businesses'
            ],
            suggestedWordCount: 1800,
            competitorUrls: ['https://example.com/hemp-payments'],
            expectedDifficulty: 'medium',
            expectedTraffic: 'high',
            createdAt: new Date().toISOString()
          }
        ],
        performanceMetrics: [
          {
            name: 'LCP',
            value: 2.7,
            unit: 's',
            timestamp: new Date().toISOString(),
            status: 'needs_improvement'
          },
          {
            name: 'CLS',
            value: 0.08,
            unit: '',
            timestamp: new Date().toISOString(),
            status: 'good'
          }
        ]
      };
      
      try {
        // When API is ready, uncomment this to use the actual API
        // const response = await apiRequest('GET', '/api/seo/report/latest');
        // return await response.json();
        
        return mockReport;
      } catch (error) {
        console.error('Error fetching SEO report:', error);
        throw new Error('Failed to fetch SEO report');
      }
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Fetch page audits
  const { 
    data: pageAudits,
    isLoading: auditsLoading,
  } = useQuery({
    queryKey: ['/api/seo/audits'],
    queryFn: async () => {
      // For development, return mock data
      const mockAudits: PageAudit[] = [
        {
          url: 'https://hltestsite-4vq3.vercel.app/',
          title: 'HempLaunch | All-in-One Hemp Business Solutions',
          score: 89,
          issues: []
        },
        {
          url: 'https://hltestsite-4vq3.vercel.app/services/compliance',
          title: 'Compliance Services | HempLaunch',
          score: 85,
          issues: []
        },
        {
          url: 'https://hltestsite-4vq3.vercel.app/blog',
          title: 'Hemp Industry Blog | HempLaunch',
          score: 92,
          issues: []
        }
      ];
      
      try {
        // When API is ready, uncomment this to use the actual API
        // const response = await apiRequest('GET', '/api/seo/audits');
        // return await response.json();
        
        return mockAudits;
      } catch (error) {
        console.error('Error fetching page audits:', error);
        throw new Error('Failed to fetch page audits');
      }
    },
    enabled: activeTab === 'pages',
    retry: 1,
  });
  
  // Mutation to run a new audit
  const runAuditMutation = useMutation({
    mutationFn: async () => {
      try {
        // When API is ready, uncomment this to use the actual API
        // const response = await apiRequest('POST', '/api/seo/run-audit');
        // return await response.json();
        
        // Simulate API response for now
        return { success: true, message: 'Audit started successfully' };
      } catch (error) {
        console.error('Error running SEO audit:', error);
        throw new Error('Failed to start SEO audit');
      }
    },
    onSuccess: () => {
      toast({
        title: "SEO Audit Started",
        description: "The audit is running in the background. Check back in a few minutes.",
      });
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/seo/report/latest'] });
    },
    onError: (error) => {
      toast({
        title: "Audit Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Permission check removed to allow public access
  
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="actions">Action Plan</TabsTrigger>
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
                        <TableCell className="truncate max-w-[150px]" title={issue.url}>
                          {issue.url ? new URL(issue.url).pathname : 'N/A'}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {issue.recommendedFix}
                        </TableCell>
                        <TableCell>
                          {issue.fixed ? (
                            <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                              <span className="flex items-center">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Fixed
                              </span>
                            </Badge>
                          ) : issue.ignored ? (
                            <Badge variant="outline">
                              Ignored
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                Pending
                              </span>
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Pages Tab */}
        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Page Audits</CardTitle>
              <CardDescription>
                SEO performance for individual pages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Issues</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditsLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary mr-2"></div>
                          Loading page data...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : pageAudits?.map((page) => (
                    <TableRow key={page.url}>
                      <TableCell className="truncate max-w-[150px]" title={page.url}>
                        {new URL(page.url).pathname || '/'}
                      </TableCell>
                      <TableCell className="truncate max-w-[200px]" title={page.title}>
                        {page.title}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span 
                            className={
                              page.score >= 90 ? "text-green-500" :
                              page.score >= 70 ? "text-yellow-500" :
                              "text-red-500"
                            }
                          >
                            {page.score}
                          </span>
                          <span className="text-muted-foreground text-xs">/100</span>
                        </div>
                      </TableCell>
                      <TableCell>{page.issues.length}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Keywords Tab */}
        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Rankings</CardTitle>
              <CardDescription>
                Track your position in search results for target keywords
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                      <TableCell>{keyword.keyword}</TableCell>
                      <TableCell>
                        <div className="font-semibold">
                          #{keyword.position}
                        </div>
                      </TableCell>
                      <TableCell>
                        {keyword.change ? (
                          keyword.change > 0 ? (
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
                              No change
                            </span>
                          )
                        ) : (
                          <span className="text-muted-foreground">New</span>
                        )}
                      </TableCell>
                      <TableCell className="truncate max-w-[200px]" title={keyword.url}>
                        {new URL(keyword.url).pathname}
                      </TableCell>
                      <TableCell>
                        {new Date(keyword.lastUpdated).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Export Rankings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Action Plan Tab */}
        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Action Plan</CardTitle>
              <CardDescription>
                Prioritized actions to improve your search performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Technical Fixes */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center">
                    <FileWarning className="h-5 w-5 mr-2" />
                    Technical Issues to Fix
                  </h3>
                  
                  <div className="space-y-4">
                    {report?.topPriorityFixes.slice(0, 3).map((issue) => (
                      <div key={issue.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{issue.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {issue.description}
                            </p>
                          </div>
                          <Badge variant={
                            issue.severity === 'critical' ? 'destructive' :
                            issue.severity === 'high' ? 'destructive' :
                            'default'
                          }>
                            {issue.severity}
                          </Badge>
                        </div>
                        
                        <Separator className="my-3" />
                        
                        <div className="text-sm space-y-2">
                          <div><strong>URL:</strong> {issue.url ? new URL(issue.url).pathname : 'N/A'}</div>
                          <div><strong>Recommendation:</strong> {issue.recommendedFix}</div>
                        </div>
                        
                        <div className="mt-4 flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            Skip
                          </Button>
                          <Button size="sm">
                            Mark as Fixed
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Content Suggestions */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Content Opportunities
                  </h3>
                  
                  <div className="space-y-4">
                    {report?.contentSuggestions.map((suggestion) => (
                      <div key={suggestion.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{suggestion.title}</h4>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline">
                                {suggestion.keyword}
                              </Badge>
                              <Badge variant={
                                suggestion.expectedTraffic === 'high' ? 'default' :
                                'secondary'
                              }>
                                {suggestion.expectedTraffic} traffic potential
                              </Badge>
                            </div>
                          </div>
                          <Badge variant="outline">
                            {suggestion.suggestedWordCount} words
                          </Badge>
                        </div>
                        
                        <Separator className="my-3" />
                        
                        <div className="text-sm space-y-2">
                          <div>
                            <strong>Suggested Headings:</strong>
                            <ul className="pl-6 list-disc mt-1">
                              {suggestion.suggestedHeadings.map((heading, i) => (
                                <li key={i}>{heading}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            Save for Later
                          </Button>
                          <Button size="sm">
                            Create Content
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default SEODashboard;