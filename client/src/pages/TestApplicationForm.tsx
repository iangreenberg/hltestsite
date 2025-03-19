import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function TestApplicationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [apiTestLoading, setApiTestLoading] = useState(false);
  const [urlType, setUrlType] = useState<'relative' | 'absolute'>('relative');
  const [testMethod, setTestMethod] = useState<'GET' | 'POST'>('GET');
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast({
        title: "Missing fields",
        description: "Please fill in both name and email",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    setResult(null);
    
    try {
      let apiUrl = "/api/application";
      
      // Use absolute URL if selected
      if (urlType === 'absolute') {
        const protocol = window.location.protocol;
        const host = window.location.host;
        apiUrl = `${protocol}//${host}/api/application`;
      }
      
      console.log("Submitting to:", apiUrl);
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: name,
          email: email,
          testMode: true
        }),
      });
      
      console.log("Response status:", response.status);
      
      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("Response data:", data);
        setResult(JSON.stringify(data, null, 2));
        
        if (response.ok) {
          toast({
            title: "Application submitted",
            description: "Your test submission was successful",
          });
        } else {
          toast({
            title: "Submission failed",
            description: data.message || "Unknown error occurred",
            variant: "destructive",
          });
        }
      } else {
        // Not JSON, display text preview
        const text = await response.text();
        console.error("Non-JSON response:", text.substring(0, 100));
        setResult(`Non-JSON response received: ${text.substring(0, 200)}...`);
        
        toast({
          title: "Invalid response format",
          description: "Server did not return JSON. Check the console for details.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult(error instanceof Error ? error.message : "Unknown error");
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit form",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Debug function to test basic API connectivity
  const testApiConnection = async () => {
    setApiTestLoading(true);
    setApiStatus('idle');
    setResult(null);
    
    try {
      // Determine URL based on selection
      let debugUrl = "/api/test";
      
      if (urlType === 'absolute') {
        const protocol = window.location.protocol;
        const host = window.location.host;
        debugUrl = `${protocol}//${host}/api/test`;
      }
      
      console.log(`Testing API connection with ${testMethod} to:`, debugUrl);
      
      let response;
      if (testMethod === 'GET') {
        response = await fetch(debugUrl);
      } else {
        response = await fetch(debugUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ test: true, timestamp: new Date().toISOString() }),
        });
      }
      
      console.log("API test response status:", response.status);
      
      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("API test response data:", data);
        setResult(JSON.stringify(data, null, 2));
        setApiStatus('success');
        
        toast({
          title: "API Test Successful",
          description: "The API connection is working!",
        });
      } else {
        // Not JSON, display text preview
        const text = await response.text();
        console.error("Non-JSON response:", text.substring(0, 100));
        setResult(`Non-JSON response received: ${text.substring(0, 200)}...`);
        setApiStatus('error');
        
        toast({
          title: "Invalid API response format",
          description: "Server did not return JSON. Check the console for details.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error testing API:", error);
      setResult(error instanceof Error ? error.message : "Unknown error");
      setApiStatus('error');
      
      toast({
        title: "API Test Failed",
        description: error instanceof Error ? error.message : "Failed to connect to API",
        variant: "destructive",
      });
    } finally {
      setApiTestLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-center text-[#2F5D50] mb-6">
          Test Application Form
        </h1>
        
        <Tabs defaultValue="test" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="test">API Test</TabsTrigger>
            <TabsTrigger value="form">Form Test</TabsTrigger>
          </TabsList>
          
          <TabsContent value="test" className="pt-4">
            <Alert className="mb-4">
              <Info className="h-4 w-4" />
              <AlertTitle>API Testing Tool</AlertTitle>
              <AlertDescription>
                Use this tool to test the API connection before attempting to submit the form.
                Try different URL formats and request methods to diagnose issues.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-medium">URL Type</h3>
                  <RadioGroup
                    value={urlType}
                    onValueChange={(v) => setUrlType(v as 'relative' | 'absolute')}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="relative" id="relative" />
                      <Label htmlFor="relative">Relative URL (/api/test)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="absolute" id="absolute" />
                      <Label htmlFor="absolute">Absolute URL (http://host/api/test)</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium">Request Method</h3>
                  <RadioGroup
                    value={testMethod}
                    onValueChange={(v) => setTestMethod(v as 'GET' | 'POST')}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="GET" id="get" />
                      <Label htmlFor="get">GET</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="POST" id="post" />
                      <Label htmlFor="post">POST</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              <Button 
                type="button" 
                className="w-full bg-[#2F5D50] hover:bg-opacity-90" 
                onClick={testApiConnection}
                disabled={apiTestLoading}
              >
                {apiTestLoading ? "Testing API Connection..." : "Test API Connection"}
              </Button>
              
              {apiStatus !== 'idle' && (
                <Alert variant={apiStatus === 'success' ? 'default' : 'destructive'}>
                  <div className="flex items-center gap-2">
                    {apiStatus === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    <AlertTitle>{apiStatus === 'success' ? 'Success' : 'Error'}</AlertTitle>
                  </div>
                </Alert>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="form" className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-4">
                <RadioGroup
                  value={urlType}
                  onValueChange={(v) => setUrlType(v as 'relative' | 'absolute')}
                  className="flex flex-col space-y-1"
                >
                  <h3 className="font-medium mb-2">Submission URL Type</h3>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="relative" id="form-relative" />
                    <Label htmlFor="form-relative">Relative URL (/api/application)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="absolute" id="form-absolute" />
                    <Label htmlFor="form-absolute">Absolute URL (http://host/api/application)</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-[#2F5D50] hover:bg-opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Test Form"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
        {result && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Response:</h2>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm max-h-[300px]">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}