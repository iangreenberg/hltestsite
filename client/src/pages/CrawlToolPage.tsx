import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Clock, Loader2 } from "lucide-react";
import { startCrawl } from "@/lib/seoApi";

// Create schema for the form
const formSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }).min(1, "URL is required"),
  maxPages: z.coerce.number().int().min(1).max(100).default(20)
});

type FormValues = z.infer<typeof formSchema>;

export default function CrawlToolPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    status: "success" | "error" | null;
    message: string;
    reportId?: number;
    timestamp?: string;
  } | null>(null);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      maxPages: 20
    }
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      console.log("Starting crawl for:", data.url, "with max pages:", data.maxPages);
      
      const response = await startCrawl(data.url, data.maxPages);
      
      if (response.success) {
        setResult({
          status: "success",
          message: response.message || "Crawl started successfully",
          reportId: response.reportId,
          timestamp: response.timestamp
        });
      } else {
        setResult({
          status: "error",
          message: response.error || "Failed to start crawl"
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult({
        status: "error",
        message: error instanceof Error ? error.message : "An unknown error occurred"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">SEO Crawler Tool</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Start a New Crawl</CardTitle>
            <CardDescription>
              Enter a URL to crawl for SEO issues. The crawler will analyze pages
              and generate a report.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://example.com" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="maxPages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Pages to Crawl</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1} 
                          max={100} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Starting Crawl...
                    </>
                  ) : (
                    "Start Crawl"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Crawl Status</CardTitle>
            <CardDescription>
              Once a crawl is started, status and results will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <>
                <Alert variant={result.status === "success" ? "default" : "destructive"}>
                  {result.status === "success" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    {result.status === "success" ? "Crawl Started" : "Error"}
                  </AlertTitle>
                  <AlertDescription>
                    {result.message}
                  </AlertDescription>
                </Alert>
                
                {result.status === "success" && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Started at: {result.timestamp ? new Date(result.timestamp).toLocaleString() : "Unknown"}</span>
                    </div>
                    
                    <div>
                      <span className="text-sm text-muted-foreground">Report ID: {result.reportId}</span>
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-sm">
                        The crawl is running in the background. This can take several minutes
                        depending on the number of pages. You can view the report in the SEO Dashboard
                        when it's complete.
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-40 text-muted-foreground">
                <p>No crawl started yet. Fill out the form to begin.</p>
              </div>
            )}
          </CardContent>
          {result?.status === "success" && (
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setResult(null)}>
                Start Another Crawl
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}