import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertEmailSubscriptionSchema, insertWaitlistSchema, loginSchema, insertUserSchema, User as SelectUser } from "@shared/schema";

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
  app.get("/api/waitlist", (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }
    if (!(req.user as SelectUser).isAdmin) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
  }, async (req, res) => {
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
  app.get("/api/subscribe", (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }
    if (!(req.user as SelectUser).isAdmin) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
  }, async (req, res) => {
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

  const httpServer = createServer(app);

  return httpServer;
}
