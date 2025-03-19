import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronRight, FileCheck, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// Completely rewritten schema with string types instead of enums to avoid pattern matching issues
const formSchema = z.object({
  // Basic information
  fullName: z.string().min(2, { message: "Please enter your full name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string(), // Accept any phone format
  businessName: z.string().optional(),
  cityState: z.string().min(2, { message: "Please enter your city and state" }),
  
  // All radio selects are just strings - no enums to avoid pattern matching
  businessSituation: z.string({
    required_error: "Please select an option",
  }),
  businessSituationOther: z.string().optional(),
  
  packageInterest: z.string({
    required_error: "Please select a package",
  }),
  
  businessBasics: z.string({
    required_error: "Please select an option",
  }),
  
  timeframe: z.string({
    required_error: "Please select your timeframe",
  }),
  
  termsAgreed: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms to continue",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      businessName: "",
      cityState: "",
      businessSituation: "",
      businessSituationOther: "",
      packageInterest: "",
      businessBasics: "",
      timeframe: "",
      termsAgreed: false,
    },
  });
  
  const watchBusinessSituation = form.watch("businessSituation");
  
  const handleNextStep = async () => {
    if (currentStep === 1) {
      const result = await form.trigger([
        "fullName", 
        "email", 
        "phone", 
        "cityState"
      ]);
      
      if (result) {
        setCurrentStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Log the data to console
      console.log('Application data collected:', data);
      
      // Save application data to local storage with timestamp
      const timestamp = new Date().toISOString();
      const applicationEntry = {
        timestamp,
        data
      };
      
      // Get existing applications or initialize empty array
      const existingApplications = JSON.parse(localStorage.getItem('hemplaunch_applications') || '[]');
      
      // Add new application to the array
      existingApplications.push(applicationEntry);
      
      // Save back to localStorage
      localStorage.setItem('hemplaunch_applications', JSON.stringify(existingApplications));
      
      // Submit to backend API for Notion integration
      try {
        const response = await fetch('/api/notion-application', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          console.warn('Notion API submission failed, but continuing with local storage only');
          const errorData = await response.json();
          console.warn('Error details:', errorData);
        } else {
          console.log('Application submitted to Notion successfully');
        }
      } catch (apiError) {
        console.warn('Error submitting to Notion API:', apiError);
        // Continue with the process even if API submission fails
      }
      
      // Show success message
      setIsComplete(true);
      toast({
        title: "Application complete",
        description: "Redirecting you to schedule a consultation...",
        variant: "default",
      });
      
      // Redirect to Calendly after a brief delay
      setTimeout(() => {
        window.location.href = "https://calendly.com/hemplaunchinfo/free-consultation";
      }, 2000);
    } catch (error) {
      console.error("Error in application process:", error);
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-[#2F5D50] mb-4">Application Complete!</h2>
          <p className="text-lg text-gray-700 mb-6">
            Thank you for your interest in HempLaunch. You're being redirected to our scheduling system to book a free consultation.
          </p>
          <p className="text-gray-600 mb-8">
            If you're not automatically redirected, please click the button below to schedule your consultation.
          </p>
          <Button 
            onClick={() => window.location.href = 'https://calendly.com/hemplaunchinfo/free-consultation'}
            className="bg-[#2F5D50] hover:bg-[#234840] text-white font-bold py-3 px-6 rounded-lg"
          >
            Schedule Consultation
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto my-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#2F5D50] text-white p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">HempLaunch Business Application</h2>
          <p className="opacity-90">Let's get to know your business goals</p>
          
          {/* Progress Indicator */}
          <div className="mt-8 flex items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${currentStep === 1 ? 'bg-[#C8A951] text-[#2F5D50]' : 'bg-white/20 text-white'}`}>
              1
            </div>
            <div className={`h-1 flex-grow mx-2 ${currentStep >= 2 ? 'bg-[#C8A951]' : 'bg-white/20'}`}></div>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${currentStep === 2 ? 'bg-[#C8A951] text-[#2F5D50]' : 'bg-white/20 text-white'}`}>
              2
            </div>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-8">
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-[#2F5D50] mb-6 flex items-center">
                  <User className="mr-2 h-5 w-5" /> Basic Information
                </h3>
                
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name*</FormLabel>
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
                        <FormLabel>Email Address*</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" type="email" {...field} />
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
                        <FormLabel>Phone Number*</FormLabel>
                        <FormControl>
                          <Input placeholder="Any phone format works" type="tel" {...field} />
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
                          <Input placeholder="Your Business LLC" {...field} />
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
                        <FormLabel>City & State*</FormLabel>
                        <FormControl>
                          <Input placeholder="Austin, TX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-[#2F5D50] hover:bg-[#234840] text-white font-bold"
                  >
                    Next Step <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
            
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-[#2F5D50] mb-6 flex items-center">
                  <FileCheck className="mr-2 h-5 w-5" /> Business Readiness
                </h3>
                
                <div className="space-y-8">
                  <FormField
                    control={form.control}
                    name="businessSituation"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>What best describes your situation?*</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-start space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="new" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                I'm launching a new hemp business
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-start space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="existing" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                I have an existing hemp business and want to scale
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-start space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="other" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Other
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {watchBusinessSituation === "other" && (
                    <FormField
                      control={form.control}
                      name="businessSituationOther"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Please explain:</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  <Separator />
                  
                  <FormField
                    control={form.control}
                    name="packageInterest"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Which package are you most interested in?*</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-start space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="starter" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Ecom Starter
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-start space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="growth" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Growth Package
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-start space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="accelerator" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Accelerator Program
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-start space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="notSure" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Not sure, I need guidance
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Separator />
                  
                  <FormField
                    control={form.control}
                    name="businessBasics"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Do you currently have an LLC, EIN, or business bank account?*</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-start space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="complete" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Yes, I have all three
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-start space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="partial" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                I have some but need help completing them
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-start space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="none" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                No, I need assistance with all of these
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Separator />
                  
                  <FormField
                    control={form.control}
                    name="timeframe"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>How soon are you looking to launch?*</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <FormItem className="flex items-start space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="immediate" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Immediately (within 30 days)
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-start space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="1to3months" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                1-3 months
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-start space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="exploring" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Just exploring options
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Separator />
                  
                  <FormField
                    control={form.control}
                    name="termsAgreed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-gray-50">
                        <FormControl>
                          <input
                            type="checkbox"
                            className="h-5 w-5 accent-[#2F5D50] rounded border-gray-300"
                            checked={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to be contacted about my application
                          </FormLabel>
                          <FormDescription>
                            By submitting this form, you consent to be contacted by HempLaunch via phone, email, or text about your application.
                          </FormDescription>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="mt-8 flex justify-between">
                  <Button
                    type="button"
                    onClick={handlePrevStep}
                    variant="outline"
                    className="border-[#2F5D50] text-[#2F5D50]"
                  >
                    Back
                  </Button>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#2F5D50] hover:bg-[#234840] text-white font-bold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
        </Form>
        
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Your privacy is important to us. We'll never share your information with third parties without your consent.
          </p>
        </div>
      </motion.div>
    </div>
  );
}