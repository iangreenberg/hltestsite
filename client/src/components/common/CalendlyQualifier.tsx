import { Button } from '@/components/ui/button';

interface CalendlyQualifierProps {
  buttonText?: string;
  buttonVariant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost' | 'link';
  buttonClassName?: string;
}

export default function CalendlyQualifier({ 
  buttonText = "Schedule a Consultation", 
  buttonVariant = "default",
  buttonClassName = ""
}: CalendlyQualifierProps) {
  
  const handleClick = () => {
    // Open JotForm in a new window
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