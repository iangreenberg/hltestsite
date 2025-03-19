import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertEmailSubscriptionSchema, insertWaitlistSchema, loginSchema, insertUserSchema, User as SelectUser } from "@shared/schema";
import { submitApplication } from "./api/application";

// Middleware to check if user is authenticated and is admin
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated() && req.user?.isAdmin) {
    next();
  } else {
    res.status(403).json({ success: false, message: "Forbidden: Admin privileges required" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);
  
  // Test admin-only route
  app.get("/api/admin-test", isAdmin, (req, res) => {
    res.status(200).json({
      success: true,
      message: "You have admin access",
      user: req.user
    });
  });
  
  // Auth status check - handled by our Passport setup in auth.ts
  app.get("/api/auth/status", (req, res) => {
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
  app.post("/api/waitlist", async (req, res) => {
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
  app.get("/api/waitlist", isAdmin, async (req, res) => {
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
  app.post("/api/subscribe", async (req, res) => {
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
  app.get("/api/subscribe", isAdmin, async (req, res) => {
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
  app.post("/api/application", submitApplication);
  
  // API route to get all applications (protected - admin only)
  app.get("/api/applications", isAdmin, async (req, res) => {
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
