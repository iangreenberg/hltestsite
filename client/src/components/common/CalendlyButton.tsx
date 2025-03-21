import { Button, ButtonProps } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface CalendlyButtonProps extends ButtonProps {
  text?: string;
}

export default function CalendlyButton({ 
  text = "Schedule a Meeting", 
  className, 
  variant = "default", 
  size = "lg",
  ...props 
}: CalendlyButtonProps) {
  const openJotForm = () => {
    window.open("https://form.jotform.com/250775888697180", "_blank");
  };

  return (
    <Button
      onClick={openJotForm}
      className={`gap-2 ${className || ""}`}
      variant={variant}
      size={size}
      {...props}
    >
      <Calendar className="h-4 w-4" />
      {text}
    </Button>
  );
}