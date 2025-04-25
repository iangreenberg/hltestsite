import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Define the window.gtag type for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

/**
 * Google Analytics Tracker Component
 * Tracks page views when routes change in single page application
 */
export function GoogleAnalyticsTracker() {
  const [location] = useLocation();

  // Track page views when route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location,
        page_title: document.title,
      });
    }
  }, [location]);

  return null; // This component doesn't render anything
}

/**
 * Helper function to track custom Google Analytics events
 * @param eventName The name of the event to track
 * @param params Optional parameters for the event
 */
export function trackGAEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}