import { Request, Response } from 'express';
import { saveApplicationToFile } from '../fileStorage';
import { addApplicationToNotion } from '../notion';

export async function submitApplication(req: Request, res: Response) {
  console.log('Application submission received:', {
    body: req.body,
    method: req.method,
    path: req.path,
    headers: req.headers['content-type']
  });

  try {
    const applicationData = req.body;
    
    console.log('Processing application data:', applicationData);
    
    // Basic validation
    if (!applicationData || !applicationData.fullName || !applicationData.email) {
      console.log('Application validation failed:', { applicationData });
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid application data. Name and email are required.' 
      });
    }
    
    // Save application to file
    console.log('Saving application to file...');
    const filePath = await saveApplicationToFile(applicationData, applicationData.fullName);
    console.log('Application saved to:', filePath);

    // Add to Notion database
    console.log('Adding application to Notion...');
    try {
      const notionResponse = await addApplicationToNotion(applicationData);
      console.log('Application added to Notion:', notionResponse);
    } catch (notionError) {
      console.error('Error adding to Notion (continuing with submission):', notionError);
      // We don't want to fail the submission if Notion sync fails
    }
    
    // Return success
    return res.status(201).json({ 
      success: true, 
      message: 'Application submitted successfully',
      filePath
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to submit application. Please try again later.'
    });
  }
}