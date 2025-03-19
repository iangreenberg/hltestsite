import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle } from "lucide-react";

export default function SimplifiedGoogleForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      // Add submission timestamp
      const submissionData = {
        ...formData,
        submitted_at: new Date().toISOString()
      };
      
      // Google Sheets Web App URL
      const sheetsUrl = "https://script.google.com/macros/s/AKfycbzJRQl7RckqY_VByOhn_Nf11GrMi1W7FvY1Co4wqN1cZv-ROKWY_iGHx3RHeC8PIJEP/exec";
      
      // Send to Google Sheets
      await fetch(sheetsUrl, {
        method: "POST",
        mode: "no-cors", // This is required for Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });
      
      setSubmitted(true);
      
      // Redirect to Calendly after short delay
      setTimeout(() => {
        window.location.href = "https://calendly.com/hemplaunchinfo/application";
      }, 3000);
      
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("There was an error submitting your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-center text-2xl text-green-800">Application Submitted!</CardTitle>
            <CardDescription className="text-center text-green-700">
              We've received your application details.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-green-700">
            <p className="mb-4">You'll be redirected to our scheduling system in a moment to book your consultation.</p>
            <p className="mb-2">If you're not redirected automatically, please click the button below:</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button 
              onClick={() => window.location.href = "https://calendly.com/hemplaunchinfo/application"}
              className="bg-[#2F5D50] hover:bg-[#234840]"
            >
              Schedule Your Consultation
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#2F5D50]">HempLaunch Business Application</h1>
        <p className="mt-2 text-gray-600">Complete the form below to begin your hemp business journey</p>
      </div>
      
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{errorMessage}</p>
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Business Application Form</CardTitle>
          <CardDescription>
            Tell us about yourself and your business goals. After submitting, you'll be directed to schedule a consultation.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <Input 
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <Input 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Tell us about your business goals *
                </label>
                <Textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What are your motivations for starting a hemp business? What specific goals do you hope to achieve?"
                  required
                  className="w-full min-h-[120px]"
                />
              </div>
            </div>
            
            <div>
              <Button 
                type="submit" 
                className="bg-[#2F5D50] hover:bg-[#234840] w-full md:w-auto"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        
        <CardFooter className="flex-col space-y-2 items-start text-sm text-gray-500">
          <p>After submitting, you'll be redirected to our scheduling system to book your consultation.</p>
          <p>* Required fields</p>
        </CardFooter>
      </Card>
    </div>
  );
}