import express, { type Express, type Router, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertEmailSubscriptionSchema, insertWaitlistSchema, loginSchema, insertUserSchema, User as SelectUser } from "@shared/schema";
import { submitApplication } from "./api/application";
import { addApplicationToNotion, getDatabaseSchema } from "./notion";

// Middleware to check if user is authenticated and is admin
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
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
  
  // API route for direct Notion integration
  apiApp.post("/notion-application", async (req: Request, res: Response) => {
    try {
      console.log('Received Notion application submission:', req.body);
      
      // Send directly to Notion
      const notionResponse = await addApplicationToNotion(req.body);
      
      res.status(201).json({ 
        success: true, 
        message: 'Application submitted to Notion successfully',
        notion: notionResponse
      });
    } catch (error: any) {
      console.error('Error submitting to Notion:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to submit application to Notion',
        error: error.message || 'Unknown error'
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
      const fs = await import('fs');
      const path = await import('path');
      const applicationDir = 'applicationInfo';
      
      // Read all application files
      fs.readdir(applicationDir, (err, files) => {
        if (err) {
          console.error('Error reading applications directory:', err);
          return res.status(500).json({ 
            success: false, 
            message: 'Error retrieving applications' 
          });
        }
        
        // Filter only application text files
        const applicationFiles = files
          .filter(file => file.startsWith('application_') && file.endsWith('.txt'))
          .map(file => ({
            filename: file,
            path: path.join(applicationDir, file),
            timestamp: file.split('_')[1]
          }));
        
        res.status(200).json({
          success: true,
          data: applicationFiles
        });
      });
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        message: error.message || "Error retrieving applications" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
