// No need to import React with the JSX transformer
import { cn } from '@/lib/utils';

// Hemp leaf SVG component for the loader
const HempLeaf = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className}
    fill="currentColor"
  >
    <path d="M50,2.5c0,0-10,15-10,30c0,5,1,8,2,11c-2-1-4-2-7-2c-10,0-25,10-25,10s15,10,25,10c3,0,5-1,7-2
      c-1,3-2,6-2,11c0,15,10,30,10,30s10-15,10-30c0-5-1-8-2-11c2,1,4,2,7,2c10,0,25-10,25-10s-15-10-25-10c-3,0-5,1-7,2
      c1-3,2-6,2-11C60,17.5,50,2.5,50,2.5z M50,42.5c0,0-2.5-5-2.5-10s2.5-10,2.5-10s2.5,5,2.5,10S50,42.5,50,42.5z
      M50,67.5c0,0-2.5-5-2.5-10s2.5-10,2.5-10s2.5,5,2.5,10S50,67.5,50,67.5z M67.5,50c0,0-5,2.5-10,2.5s-10-2.5-10-2.5
      s5-2.5,10-2.5S67.5,50,67.5,50z M42.5,50c0,0-5,2.5-10,2.5s-10-2.5-10-2.5s5-2.5,10-2.5S42.5,50,42.5,50z" />
  </svg>
);

export interface HempLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
}

export function HempLoader({ size = 'md', className, text }: HempLoaderProps) {
  // Size mapping
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };
  
  // Text size mapping
  const textSizeMap = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className="relative animate-spin">
        <HempLeaf className={cn('text-[#2F5D50]', sizeMap[size])} />
      </div>
      {text && (
        <p className={cn('mt-3 text-[#2F5D50] font-medium', textSizeMap[size])}>
          {text}
        </p>
      )}
    </div>
  );
}

export interface HempProgressProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showValue?: boolean;
  text?: string;
}

export function HempProgress({
  value,
  size = 'md',
  className,
  showValue = false,
  text
}: HempProgressProps) {
  // Size mapping
  const sizeMap = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };
  
  const progress = Math.max(0, Math.min(100, value));
  const leaves = Math.floor(progress / 10); // One leaf per 10% progress
  
  return (
    <div className={cn('w-full space-y-2', className)}>
      <div className="flex justify-between items-center">
        {text && <span className="text-sm font-medium text-[#2F5D50]">{text}</span>}
        {showValue && <span className="text-sm font-medium text-[#2F5D50]">{progress}%</span>}
      </div>
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', sizeMap[size])}>
        <div 
          className="bg-[#2F5D50] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="h-full relative">
            {/* Add small hemp leaf indicators */}
            {Array.from({ length: 10 }).map((_, i) => (
              i < leaves ? (
                <div 
                  key={i} 
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6"
                  style={{ left: `${i * 10 + 5}%` }}
                >
                  <HempLeaf className="text-[#C8A951] w-3 h-3 opacity-80" />
                </div>
              ) : null
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// More playful loader that bounces hemp leaves
export function HempBouncingLoader({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center space-x-2', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'animate-bounce text-[#2F5D50]',
            i === 0 && 'delay-0',
            i === 1 && 'delay-150',
            i === 2 && 'delay-300'
          )}
        >
          <HempLeaf className="w-6 h-6" />
        </div>
      ))}
    </div>
  );
}

// Growing/shrinking leaf pattern
export function HempGrowingLoader({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="relative">
        <HempLeaf className="w-16 h-16 text-[#2F5D50] animate-pulse" />
        <HempLeaf className="w-12 h-12 text-[#C8A951] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping opacity-70" />
      </div>
    </div>
  );
}