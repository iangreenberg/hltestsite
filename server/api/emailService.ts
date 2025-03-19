import nodemailer from 'nodemailer';
import { Request, Response } from 'express';

// Create a transporter using ethereal.email for testing
// In production, change this to your actual SMTP configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || ''
  }
});

export async function sendApplicationEmail(req: Request, res: Response) {
  try {
    const applicationData = req.body;
    
    if (!applicationData) {
      return res.status(400).json({ error: 'No application data provided' });
    }

    // Format application data for email
    const formattedData = Object.entries(applicationData)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    // Email options
    const mailOptions = {
      from: '"HempLaunch Application" <notifications@hemplaunch.com>',
      to: 'hemplaunchinfo@gmail.com',
      subject: `New Application: ${applicationData.name || 'Unnamed Applicant'}`,
      text: `A new application has been submitted:\n\n${formattedData}`,
      html: `
        <h2>New HempLaunch Application</h2>
        <p>A new application has been submitted with the following information:</p>
        <table border="1" cellpadding="5" style="border-collapse: collapse;">
          ${Object.entries(applicationData).map(([key, value]) => `
            <tr>
              <td><strong>${key}</strong></td>
              <td>${value}</td>
            </tr>
          `).join('')}
        </table>
      `
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent:', info.messageId);
    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error });
  }
}