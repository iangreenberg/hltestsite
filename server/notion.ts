import { Client } from '@notionhq/client';

// Log Notion configuration (without exposing sensitive data)
console.log('Notion config check:', {
  apiKeyExists: !!process.env.NOTION_API_KEY,
  databaseIdExists: !!process.env.NOTION_DATABASE_ID,
  apiKeyLength: process.env.NOTION_API_KEY?.length || 0,
  databaseIdLength: process.env.NOTION_DATABASE_ID?.length || 0
});

// Create the Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Flag to track if Notion is available
let notionAvailable = false;

// First try to get database schema to understand what properties are available
export async function getDatabaseSchema() {
  try {
    const response = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID!,
    });
    return response;
  } catch (error) {
    console.error('Error fetching Notion database schema:', error);
    throw error;
  }
}

// Initialize Notion - will perform a test and set notionAvailable flag
export async function initializeNotion() {
  try {
    await getDatabaseSchema();
    notionAvailable = true;
    console.log('✅ Notion integration initialized successfully');
    return true;
  } catch (error) {
    notionAvailable = false;
    console.error('❌ Notion integration initialization failed:', error instanceof Error ? error.message : 'Unknown error');
    console.log('Applications will still be stored locally, but not in Notion.');
    return false;
  }
}

// Try to initialize when this module loads
initializeNotion().catch(err => {
  console.warn('Notion initialization failed in background:', err);
});

export async function addApplicationToNotion(applicationData: any) {
  try {
    // If Notion is not available, store the data locally only
    if (!notionAvailable) {
      console.log('Notion integration is not available. Storing application data locally only.');
      return {
        success: false,
        message: 'Notion integration is not available. Application data stored locally only.',
        localOnly: true
      };
    }
    
    console.log('Preparing data for Notion:', applicationData);
    
    // Extract name parts if the form has fullName instead of firstName/lastName
    let fullName = applicationData.fullName || '';
    if (!fullName && (applicationData.firstName || applicationData.lastName)) {
      fullName = `${applicationData.firstName || ''} ${applicationData.lastName || ''}`.trim();
    }
    
    // Try to dynamically build properties based on form data
    const properties: any = {};
    
    // Always need a title field
    properties['Name'] = {
      title: [
        {
          text: {
            content: fullName || 'New Application',
          },
        },
      ],
    };
    
    // Add remaining fields - handling different property types
    // Email field
    if (applicationData.email) {
      properties['Email'] = {
        email: applicationData.email,
      };
    }
    
    // Phone field
    if (applicationData.phone) {
      properties['Phone'] = {
        phone_number: applicationData.phone,
      };
    }
    
    // Text fields
    const textFields = {
      'Business Name': applicationData.businessName || applicationData.business || '',
      'Location': applicationData.cityState || '',
      'Business Situation': applicationData.businessSituation || '',
      'Package Interest': applicationData.packageInterest || '',
      'Business Basics': applicationData.businessBasics || '',
      'Timeline': applicationData.timeframe || applicationData.timeline || '',
      'Notes': applicationData.notes || applicationData.additionalNotes || '',
      'Business Type': applicationData.businessType || '',
      'Referral Source': applicationData.referralSource || '',
    };
    
    // Add all non-empty text fields
    Object.entries(textFields).forEach(([key, value]) => {
      if (value) {
        properties[key] = {
          rich_text: [
            {
              text: {
                content: value.toString(),
              },
            },
          ],
        };
      }
    });
    
    // Add date field
    properties['Submission Date'] = {
      date: {
        start: new Date().toISOString(),
      },
    };
    
    // Add Status if present
    if ('status' in properties) {
      properties['Status'] = {
        status: {
          name: 'New Application',
        },
      };
    }
    
    console.log('Notion request properties:', JSON.stringify(properties, null, 2));
    
    // Create the page in Notion
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID!,
      },
      properties: properties,
    });

    console.log('Notion response received');
    notionAvailable = true; // Confirm Notion is working
    return response;
  } catch (error) {
    console.error('Error adding application to Notion:', error);
    notionAvailable = false; // Notion is not working
    
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      if (error.message.includes('properties')) {
        console.error('This appears to be a property mismatch. The Notion database columns might not match our expected schema.');
        // Try to get schema info to help debug
        try {
          const schema = await getDatabaseSchema();
          console.log('Database schema:', JSON.stringify(schema.properties, null, 2));
        } catch (schemaError) {
          console.error('Failed to fetch schema:', schemaError);
        }
      }
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}