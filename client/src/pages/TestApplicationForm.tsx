import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

export default function TestApplicationForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting form data:', formData);
      
      // Form validation
      if (!formData.fullName.trim() || !formData.email.trim()) {
        throw new Error('Name and email are required fields');
      }
      
      // Get the base URL for the API - handle both development and production environments
      // In development this will be relative (/api/...)
      // In production with Vercel, we need the full URL
      const apiUrl = process.env.NODE_ENV === 'production'
        ? `${window.location.origin}/api/test-submit`
        : '/api/test-submit';
      
      console.log('Using API URL:', apiUrl);
      
      // First try with credentials included
      let response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
        // Try with credentials first
        credentials: 'include'
      }).catch(err => {
        console.warn('Initial fetch with credentials failed:', err);
        // Return null to indicate we should retry without credentials
        return null;
      });
      
      // If the first attempt failed, retry without credentials
      // This helps with certain CORS configurations
      if (!response) {
        console.log('Retrying without credentials...');
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'omit' // explicitly exclude credentials
        });
      }
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries([...response.headers.entries()]));
      
      // Check the content type to avoid JSON parse errors
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
          console.log('Response JSON data:', data);
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          const text = await response.text();
          console.log('Response text instead:', text);
          
          // Try to extract JSON from HTML response (common with Vercel)
          // Sometimes Vercel wraps the JSON in HTML when there's an error
          const jsonMatch = text.match(/{[\s\S]*}/);
          if (jsonMatch) {
            try {
              data = JSON.parse(jsonMatch[0]);
              console.log('Extracted JSON from HTML:', data);
            } catch {
              data = { success: false, message: 'Failed to parse server response' };
            }
          } else {
            data = { success: false, message: 'Server returned non-JSON response' };
          }
        }
      } else {
        // Handle non-JSON responses
        const text = await response.text();
        console.log('Response text (non-JSON):', text);
        
        // Try to extract JSON if it's embedded in HTML
        const jsonMatch = text.match(/{[\s\S]*}/);
        if (jsonMatch) {
          try {
            data = JSON.parse(jsonMatch[0]);
            console.log('Extracted JSON from HTML:', data);
          } catch {
            data = { success: false, message: 'Failed to parse response' };
          }
        } else {
          data = { success: false, message: text || 'Unknown error (non-JSON response)' };
        }
      }
      
      if (response.ok && data.success) {
        toast({
          title: "Success",
          description: "Your application has been submitted successfully!",
        });
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
        });
      } else {
        throw new Error(data.message || 'Something went wrong with the submission');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: error instanceof Error 
          ? error.message 
          : "Failed to submit your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Simple Test Application</CardTitle>
          <CardDescription>
            Fill out this form to test the application submission functionality.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}