import { Request, Response } from 'express';
import { saveApplicationToFile } from '../fileStorage';

export async function submitApplication(req: Request, res: Response) {
  try {
    const applicationData = req.body;
    
    // Basic validation
    if (!applicationData || !applicationData.fullName || !applicationData.email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid application data. Name and email are required.' 
      });
    }
    
    // Save application to file
    const filePath = await saveApplicationToFile(applicationData, applicationData.fullName);
    
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