/**
 * Helper functions for Microsoft Clarity
 */

/**
 * Track a custom event in Microsoft Clarity
 * @param eventName Name of the event to track
 * @param metadata Optional metadata to associate with the event
 */
export function trackClarityEvent(eventName: string, metadata?: Record<string, any>): void {
  if (typeof window !== 'undefined' && window.clarity) {
    try {
      if (metadata) {
        window.clarity('event', eventName, metadata);
      } else {
        window.clarity('event', eventName);
      }
      console.log(`Clarity event tracked: ${eventName}`);
    } catch (error) {
      console.error('Error tracking Clarity event:', error);
    }
  }
}

/**
 * Identify a user in Microsoft Clarity
 * @param userId User ID to identify
 * @param userData Optional user metadata
 */
export function identifyUser(userId: string, userData?: Record<string, any>): void {
  if (typeof window !== 'undefined' && window.clarity) {
    try {
      window.clarity('identify', userId, userData);
      console.log(`User identified in Clarity: ${userId}`);
    } catch (error) {
      console.error('Error identifying user in Clarity:', error);
    }
  }
}

/**
 * Set a custom tag in Microsoft Clarity
 * @param key Tag key
 * @param value Tag value
 */
export function setClarityTag(key: string, value: string): void {
  if (typeof window !== 'undefined' && window.clarity) {
    try {
      window.clarity('set', key, value);
      console.log(`Clarity tag set: ${key}=${value}`);
    } catch (error) {
      console.error('Error setting Clarity tag:', error);
    }
  }
}

/**
 * Verify Clarity is properly loaded and accessible
 */
export function verifyClaritySetup(): boolean {
  if (typeof window !== 'undefined' && window.clarity) {
    console.log('✅ Microsoft Clarity is properly configured');
    return true;
  } else {
    console.error('❌ Microsoft Clarity is not configured or not loaded');
    return false;
  }
}

// Extend window interface to recognize clarity
declare global {
  interface Window {
    clarity?: (method: string, ...args: any[]) => void;
  }
}