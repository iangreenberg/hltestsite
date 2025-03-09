import { useState } from 'react';
import QualificationForm from './QualificationForm';
import { useToast } from '@/hooks/use-toast';

interface CalendlyQualifierProps {
  buttonText?: string;
  buttonVariant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost' | 'link';
  buttonClassName?: string;
}

interface QualificationData {
  name: string;
  email: string;
  phone: string;
  investmentReady: 'yes' | 'no' | 'unsure';
  investmentAmount: 'under5k' | '5kTo10k' | '10kTo25k' | 'over25k';
  priorBusiness: 'yes' | 'no';
  timeframe: 'immediately' | '1to3months' | '3to6months' | '6monthsPlus';
  termsAgreed: boolean;
}

export default function CalendlyQualifier({ 
  buttonText = "Schedule a Consultation", 
  buttonVariant = "default",
  buttonClassName = ""
}: CalendlyQualifierProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<QualificationData | null>(null);
  
  const handleQualificationComplete = (data: QualificationData) => {
    setFormData(data);
    
    // Always open Calendly regardless of qualification
    // Open Calendly with custom prefill based on their form answers
    const calendlyUrl = new URL('https://calendly.com/testhemp/hemplaunch');
    
    // Add prefill parameters for Calendly
    calendlyUrl.searchParams.append('name', data.name);
    calendlyUrl.searchParams.append('email', data.email);
    
    // Open Calendly in a new window
    window.open(calendlyUrl.toString(), '_blank');
    
    toast({
      title: "Thanks for your interest!",
      description: "Your Calendly scheduling page has been opened. Please select a time that works for you.",
    });
    
    // For debugging purposes - add this to check if the window.open is being called
    console.log("Opening Calendly URL:", calendlyUrl.toString());
  };

  return (
    <QualificationForm 
      onComplete={handleQualificationComplete}
      buttonText={buttonText}
      buttonVariant={buttonVariant}
      buttonClassName={buttonClassName}
    />
  );
}