import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function addApplicationToNotion(applicationData: any) {
  try {
    console.log('Preparing data for Notion:', applicationData);
    
    // Extract name parts if the form has fullName instead of firstName/lastName
    let firstName = applicationData.firstName;
    let lastName = applicationData.lastName;
    
    if (!firstName && !lastName && applicationData.fullName) {
      const nameParts = applicationData.fullName.split(' ');
      firstName = nameParts[0];
      lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    }
    
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID!,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: applicationData.fullName || `${firstName} ${lastName}`,
              },
            },
          ],
        },
        Email: {
          email: applicationData.email,
        },
        Phone: {
          phone_number: applicationData.phone || '',
        },
        Business: {
          rich_text: [
            {
              text: {
                content: applicationData.businessName || applicationData.business || 'Not specified',
              },
            },
          ],
        },
        Location: {
          rich_text: [
            {
              text: {
                content: applicationData.cityState || 'Not specified',
              },
            },
          ],
        },
        "Business Situation": {
          rich_text: [
            {
              text: {
                content: applicationData.businessSituation || 'Not specified',
              },
            },
          ],
        },
        "Package Interest": {
          rich_text: [
            {
              text: {
                content: applicationData.packageInterest || 'Not specified',
              },
            },
          ],
        },
        "Business Basics": {
          rich_text: [
            {
              text: {
                content: applicationData.businessBasics || 'Not specified',
              },
            },
          ],
        },
        Timeline: {
          rich_text: [
            {
              text: {
                content: applicationData.timeframe || 'Not specified',
              },
            },
          ],
        },
        Status: {
          status: {
            name: 'New',
          },
        },
        'Submission Date': {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });

    console.log('Notion response:', response);
    return response;
  } catch (error) {
    console.error('Error adding application to Notion:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}