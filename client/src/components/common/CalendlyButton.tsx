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
  const openCalendly = () => {
    window.open("https://calendly.com/testhemp/hemplaunch", "_blank");
  };

  return (
    <Button
      onClick={openCalendly}
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