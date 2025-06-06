import express, { type Express, type Router, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertEmailSubscriptionSchema, insertWaitlistSchema, loginSchema, insertUserSchema, User as SelectUser } from "@shared/schema";
import { submitApplication } from "./api/application";
import { addApplicationToNotion, getDatabaseSchema } from "./notion";
import { createTestFilesIfEmpty, getApplicationFiles, readApplicationFile, saveApplicationToFile } from "./fileStorage";
import { buildSitemap, generateSitemap, scheduleSitemapGeneration } from "./sitemap";
import { createLogger } from "./logger";
import { registerSeoRoutes } from "./routes/seo";

// Middleware to check if user is authenticated and is admin
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Check if isAuthenticated exists
  if (typeof req.isAuthenticated !== 'function') {
    return res.status(500).json({ message: "req.isAuthenticated is not a function" });
  }
  
  if (req.isAuthenticated() && req.user?.isAdmin) {
    next();
  } else {
    res.status(403).json({ success: false, message: "Forbidden: Admin privileges required" });
  }
};

export async function registerRoutes(app: Express, apiRouter?: Router): Promise<Server> {
  // If an API router is provided, use it instead of the main app for API routes
  const apiApp = apiRouter || app;
  
  // Set up authentication with type assertion to work around TypeScript constraints
  setupAuth(app, apiRouter as any);
  
  // Register SEO routes with proper authentication
  registerSeoRoutes(apiApp);
  
  // Create test application files if none exist
  try {
    await createTestFilesIfEmpty();
  } catch (error) {
    console.error("Error creating test files:", error);
  }
  
  // Debug endpoints to test API connectivity
  // If using apiRouter mounted at /api, we don't include /api in the path
  apiApp.get("/debug", (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "API is working (GET)",
      time: new Date().toISOString(),
      requestInfo: {
        method: req.method,
        path: req.path,
        headers: req.headers['content-type'],
        host: req.headers.host,
        origin: req.headers.origin
      }
    });
  });
  
  // POST version of the debug endpoint
  apiApp.post("/debug", (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "API is working (POST)",
      time: new Date().toISOString(),
      receivedData: req.body,
      requestInfo: {
        method: req.method,
        path: req.path,
        headers: req.headers['content-type'],
        host: req.headers.host,
        origin: req.headers.origin
      }
    });
  });
  
  // Add a standalone endpoint directly on app to test direct routing
  app.get("/direct-test", (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Direct test endpoint working",
      serverTime: new Date().toISOString()
    });
  });
  
  // Simple test endpoint
  apiApp.get("/test", (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Test endpoint working (GET)",
      serverTime: new Date().toISOString()
    });
  });
  
  apiApp.post("/test", (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Test endpoint working (POST)",
      receivedData: req.body,
      serverTime: new Date().toISOString()
    });
  });
  
  // Test admin-only route
  apiApp.get("/admin-test", isAdmin, (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "You have admin access",
      user: req.user
    });
  });
  
  // Temporary non-protected applications endpoint for testing
  apiApp.get("/applications-test", async (req: Request, res: Response) => {
    try {
      // Use our fileStorage module to get applications
      const files = await getApplicationFiles();
      
      // Map files to desired format
      const path = await import('path');
      const applicationDir = 'applicationInfo';
      
      const applicationFiles = files
        .map(file => ({
          filename: file,
          path: path.join(applicationDir, file),
          timestamp: file.split('_')[1] || '0'
        }))
        .sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp)); // Sort by timestamp, newest first
      
      res.status(200).json({
        success: true,
        data: applicationFiles
      });
    } catch (error: any) {
      console.error('Error retrieving applications:', error);
      res.status(500).json({ 
        success: false, 
        message: error.message || "Error retrieving applications" 
      });
    }
  });
  
  // Simple test submission endpoint (no auth or Notion required)
  apiApp.post("/test-submit", async (req: Request, res: Response) => {
    console.log('Test application received:', req.body);
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
      
      return res.status(201).json({ 
        success: true, 
        message: 'Test application submitted successfully',
        filePath
      });
    } catch (error) {
      console.error('Error submitting test application:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to submit test application. Please try again later.',
        error: String(error)
      });
    }
  });
  
  // Temporary endpoint to get a specific application without authentication
  apiApp.get("/applications-test/:filename", async (req: Request, res: Response) => {
    try {
      const filename = req.params.filename;
      
      try {
        // Use our fileStorage module to read application file
        const data = await readApplicationFile(filename);
        
        // Try to parse as JSON
        try {
          const jsonData = JSON.parse(data);
          return res.status(200).json({
            success: true,
            data: jsonData
          });
        } catch (e) {
          // If not valid JSON, return as text
          return res.status(200).json({
            success: true,
            data: data,
            format: 'text'
          });
        }
      } catch (error: any) {
        if (error.message === 'Invalid filename') {
          return res.status(400).json({
            success: false,
            message: 'Invalid filename format'
          });
        } else if (error.code === 'ENOENT') {
          return res.status(404).json({
            success: false,
            message: 'Application file not found'
          });
        } else {
          throw error; // Re-throw to be caught by outer catch
        }
      }
    } catch (error: any) {
      console.error('Error retrieving application:', error);
      res.status(500).json({
        success: false,
        message: error.message || "Error retrieving application"
      });
    }
  });
  
  // Auth status check - handled by our Passport setup in auth.ts
  apiApp.get("/auth/status", (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      const { password, ...userWithoutPassword } = req.user as SelectUser;
      return res.status(200).json({
        success: true,
        isAuthenticated: true,
        user: userWithoutPassword
      });
    }
    
    res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  });
  // API route to add to waitlist
  apiApp.post("/waitlist", async (req: Request, res: Response) => {
    try {
      const validatedData = insertWaitlistSchema.parse(req.body);
      const newEntry = await storage.addToWaitlist(validatedData);
      res.status(201).json({ 
        success: true, 
        message: "Successfully added to waitlist", 
        id: newEntry.id 
      });
    } catch (error: any) {
      res.status(400).json({ 
        success: false, 
        message: error.message || "Invalid data provided" 
      });
    }
  });

  // API route to get all waitlist entries (protected - admin only)
  apiApp.get("/waitlist", isAdmin, async (req: Request, res: Response) => {
    try {
      const entries = await storage.getWaitlistEntries();
      res.status(200).json({
        success: true,
        data: entries
      });
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        message: error.message || "Error retrieving waitlist entries" 
      });
    }
  });

  // API route to add email subscription
  apiApp.post("/subscribe", async (req: Request, res: Response) => {
    try {
      const validatedData = insertEmailSubscriptionSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscription = await storage.getEmailSubscriptionByEmail(validatedData.email);
      if (existingSubscription) {
        return res.status(409).json({ 
          success: false, 
          message: "Email already subscribed" 
        });
      }
      
      const newSubscription = await storage.addEmailSubscription(validatedData);
      res.status(201).json({ 
        success: true, 
        message: "Successfully subscribed to newsletter", 
        id: newSubscription.id 
      });
    } catch (error: any) {
      res.status(400).json({ 
        success: false, 
        message: error.message || "Invalid email provided" 
      });
    }
  });

  // API route to get all email subscriptions (protected - admin only)
  apiApp.get("/subscribe", isAdmin, async (req: Request, res: Response) => {
    try {
      const subscriptions = await storage.getEmailSubscriptions();
      res.status(200).json({
        success: true,
        data: subscriptions
      });
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        message: error.message || "Error retrieving email subscriptions" 
      });
    }
  });

  // API route to submit application form
  // The client submits to /api/application but since we mount apiApp under /api
  // we only need to register the route as /application on apiApp
  apiApp.post("/application", submitApplication);
  
  // Simple test submission endpoint (no auth or Notion required)
  apiApp.post("/test-submit", async (req: Request, res: Response) => {
    console.log('Test application received:', req.body);
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
      
      return res.status(201).json({ 
        success: true, 
        message: 'Test application submitted successfully',
        filePath
      });
    } catch (error) {
      console.error('Error submitting test application:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to submit test application. Please try again later.',
        error: String(error)
      });
    }
  });
  
  // API route for direct Notion integration
  apiApp.post("/notion-application", async (req: Request, res: Response) => {
    try {
      console.log('Received Notion application submission:', req.body);
      
      // Send directly to Notion
      const notionResponse = await addApplicationToNotion(req.body);
      
      // Check if it was local only (Notion unavailable)
      if (notionResponse && 'localOnly' in notionResponse && notionResponse.localOnly) {
        res.status(200).json({ 
          success: true, 
          message: 'Application stored locally. Notion integration currently unavailable.',
          localOnly: true
        });
      } else {
        res.status(201).json({ 
          success: true, 
          message: 'Application submitted to Notion successfully',
          notion: notionResponse
        });
      }
    } catch (error: any) {
      console.error('Error submitting to Notion:', error);
      res.status(200).json({ 
        success: true, 
        message: 'Application stored locally, but Notion submission failed',
        error: error.message || 'Unknown error',
        fallbackToLocal: true
      });
    }
  });
  
  // Test endpoint to get Notion database schema
  apiApp.get("/notion-schema", async (req: Request, res: Response) => {
    try {
      console.log('Fetching Notion database schema...');
      const schema = await getDatabaseSchema();
      res.status(200).json({
        success: true,
        message: 'Notion database schema retrieved successfully',
        schema: schema
      });
    } catch (error: any) {
      console.error('Error fetching Notion schema:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve Notion database schema',
        error: error.message || 'Unknown error'
      });
    }
  });
  
  // Test endpoint to submit a sample application to Notion
  apiApp.post("/notion-test", async (req: Request, res: Response) => {
    try {
      console.log('Running Notion test...');
      
      // Create a simple test payload
      const testData = {
        fullName: "HempLaunch Test User",
        email: "test@hemplaunch.com",
        phone: "555-123-4567",
        businessName: "Test Hemp Business",
        cityState: "Austin, TX",
        businessSituation: "new",
        packageInterest: "growth",
        businessBasics: "complete",
        timeframe: "1to3months",
        notes: "This is a test submission from the application"
      };
      
      // Send to Notion
      const notionResponse = await addApplicationToNotion(testData);
      
      res.status(200).json({
        success: true,
        message: 'Test application submitted to Notion successfully',
        data: testData,
        notion: notionResponse
      });
    } catch (error: any) {
      console.error('Error in Notion test:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit test application to Notion',
        error: error.message || 'Unknown error'
      });
    }
  });
  
  // API route to get all applications (protected - admin only)
  apiApp.get("/applications", isAdmin, async (req: Request, res: Response) => {
    try {
      // Use our fileStorage module to get applications
      const files = await getApplicationFiles();
      
      // Map files to desired format
      const path = await import('path');
      const applicationDir = 'applicationInfo';
      
      const applicationFiles = files
        .map(file => ({
          filename: file,
          path: path.join(applicationDir, file),
          timestamp: file.split('_')[1] || '0'
        }))
        .sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp)); // Sort by timestamp, newest first
      
      res.status(200).json({
        success: true,
        data: applicationFiles
      });
    } catch (error: any) {
      console.error('Error retrieving applications:', error);
      res.status(500).json({ 
        success: false, 
        message: error.message || "Error retrieving applications" 
      });
    }
  });
  
  // API route to submit application and save it locally
  apiApp.post("/applications/submit", async (req: Request, res: Response) => {
    try {
      console.log('Application submission received:', {
        body: req.body,
        method: req.method,
        path: req.path,
        headers: req.headers['content-type']
      });
      
      const applicationData = req.body;
      
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
      
      return res.status(201).json({
        success: true,
        message: 'Application submitted and saved successfully',
        filePath
      });
    } catch (error: any) {
      console.error('Error submitting application:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to submit application. Please try again later.'
      });
    }
  });

  // API route to get a specific application file (protected - admin only)
  apiApp.get("/applications/:filename", isAdmin, async (req: Request, res: Response) => {
    try {
      const filename = req.params.filename;
      
      try {
        // Use our fileStorage module to read application file
        const data = await readApplicationFile(filename);
        
        // Try to parse as JSON
        try {
          const jsonData = JSON.parse(data);
          return res.status(200).json({
            success: true,
            data: jsonData
          });
        } catch (e) {
          // If not valid JSON, return as text
          return res.status(200).json({
            success: true,
            data: data,
            format: 'text'
          });
        }
      } catch (error: any) {
        if (error.message === 'Invalid filename') {
          return res.status(400).json({
            success: false,
            message: 'Invalid filename format'
          });
        } else if (error.code === 'ENOENT') {
          return res.status(404).json({
            success: false,
            message: 'Application file not found'
          });
        } else {
          throw error; // Re-throw to be caught by outer catch
        }
      }
    } catch (error: any) {
      console.error('Error retrieving application:', error);
      res.status(500).json({
        success: false,
        message: error.message || "Error retrieving application"
      });
    }
  });
  
  // Admin dashboard summary endpoint
  apiApp.get("/admin/dashboard", isAdmin, async (req: Request, res: Response) => {
    try {
      // Get applications count
      const applicationFiles = await getApplicationFiles();
      const applicationsCount = applicationFiles.length;
      
      // Get waitlist count
      const waitlistEntries = await storage.getWaitlistEntries();
      const waitlistCount = waitlistEntries.length;
      
      // Get email subscriptions count
      const emailSubscriptions = await storage.getEmailSubscriptions();
      const emailSubscriptionsCount = emailSubscriptions.length;
      
      // Generate recent activity from available data
      const recentActivity = [];
      
      // Add recent applications (up to 5)
      for (const filename of applicationFiles.slice(0, 5)) {
        try {
          const fileContent = await readApplicationFile(filename);
          const applicationData = JSON.parse(fileContent);
          
          recentActivity.push({
            type: 'application',
            name: applicationData.fullName || 'Unknown',
            date: new Date(filename.split('_')[1] ? filename.split('_')[1].replace(/-/g, ':') : Date.now()).toISOString()
          });
        } catch (error) {
          console.error('Error parsing application file:', filename, error);
          // Skip this file if there's an error
        }
      }
      
      // Add recent waitlist entries (up to 5)
      for (const entry of waitlistEntries.slice(0, 5)) {
        recentActivity.push({
          type: 'waitlist',
          name: `${entry.firstName} ${entry.lastName}` || entry.email || 'Unknown',
          date: new Date().toISOString() // Use current timestamp as we don't store creation date
        });
      }
      
      // Add recent email subscriptions (up to 5)
      for (const subscription of emailSubscriptions.slice(0, 5)) {
        recentActivity.push({
          type: 'subscription',
          name: subscription.email || 'Unknown',
          date: new Date().toISOString() // Use current timestamp as we don't store creation date
        });
      }
      
      // Sort by most recent first (this is a placeholder since we don't have real timestamps for all entries)
      recentActivity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      // Return dashboard data
      res.status(200).json({
        success: true,
        data: {
          applications: applicationsCount,
          waitlist: waitlistCount,
          emailSubscriptions: emailSubscriptionsCount,
          recentActivity: recentActivity.slice(0, 10) // Limit to 10 most recent activities
        }
      });
    } catch (error: any) {
      console.error('Error getting admin dashboard data:', error);
      res.status(500).json({
        success: false,
        message: error.message || "Error retrieving dashboard data"
      });
    }
  });

  // SEO sitemap endpoints
  // Serve sitemap.xml 
  app.get('/sitemap.xml', async (req: Request, res: Response) => {
    try {
      const sitemap = await buildSitemap();
      res.header('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error) {
      console.error('Error serving sitemap:', error);
      res.status(500).send('Error generating sitemap');
    }
  });
  
  // API endpoint to manually trigger sitemap generation (admin only)
  apiApp.post("/seo/generate-sitemap", isAdmin, async (req: Request, res: Response) => {
    try {
      await generateSitemap();
      res.status(200).json({
        success: true,
        message: "Sitemap generated successfully"
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Error generating sitemap"
      });
    }
  });
  
  // Register SEO routes
  // SEO routes are registered via registerSeoRoutes earlier
  
  // Schedule automatic sitemap generation (daily at midnight)
  scheduleSitemapGeneration();

  const httpServer = createServer(app);

  // Generate sitemap on server start
  generateSitemap().catch(error => {
    console.error('Error generating initial sitemap:', error);
  });

  return httpServer;
}
