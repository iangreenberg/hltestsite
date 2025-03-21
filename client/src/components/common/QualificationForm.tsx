import { Button } from '@/components/ui/button';

interface QualificationFormProps {
  onComplete?: (data: any) => void;
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
  
  const handleClick = () => {
    // Open JotForm directly in a new window
    window.open('https://form.jotform.com/250775888697180', '_blank');
  };

  return (
    <Button 
      onClick={handleClick}
      variant={buttonVariant}
      className={buttonClassName}
    >
      {buttonText}
    </Button>
  );
}