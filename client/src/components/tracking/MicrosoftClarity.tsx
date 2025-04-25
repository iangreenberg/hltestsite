import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

/**
 * Initialize Microsoft Clarity
 * @param projectId The Clarity project ID from your dashboard
 */
export function initializeClarity(projectId: string): void {
  if (typeof window !== 'undefined') {
    Clarity.init(projectId);
  }
}

// To be used for tagging sessions with custom data
export function setTag(key: string, value: string | string[]): void {
  if (typeof window !== 'undefined') {
    Clarity.setTag(key, value);
  }
}

// To be used for tracking custom events
export function trackClarityEvent(eventName: string): void {
  if (typeof window !== 'undefined') {
    Clarity.event(eventName);
  }
}

/**
 * Microsoft Clarity Component
 * Initializes Clarity tracking on component mount
 */
export function MicrosoftClarityTracker({ projectId }: { projectId: string }) {
  useEffect(() => {
    initializeClarity(projectId);
  }, [projectId]);

  return null; // This component doesn't render anything
}