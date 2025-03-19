import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function addApplicationToNotion(applicationData: any) {
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID!,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: `${applicationData.firstName} ${applicationData.lastName}`,
              },
            },
          ],
        },
        Email: {
          email: applicationData.email,
        },
        Phone: {
          phone_number: applicationData.phone,
        },
        Business: {
          rich_text: [
            {
              text: {
                content: applicationData.business || 'Not specified',
              },
            },
          ],
        },
        Investment: {
          rich_text: [
            {
              text: {
                content: applicationData.investmentAmount || 'Not specified',
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

    return response;
  } catch (error) {
    console.error('Error adding application to Notion:', error);
    throw error;
  }
}