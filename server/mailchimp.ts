import mailchimp from '@mailchimp/mailchimp_marketing';
import { EmailSubscription } from '@shared/schema';
import { log } from './vite';

// Interface for Mailchimp configuration
interface MailchimpConfig {
  apiKey: string;
  serverPrefix: string;
  listId: string;
}

/**
 * Initialize the Mailchimp client with API credentials
 */
export function initializeMailchimp(): void {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  
  if (!apiKey || !serverPrefix) {
    log('Mailchimp API key or server prefix not found in environment variables', 'mailchimp');
    return;
  }

  mailchimp.setConfig({
    apiKey,
    server: serverPrefix, // Usually the datacenter prefix (us1, us2, etc.)
  });
  
  log('Mailchimp client initialized successfully', 'mailchimp');
}

/**
 * Add a subscriber to the Mailchimp list
 * @param email Email address to subscribe
 * @param listId Mailchimp list/audience ID
 * @param firstName Optional first name of the subscriber
 * @param lastName Optional last name of the subscriber
 * @returns Promise with the response from Mailchimp
 */
export async function addSubscriberToMailchimp(
  email: string, 
  listId: string = process.env.MAILCHIMP_LIST_ID || '',
  firstName?: string,
  lastName?: string
): Promise<any> {
  try {
    if (!listId) {
      throw new Error('Mailchimp list ID not found in environment variables');
    }

    // Prepare the subscriber data
    const subscriberData: any = {
      email_address: email,
      status: 'subscribed', // Use 'pending' for double opt-in
    };

    // Add merge fields if first name or last name are provided
    if (firstName || lastName) {
      subscriberData.merge_fields = {};
      if (firstName) subscriberData.merge_fields.FNAME = firstName;
      if (lastName) subscriberData.merge_fields.LNAME = lastName;
    }

    // Add the subscriber to the list
    const response = await mailchimp.lists.addListMember(listId, subscriberData);
    log(`Successfully added new subscriber: ${email}`, 'mailchimp');
    return response;
  } catch (error: any) {
    // Handle specific Mailchimp errors
    if (error.status === 400 && error.title === 'Member Exists') {
      log(`Email ${email} is already subscribed`, 'mailchimp');
      throw new Error('Email already subscribed to Mailchimp');
    }

    log(`Error adding subscriber to Mailchimp: ${error.message || error}`, 'mailchimp');
    throw error;
  }
}

/**
 * Add a tag to a subscriber in Mailchimp
 * @param email Email address of the subscriber
 * @param tag Tag to add to the subscriber
 * @param listId Mailchimp list/audience ID
 * @returns Promise with the response from Mailchimp
 */
export async function addTagToSubscriber(
  email: string,
  tag: string,
  listId: string = process.env.MAILCHIMP_LIST_ID || ''
): Promise<any> {
  try {
    if (!listId) {
      throw new Error('Mailchimp list ID not found in environment variables');
    }

    // First, get the subscriber hash (MD5 hash of lowercase email)
    const subscriberHash = require('crypto')
      .createHash('md5')
      .update(email.toLowerCase())
      .digest('hex');

    // Add the tag to the subscriber
    const response = await mailchimp.lists.updateListMemberTags(
      listId,
      subscriberHash,
      {
        tags: [{ name: tag, status: 'active' }]
      }
    );
    
    log(`Successfully added tag '${tag}' to subscriber: ${email}`, 'mailchimp');
    return response;
  } catch (error: any) {
    log(`Error adding tag to subscriber in Mailchimp: ${error.message || error}`, 'mailchimp');
    throw error;
  }
}

/**
 * Sync existing email subscribers with Mailchimp
 * @param subscribers List of email subscriptions to sync
 * @param listId Mailchimp list/audience ID
 * @returns Promise with the number of successfully synced subscribers
 */
export async function syncSubscribersWithMailchimp(
  subscribers: EmailSubscription[],
  listId: string = process.env.MAILCHIMP_LIST_ID || ''
): Promise<number> {
  if (!listId) {
    throw new Error('Mailchimp list ID not found in environment variables');
  }

  let successCount = 0;
  const errors: Array<{ email: string, error: string }> = [];

  for (const subscriber of subscribers) {
    try {
      await addSubscriberToMailchimp(subscriber.email, listId);
      successCount++;
    } catch (error: any) {
      // Skip "already subscribed" errors as they're not actual failures
      if (error.message === 'Email already subscribed to Mailchimp') {
        successCount++;
      } else {
        errors.push({
          email: subscriber.email,
          error: error.message || 'Unknown error'
        });
      }
    }
  }

  if (errors.length > 0) {
    log(`Failed to sync ${errors.length} subscribers: ${JSON.stringify(errors)}`, 'mailchimp');
  }

  return successCount;
}

/**
 * Create a new segment in a Mailchimp list
 * @param name Name of the segment/group
 * @param listId Mailchimp list/audience ID
 * @returns Promise with the created segment
 */
export async function createSegment(
  name: string,
  listId: string = process.env.MAILCHIMP_LIST_ID || ''
): Promise<any> {
  try {
    if (!listId) {
      throw new Error('Mailchimp list ID not found in environment variables');
    }

    const response = await mailchimp.lists.createSegment(listId, {
      name,
      static_segment: []
    });
    
    log(`Successfully created segment: ${name}`, 'mailchimp');
    return response;
  } catch (error: any) {
    log(`Error creating segment in Mailchimp: ${error.message || error}`, 'mailchimp');
    throw error;
  }
}

/**
 * Send a transactional email using Mailchimp
 * @param templateName Name or ID of the Mailchimp template 
 * @param email Recipient email address
 * @param subject Email subject
 * @param templateContent Content to replace merge tags in the template
 * @returns Promise with the response from Mailchimp
 */
export async function sendTransactionalEmail(
  templateName: string,
  email: string,
  subject: string,
  templateContent: Record<string, string> = {}
): Promise<any> {
  try {
    // Note: This requires Mandrill API key, which is different from Mailchimp API key
    const mandrillApiKey = process.env.MANDRILL_API_KEY;
    
    if (!mandrillApiKey) {
      throw new Error('Mandrill API key not found in environment variables');
    }

    // This is a simplified version - actual implementation would use Mandrill API
    // Since Mailchimp's transactional emails are sent through Mandrill
    log(`Would send transactional email to ${email} using template: ${templateName}`, 'mailchimp');
    
    // In a real implementation, this would make an API call to Mandrill
    return {
      status: 'success',
      message: 'Email would be sent (this is a placeholder)',
      to: email,
      subject,
      template: templateName
    };
  } catch (error: any) {
    log(`Error sending transactional email: ${error.message || error}`, 'mailchimp');
    throw error;
  }
}