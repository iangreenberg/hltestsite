import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Declare the fbq function type for TypeScript
declare global {
  interface Window {
    fbq?: (
      eventType: string,
      eventName: string,
      params?: any
    ) => void;
  }
}

export function MetaPixelTracker() {
  const [location] = useLocation();

  // Track page views when route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location]);

  return null; // This component doesn't render anything
}

// Helper function to track custom events
export function trackPixelEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
}