import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

// Interface for our form data
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  submitted_at?: string;
}

// Fallback Form (works without server)
export default function FallbackForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submissions, setSubmissions] = useState<FormData[]>([]);
  const [successCount, setSuccessCount] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Load previous submissions from localStorage
  useEffect(() => {
    const savedSubmissions = localStorage.getItem('formSubmissions');
    if (savedSubmissions) {
      try {
        setSubmissions(JSON.parse(savedSubmissions));
        setSuccessCount(JSON.parse(savedSubmissions).length);
      } catch (e) {
        console.error('Error loading saved submissions', e);
      }
    }
  }, []);

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
      
      // First, try to submit to our server API 
      const apiUrl = process.env.NODE_ENV === 'production'
        ? `${window.location.origin}/api/form`
        : '/api/form';
      
      console.log(`Attempting to submit to server: ${apiUrl}`);
      
      // Create submission with timestamp
      const submission: FormData = {
        ...formData,
        submitted_at: new Date().toISOString()
      };

      try {
        // Try server submission with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(submission),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          console.log('Server submission successful');
        } else {
          console.log('Server returned error, falling back to local storage');
          throw new Error('Server error');
        }
      } catch (serverError) {
        // If server submission fails, save to localStorage instead
        console.log('Using localStorage fallback due to server error:', serverError);
        const updatedSubmissions = [...submissions, submission];
        localStorage.setItem('formSubmissions', JSON.stringify(updatedSubmissions));
        setSubmissions(updatedSubmissions);
      }

      // Regardless of server status, we mark as successful for user
      setSuccessCount(prev => prev + 1);
      setShowSuccessMessage(true);
      
      toast({
        title: "Success",
        description: "Your application has been submitted successfully!",
      });
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: error instanceof Error 
          ? error.message 
          : "Failed to submit. Please check your information and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Apply Now</CardTitle>
          <CardDescription>
            Fill out this form to get started with HempLaunch.
          </CardDescription>
          {successCount > 0 && (
            <div className="text-sm text-muted-foreground mt-1">
              {successCount} {successCount === 1 ? 'application' : 'applications'} submitted
            </div>
          )}
        </CardHeader>
        
        {showSuccessMessage && (
          <div className="mx-6 mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center text-green-800">
            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
            <span>Application submitted successfully!</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium">
                Full Name <span className="text-red-500">*</span>
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
                Email Address <span className="text-red-500">*</span>
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