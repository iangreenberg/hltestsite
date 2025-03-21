import { useEffect, useState } from 'react';
import { HempLoader, HempBouncingLoader, HempGrowingLoader, HempProgress } from './hemp-loader';
import { cn } from '@/lib/utils';

const loadingMessages = [
  "Growing your hemp experience...",
  "Cultivating success...",
  "Harvesting the best solutions...",
  "Planting the seeds of your business...",
  "Nurturing your hemp empire...",
  "Preparing your hemp launch pad..."
];

export interface LoadingScreenProps {
  className?: string;
  message?: string;
  showProgress?: boolean;
  progress?: number;
  variant?: 'spinner' | 'bouncing' | 'growing' | 'progress';
  overlay?: boolean;
}

export function LoadingScreen({
  className,
  message,
  showProgress = false,
  progress = 0,
  variant = 'spinner',
  overlay = false
}: LoadingScreenProps) {
  const [loadingMessage, setLoadingMessage] = useState(message || loadingMessages[0]);
  
  // Cycle through loading messages if no custom message is provided
  useEffect(() => {
    if (message) return;
    
    const interval = setInterval(() => {
      setLoadingMessage(prevMsg => {
        const currentIndex = loadingMessages.indexOf(prevMsg);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [message]);
  
  // Render the appropriate loader based on the variant
  const renderLoader = () => {
    switch (variant) {
      case 'bouncing':
        return <HempBouncingLoader />;
      case 'growing':
        return <HempGrowingLoader />;
      case 'progress':
        return (
          <div className="w-64">
            <HempProgress 
              value={progress} 
              size="lg" 
              showValue={true} 
              text={loadingMessage} 
            />
          </div>
        );
      case 'spinner':
      default:
        return <HempLoader size="lg" text={loadingMessage} />;
    }
  };
  
  return (
    <div 
      className={cn(
        'flex flex-col items-center justify-center',
        overlay ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50' : 'min-h-[200px]',
        className
      )}
    >
      <div className="flex flex-col items-center p-6 rounded-lg">
        {renderLoader()}
        
        {showProgress && variant !== 'progress' && (
          <div className="mt-8 w-64">
            <HempProgress value={progress} size="md" showValue />
          </div>
        )}
      </div>
    </div>
  );
}

// This component can be used when data is loading
export function DataLoader({
  isLoading,
  children,
  className,
  variant = 'spinner',
}: {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: 'spinner' | 'bouncing' | 'growing';
}) {
  if (isLoading) {
    return (
      <div className={cn('min-h-[200px] flex items-center justify-center', className)}>
        {variant === 'bouncing' && <HempBouncingLoader />}
        {variant === 'growing' && <HempGrowingLoader />}
        {variant === 'spinner' && <HempLoader size="md" text="Loading data..." />}
      </div>
    );
  }
  
  return <>{children}</>;
}

// This can be used for full-page loading when navigating between pages
export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <HempGrowingLoader />
    </div>
  );
}