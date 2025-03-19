import { useState, ChangeEvent, FormEvent } from "react";
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
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      // Basic validation
      if (!formData.fullName || !formData.email) {
        throw new Error("Name and email are required fields");
      }

      // Determine API URL based on environment
      const apiUrl = process.env.NODE_ENV === 'production'
        ? `${window.location.origin}/api/submit-form` // Production URL
        : 'http://localhost:3000/api/submit-form'; // Development URL

      console.log(`Submitting to API: ${apiUrl}`);

      // Submit form to API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Parse response
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Failed to submit form");
      }

      // Show success state
      setIsSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });

      toast({
        title: "Application Submitted",
        description: "Thank you! Your application has been received successfully.",
      });

      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);

    } catch (error) {
      console.error("Form submission error:", error);
      
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error instanceof Error 
          ? error.message 
          : "An error occurred. Please try again later.",
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
        </CardHeader>

        {isSuccess && (
          <div className="mx-6 mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center text-green-800">
            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
            <span>Application submitted successfully!</span>
          </div>
        )}

        <form onSubmit={onSubmit}>
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