import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle } from "lucide-react";

export default function SimplifiedForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Name and email are required fields"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Try the direct API endpoint first
      const response = await fetch('/api/form-handler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: ""
        });
        
        toast({
          title: "Success",
          description: "Your application has been submitted successfully!"
        });
        
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      // Fallback to alternate endpoint
      try {
        const fallbackResponse = await fetch('https://hltestsite-4vq3.vercel.app/api/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        if (fallbackResponse.ok) {
          setIsSuccess(true);
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            message: ""
          });
          
          toast({
            title: "Success",
            description: "Your application has been submitted successfully!"
          });
          
          setTimeout(() => {
            setIsSuccess(false);
          }, 5000);
        } else {
          throw new Error("Failed to submit form through all endpoints");
        }
      } catch (fallbackError) {
        console.error("Form submission error:", fallbackError);
        
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: "We couldn't process your submission. Please try again later."
        });
      }
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
        </CardHeader>

        {isSuccess && (
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Your Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your business goals"
                rows={4}
                disabled={isSubmitting}
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