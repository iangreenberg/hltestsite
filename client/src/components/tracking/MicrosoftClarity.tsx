import { useEffect } from 'react';

/**
 * Microsoft Clarity Component
 * Initializes Clarity tracking on component mount
 */
export function MicrosoftClarityTracker({ projectId }: { projectId: string }) {
  useEffect(() => {
    // Skip if running in server context or no projectId
    if (typeof window === 'undefined' || !projectId) return;
    
    // Load the Clarity script directly
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://www.clarity.ms/tag/' + projectId;
    
    script.onload = () => console.log('Microsoft Clarity script loaded successfully');
    script.onerror = (error) => console.error('Failed to load Microsoft Clarity script:', error);
    
    // Add the script to the document
    document.head.appendChild(script);
    
    // Cleanup on unmount
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [projectId]);

  return null; // This component doesn't render anything
}