import { useEffect } from 'react';

// Add type definition for global clarity function
declare global {
  interface Window {
    clarity?: (method: string, ...args: any[]) => void;
  }
}

/**
 * Microsoft Clarity Component
 * Uses the direct script injection approach recommended by Microsoft
 */
export function MicrosoftClarityTracker({ projectId }: { projectId: string }) {
  useEffect(() => {
    // Skip if running in server context or no projectId
    if (typeof window === 'undefined' || !projectId) return;
    
    // Remove any existing instance to prevent duplicates
    const existingScripts = document.querySelectorAll(`script[src*="clarity.ms/tag/"]`);
    existingScripts.forEach(script => script.parentNode?.removeChild(script));
    
    // Create script tag with the direct source
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${projectId}`;
    
    // Add logging for debugging
    script.onload = () => console.log('Microsoft Clarity loaded successfully');
    script.onerror = (error) => console.error('Failed to load Microsoft Clarity:', error);
    
    // Append to document
    document.head.appendChild(script);
    
  }, [projectId]);

  return null; // This component doesn't render anything
}

/**
 * Track a custom event in Microsoft Clarity
 * This utility function can be imported and used anywhere in the app
 */
export const trackClarityEvent = (eventName: string, metadata?: Record<string, any>): void => {
  if (typeof window !== 'undefined' && window.clarity) {
    try {
      if (metadata) {
        window.clarity('event', eventName, metadata);
      } else {
        window.clarity('event', eventName);
      }
      console.log('Clarity event tracked:', eventName);
    } catch (error) {
      console.error('Error tracking Clarity event:', error);
    }
  }
};