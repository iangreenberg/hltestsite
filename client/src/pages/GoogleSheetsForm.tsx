import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  businessName: z.string().optional(),
  cityState: z.string().min(2, "Please enter your city and state."),
  businessSituation: z.enum(["starting", "operating", "expanding", "other"]),
  businessSituationOther: z.string().optional(),
  packageInterest: z.enum(["basic", "premium", "enterprise", "unsure"]),
  businessBasics: z.string().min(10, "Please provide more information about your business goals."),
  timeframe: z.enum(["immediately", "1-3months", "3-6months", "6months+"])
});

type FormData = z.infer<typeof formSchema>;

export default function GoogleSheetsForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      businessName: "",
      cityState: "",
      businessSituation: "starting",
      businessSituationOther: "",
      packageInterest: "unsure",
      businessBasics: "",
      timeframe: "1-3months"
    }
  });

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    setError(null);
    
    try {
      // Add submission timestamp
      const submissionData = {
        ...data,
        submitted_at: new Date().toISOString()
      };
      
      // Google Sheets Web App URL
      const sheetsUrl = "https://script.google.com/macros/s/AKfycbzJRQl7RckqY_VByOhn_Nf11GrMi1W7FvY1Co4wqN1cZv-ROKWY_iGHx3RHeC8PIJEP/exec";
      
      // Send to Google Sheets
      const response = await fetch(sheetsUrl, {
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
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Helmet>
          <title>Application Submitted | HempLaunch</title>
        </Helmet>
        
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
      <Helmet>
        <title>Business Application | HempLaunch</title>
      </Helmet>
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#2F5D50]">HempLaunch Business Application</h1>
        <p className="mt-2 text-gray-600">Complete the form below to begin your hemp business journey</p>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name (if applicable)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Business Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cityState"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City & State *</FormLabel>
                      <FormControl>
                        <Input placeholder="Austin, TX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="businessSituation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Business Situation *</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your situation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="starting">Starting a new business</SelectItem>
                          <SelectItem value="operating">Currently operating</SelectItem>
                          <SelectItem value="expanding">Looking to expand</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {form.watch("businessSituation") === "other" && (
                <FormField
                  control={form.control}
                  name="businessSituationOther"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please describe your situation</FormLabel>
                      <FormControl>
                        <Input placeholder="Describe your current business situation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name="packageInterest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Which package are you most interested in? *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4">
                          <FormControl>
                            <RadioGroupItem value="basic" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            <div className="font-medium">Basic Package</div>
                            <div className="text-sm text-gray-500">Essential startup elements for under $3,000</div>
                          </FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4">
                          <FormControl>
                            <RadioGroupItem value="premium" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            <div className="font-medium">Premium Package</div>
                            <div className="text-sm text-gray-500">Enhanced offering with customization</div>
                          </FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4">
                          <FormControl>
                            <RadioGroupItem value="enterprise" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            <div className="font-medium">Enterprise Solution</div>
                            <div className="text-sm text-gray-500">Comprehensive business launch</div>
                          </FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4">
                          <FormControl>
                            <RadioGroupItem value="unsure" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            <div className="font-medium">Not Sure Yet</div>
                            <div className="text-sm text-gray-500">I'd like to discuss options</div>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="timeframe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>When are you looking to launch? *</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your timeframe" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="immediately">As soon as possible</SelectItem>
                        <SelectItem value="1-3months">Within 1-3 months</SelectItem>
                        <SelectItem value="3-6months">Within 3-6 months</SelectItem>
                        <SelectItem value="6months+">More than 6 months</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="businessBasics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tell us about your business goals *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What are your motivations for starting a hemp business? What specific goals do you hope to achieve?"
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
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
          </Form>
        </CardContent>
        
        <CardFooter className="flex-col space-y-2 items-start text-sm text-gray-500">
          <p>After submitting, you'll be redirected to our scheduling system to book your consultation.</p>
          <p>* Required fields</p>
        </CardFooter>
      </Card>
    </div>
  );
}