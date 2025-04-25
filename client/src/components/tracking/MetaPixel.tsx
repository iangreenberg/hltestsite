import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Make TypeScript recognize the Facebook Pixel
declare global {
  interface Window {
    fbq: any;
  }
}

/**
 * Meta Pixel Tracker Component
 * Tracks page views when routes change in single page application
 */
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

/**
 * Helper function to track custom Meta Pixel events
 * @param eventName The name of the event to track
 * @param params Optional parameters for the event
 */
export function trackPixelEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
}