import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { UserCheck, TrendingUp, Clock } from 'lucide-react';

interface TimelineQualifierProps {
  buttonText: string;
  buttonClassName?: string;
}

export default function TimelineQualifier({ buttonText, buttonClassName }: TimelineQualifierProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'timeline' | 'qualification'>("timeline");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [timeframe, setTimeframe] = useState<string>('');
  const [investmentReady, setInvestmentReady] = useState<string>('');
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [priorBusiness, setPriorBusiness] = useState<string>('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const { toast } = useToast();

  const handleTimeframeSubmit = () => {
    if (!timeframe) {
      toast({
        title: "Please select a timeframe",
        description: "Select when you'd like to launch your business to continue.",
        variant: "destructive",
      });
      return;
    }
    
    // Move to the qualification questions
    setStep('qualification');
  };

  const handleQualificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!name || !email || !investmentReady || !investmentAmount || !priorBusiness || !termsAgreed) {
      toast({
        title: "Please complete all fields",
        description: "All fields are required to proceed.",
        variant: "destructive",
      });
      return;
    }

    // Check if they qualify (investment amount > 5k and either have business experience or are ready to invest over 10k)
    if (investmentReady === 'yes' && 
        ((investmentAmount === '5kTo10k' && priorBusiness === 'yes') || 
         investmentAmount === '10kTo25k' || 
         investmentAmount === 'over25k')) {
      // Qualified - direct to Calendly
      const calendlyUrl = new URL('https://calendly.com/testhemp/hemplaunch');
      calendlyUrl.searchParams.append('name', name);
      calendlyUrl.searchParams.append('email', email);
      window.open(calendlyUrl.toString(), '_blank');
      
      // Close the dialog
      setOpen(false);
      
      // Reset form
      setStep('timeline');
      setName('');
      setEmail('');
      setTimeframe('');
      setInvestmentReady('');
      setInvestmentAmount('');
      setPriorBusiness('');
      setTermsAgreed(false);
      
      // Show success message
      toast({
        title: "Qualification successful!",
        description: "You've qualified for a consultation. Calendly will open in a new tab.",
      });
    } else {
      // Not qualified - show message
      toast({
        title: "Thank you for your interest",
        description: "It seems your business needs don't currently align with our services. Please contact us directly for more information.",
        variant: "destructive",
      });
      
      // Close the dialog
      setOpen(false);
      
      // Reset form 
      setStep('timeline');
      setTimeframe('');
    }
  };

  // Component that shows in the home page 
  const QualifierPreview = () => (
    <div className="bg-white rounded-xl p-6 shadow-xl">
      <div className="bg-[#2F5D50] text-white text-center p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold">Qualify for Your Free Consultation</h3>
        <p className="text-sm opacity-80">Answer a few quick questions to see if you qualify</p>
      </div>
      <div className="space-y-6">
        {/* Pre-qualification teaser */}
        <div className="flex items-start gap-3">
          <div className="bg-[#f0f9f6] p-2 rounded-full">
            <UserCheck className="h-6 w-6 text-[#2F5D50]" />
          </div>
          <div>
            <h4 className="font-semibold text-[#2F5D50]">Business Experience</h4>
            <p className="text-sm text-gray-600">We'll assess your business background</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="bg-[#f0f9f6] p-2 rounded-full">
            <TrendingUp className="h-6 w-6 text-[#2F5D50]" />
          </div>
          <div>
            <h4 className="font-semibold text-[#2F5D50]">Investment Readiness</h4>
            <p className="text-sm text-gray-600">Determine your financial preparation</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="bg-[#f0f9f6] p-2 rounded-full">
            <Clock className="h-6 w-6 text-[#2F5D50]" />
          </div>
          <div>
            <h4 className="font-semibold text-[#2F5D50]">Timeline Expectations</h4>
            <p className="text-sm text-gray-600">Plan your launch timeline</p>
          </div>
        </div>
        
        <Button 
          onClick={() => setOpen(true)} 
          className={buttonClassName || "w-full bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold py-3 border-2 border-[#C8A951]"}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <QualifierPreview />
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {step === 'timeline' ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-[#2F5D50]">
                  When are you looking to launch your business?
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-500 mt-2">
                  Your timeline helps us customize our services to meet your goals.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <RadioGroup value={timeframe} onValueChange={setTimeframe}>
                  <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                    <RadioGroupItem value="immediately" id="timeline-immediately" />
                    <Label htmlFor="timeline-immediately" className="flex-1 cursor-pointer">Immediately (Within 30 days)</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                    <RadioGroupItem value="1to3months" id="timeline-1to3months" />
                    <Label htmlFor="timeline-1to3months" className="flex-1 cursor-pointer">1-3 months</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                    <RadioGroupItem value="3to6months" id="timeline-3to6months" />
                    <Label htmlFor="timeline-3to6months" className="flex-1 cursor-pointer">3-6 months</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                    <RadioGroupItem value="6monthsPlus" id="timeline-6monthsPlus" />
                    <Label htmlFor="timeline-6monthsPlus" className="flex-1 cursor-pointer">6+ months</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <DialogFooter className="mt-6">
                <Button 
                  onClick={handleTimeframeSubmit} 
                  className="bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold w-full sm:w-auto"
                >
                  Continue
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-[#2F5D50]">
                  Qualification Questionnaire
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-500 mt-2">
                  Please complete this short questionnaire to determine if you qualify for our consultation.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleQualificationSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                <div className="space-y-3">
                  <Label>Are you ready to invest in a hemp-derived THC business?</Label>
                  <RadioGroup value={investmentReady} onValueChange={setInvestmentReady}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="investment-yes" />
                      <Label htmlFor="investment-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="investment-no" />
                      <Label htmlFor="investment-no">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unsure" id="investment-unsure" />
                      <Label htmlFor="investment-unsure">Unsure</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-3">
                  <Label>How much are you willing to invest?</Label>
                  <RadioGroup value={investmentAmount} onValueChange={setInvestmentAmount}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="under5k" id="amount-under5k" />
                      <Label htmlFor="amount-under5k">Under $5,000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5kTo10k" id="amount-5kTo10k" />
                      <Label htmlFor="amount-5kTo10k">$5,000 - $10,000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="10kTo25k" id="amount-10kTo25k" />
                      <Label htmlFor="amount-10kTo25k">$10,000 - $25,000</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="over25k" id="amount-over25k" />
                      <Label htmlFor="amount-over25k">Over $25,000</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>Do you have prior business experience?</Label>
                  <RadioGroup value={priorBusiness} onValueChange={setPriorBusiness}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="business-yes" />
                      <Label htmlFor="business-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="business-no" />
                      <Label htmlFor="business-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={termsAgreed} 
                    onCheckedChange={(checked) => setTermsAgreed(checked as boolean)} 
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to be contacted about my hemp business inquiry and understand my information will be used as described in the privacy policy.
                  </Label>
                </div>
                
                <DialogFooter className="pt-4">
                  <Button 
                    type="submit" 
                    className="bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold w-full sm:w-auto"
                  >
                    Check Qualification
                  </Button>
                </DialogFooter>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}