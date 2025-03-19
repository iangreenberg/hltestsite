import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

export default function SimplifiedForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Basic validation
      if (!formData.fullName.trim() || !formData.email.trim()) {
        throw new Error('Name and email are required fields');
      }
      
      // Get the correct API URL based on environment
      const apiBaseUrl = process.env.NODE_ENV === 'production'
        ? `${window.location.origin}/api`
        : '/api';
        
      // Try the dedicated form endpoint first
      const formEndpoint = `${apiBaseUrl}/form`;
      console.log(`Submitting to ${formEndpoint}`, formData);
      
      // Add timestamp for debugging
      const submitData = {
        ...formData,
        submitted_at: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown'
      };

      // Simple fetch with minimal options
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submitData)
      });
      
      // Log response status and headers for debugging
      console.log(`Response from ${formEndpoint}:`, {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries([...response.headers.entries()])
      });
      
      // Try to parse JSON response
      let responseData;
      try {
        responseData = await response.json();
        console.log('Response data:', responseData);
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
        const text = await response.text();
        console.log('Response text:', text);
        throw new Error('Failed to parse server response');
      }
      
      if (response.ok && responseData.success) {
        toast({
          title: "Success",
          description: "Your application has been submitted successfully!",
        });
        
        // Reset form on success
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        throw new Error(responseData.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
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
          <CardTitle>Simplified Application Form</CardTitle>
          <CardDescription>
            Fill out this form to get started with HempLaunch.
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
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your business goals"
                className="w-full min-h-[100px] px-3 py-2 border rounded-md"
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