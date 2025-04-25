import { useEffect } from 'react';
import * as clarity from '@microsoft/clarity';

/**
 * Initialize Microsoft Clarity
 * @param projectId The Clarity project ID from your dashboard
 */
export function initializeClarity(projectId: string): void {
  if (typeof window !== 'undefined' && projectId) {
    try {
      clarity.init(projectId);
      console.log('Microsoft Clarity initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Microsoft Clarity:', error);
    }
  }
}

// To be used for tagging sessions with custom data
export function setTag(key: string, value: string | string[]): void {
  if (typeof window !== 'undefined') {
    try {
      clarity.setTag(key, value);
    } catch (error) {
      console.error('Failed to set Clarity tag:', error);
    }
  }
}

// To be used for tracking custom events
export function trackClarityEvent(eventName: string): void {
  if (typeof window !== 'undefined') {
    try {
      clarity.event(eventName);
    } catch (error) {
      console.error('Failed to track Clarity event:', error);
    }
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