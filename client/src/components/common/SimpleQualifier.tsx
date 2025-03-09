import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface SimpleQualifierProps {
  buttonText: string;
  buttonClassName?: string;
}

export default function SimpleQualifier({ buttonText, buttonClassName }: SimpleQualifierProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [investmentReady, setInvestmentReady] = useState<string>('');
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!name || !email || !investmentReady || !investmentAmount || !termsAgreed) {
      toast({
        title: "Please complete all fields",
        description: "All fields are required to proceed.",
        variant: "destructive",
      });
      return;
    }

    // Check if they qualify (investment amount > 5k)
    if (investmentReady === 'yes' && 
        (investmentAmount === '5kTo10k' || investmentAmount === '10kTo25k' || investmentAmount === 'over25k')) {
      // Qualified - direct to Calendly
      const calendlyUrl = new URL('https://calendly.com/testhemp/hemplaunch');
      calendlyUrl.searchParams.append('name', name);
      calendlyUrl.searchParams.append('email', email);
      window.open(calendlyUrl.toString(), '_blank');
      
      // Close the dialog
      setOpen(false);
      
      // Reset form
      setName('');
      setEmail('');
      setInvestmentReady('');
      setInvestmentAmount('');
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
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className={buttonClassName}>
        {buttonText}
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#2F5D50]">
              Qualification Questionnaire
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
                className="bg-[#C8A951] hover:bg-[#B89841] text-[#2F5D50] font-bold"
              >
                Check Qualification
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}