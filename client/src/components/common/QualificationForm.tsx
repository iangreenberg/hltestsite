import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from 'lucide-react';

// Form schema with qualification questions
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  investmentReady: z.enum(['yes', 'no', 'unsure'], {
    required_error: 'Please select an option',
  }),
  investmentAmount: z.enum(['under5k', '5kTo10k', '10kTo25k', 'over25k'], {
    required_error: 'Please select an option',
  }),
  priorBusiness: z.enum(['yes', 'no'], {
    required_error: 'Please select an option',
  }),
  timeframe: z.enum(['immediately', '1to3months', '3to6months', '6monthsPlus'], {
    required_error: 'Please select an option',
  }),
  termsAgreed: z.boolean()
    .refine(val => val === true, {
      message: 'You must agree to the terms',
    }),
});

type FormData = z.infer<typeof formSchema>;

interface QualificationFormProps {
  onComplete: (data: FormData) => void;
  buttonText?: string;
  buttonVariant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost' | 'link';
  buttonClassName?: string;
}

export default function QualificationForm({ 
  onComplete, 
  buttonText = "Schedule a Consultation", 
  buttonVariant = "default",
  buttonClassName = ""
}: QualificationFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      investmentReady: 'unsure',
      investmentAmount: 'under5k',
      priorBusiness: 'no',
      timeframe: 'immediately',
      termsAgreed: false,
    },
  });

  function onSubmit(data: FormData) {
    onComplete(data);
    setIsOpen(false);
    toast({
      title: "Qualification complete!",
      description: "You're being redirected to our scheduling page.",
    });
  }

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)} 
        variant={buttonVariant}
        className={`${buttonClassName}`}
      >
        {buttonText}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#2F5D50]">Qualification Questionnaire</DialogTitle>
            <DialogDescription>
              Please answer these questions so we can better understand your business needs before scheduling your consultation.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" type="email" {...field} />
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
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="investmentReady"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Are you ready to invest in starting a hemp business?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes, I'm ready to invest now</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No, I'm not ready to invest yet</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="unsure" />
                          </FormControl>
                          <FormLabel className="font-normal">I'm still exploring my options</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="investmentAmount"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>What amount are you able to invest in your business?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="under5k" />
                          </FormControl>
                          <FormLabel className="font-normal">Under $5,000</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="5kTo10k" />
                          </FormControl>
                          <FormLabel className="font-normal">$5,000 - $10,000</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="10kTo25k" />
                          </FormControl>
                          <FormLabel className="font-normal">$10,000 - $25,000</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="over25k" />
                          </FormControl>
                          <FormLabel className="font-normal">Over $25,000</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="priorBusiness"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Have you owned or operated a business before?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
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
                  <FormItem className="space-y-3">
                    <FormLabel>What is your timeframe for starting your business?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="immediately" />
                          </FormControl>
                          <FormLabel className="font-normal">Immediately</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="1to3months" />
                          </FormControl>
                          <FormLabel className="font-normal">1-3 months</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="3to6months" />
                          </FormControl>
                          <FormLabel className="font-normal">3-6 months</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="6monthsPlus" />
                          </FormControl>
                          <FormLabel className="font-normal">6+ months</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="termsAgreed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the terms of service and privacy policy. I understand my information will be used to determine my qualification for services.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-[#2F5D50] hover:bg-[#264A40]">
                Submit and Schedule Consultation
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}