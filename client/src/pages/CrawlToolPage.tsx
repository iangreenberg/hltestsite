import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Loader2, Wrench, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function CrawlToolPage() {
  const [url, setUrl] = useState('https://thehemplaunch.com');
  const [maxPages, setMaxPages] = useState(20);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{success: boolean; message: string; timestamp: string} | null>(null);
  const { toast } = useToast();

  async function startCrawl() {
    try {
      setLoading(true);
      setResult(null);
      
      // Use the full URL with the protocol and host
      const apiUrl = window.location.protocol + '//' + window.location.host + '/api/seo/crawl';
      console.log('Making request to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        },
        credentials: 'include',
        body: JSON.stringify({ url, maxPages })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} ${errorText}`);
      }
      
      const data = await response.json();
      setResult(data);
      
      toast({
        title: 'Crawl started successfully',
        description: `Started crawling ${url}. This process may take a few minutes to complete.`,
        variant: 'default',
      });
    } catch (error) {
      console.error('Error starting crawl:', error);
      toast({
        title: 'Error starting crawl',
        description: error instanceof Error ? error.message : String(error),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">SEO Crawler Tool</h1>
      <p className="text-muted-foreground mb-8">
        This tool crawls a website and generates an SEO report with issues, insights, and recommendations.
        The crawl runs asynchronously and might take a few minutes to complete.
      </p>
      
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Start a New Website Crawl</CardTitle>
            <CardDescription>
              Enter the website URL and configuration options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <Input 
                  id="url" 
                  value={url} 
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter website URL (e.g., https://example.com)" 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="maxPages">Maximum Pages to Crawl: {maxPages}</Label>
                  <span className="text-muted-foreground text-sm">{maxPages} pages</span>
                </div>
                <Slider
                  id="maxPages"
                  min={5}
                  max={50}
                  step={5}
                  value={[maxPages]}
                  onValueChange={(value) => setMaxPages(value[0])}
                />
                <p className="text-sm text-muted-foreground">
                  Higher values provide more comprehensive reports but take longer to complete.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={startCrawl} 
              disabled={loading || !url.trim()}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Starting Crawl...
                </>
              ) : (
                <>
                  <Wrench className="mr-2 h-4 w-4" />
                  Start Crawling
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>
              Crawl status and information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                <div className="flex items-center text-green-600">
                  <Check className="mr-2 h-5 w-5" />
                  <span className="font-medium">Crawl Started Successfully</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">URL:</span>
                    <span className="font-medium truncate max-w-[150px]">{url}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Pages:</span>
                    <span>{maxPages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Started At:</span>
                    <span>{new Date(result.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
                
                <div className="pt-2 text-sm text-muted-foreground">
                  <p>
                    The crawl process is running in the background. When completed, 
                    results will be available in the SEO Dashboard.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-[200px] flex flex-col items-center justify-center text-center text-muted-foreground">
                <p>No active crawl</p>
                <p className="text-sm mt-2">Start a new crawl to generate an SEO report</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={() => window.location.href = '/admin-nav'}>
          Back to Admin Navigation
        </Button>
        <Button variant="outline" onClick={() => window.location.href = '/admin/seo-dashboard'}>
          Go to SEO Dashboard
        </Button>
      </div>
    </div>
  );
}