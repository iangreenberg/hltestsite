import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSubscriptionSchema, insertWaitlistSchema, loginSchema } from "@shared/schema";
import session from "express-session";

// Middleware to check if user is authenticated and is admin
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user && req.session.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up session middleware
  app.use(session({
    secret: 'hempLaunchSecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false, // set to true in production with HTTPS
      maxAge: 3600000 // 1 hour
    }
  }));
  
  // Authentication routes
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      const user = await storage.validateCredentials(username, password);
      
      if (user) {
        // Store user info in session but remove password
        const { password, ...userWithoutPassword } = user;
        req.session.user = userWithoutPassword;
        
        return res.status(200).json({
          success: true,
          message: "Login successful",
          user: userWithoutPassword
        });
      }
      
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Invalid login data"
      });
    }
  });
  
  app.post("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Logout failed"
        });
      }
      
      res.status(200).json({
        success: true,
        message: "Logged out successfully"
      });
    });
  });
  
  // Auth status check
  app.get("/api/auth/status", (req, res) => {
    if (req.session && req.session.user) {
      return res.status(200).json({
        success: true,
        isAuthenticated: true,
        user: req.session.user
      });
    }
    
    res.status(200).json({
      success: true,
      isAuthenticated: false
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

  // API route to get all waitlist entries
  app.get("/api/waitlist", async (req, res) => {
    try {
      const entries = await storage.getWaitlistEntries();
      res.status(200).json(entries);
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

  // API route to get all email subscriptions
  app.get("/api/subscribe", async (req, res) => {
    try {
      const subscriptions = await storage.getEmailSubscriptions();
      res.status(200).json(subscriptions);
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
