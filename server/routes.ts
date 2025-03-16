import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmailSubscriptionSchema, insertWaitlistSchema, loginSchema, insertUserSchema, User } from "@shared/schema";
import session from "express-session";
import crypto from 'crypto';

// Extend express-session with user property
declare module 'express-session' {
  interface SessionData {
    user: Omit<User, 'password'>;
  }
}

// In-memory token storage
const userTokens = new Map<string, { userId: number, expires: Date }>();

// Generate a token
function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Token authentication middleware
const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token && userTokens.has(token)) {
    const tokenData = userTokens.get(token)!;
    
    // Check if token is expired
    if (tokenData.expires < new Date()) {
      userTokens.delete(token);
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    
    // Token is valid, get the user
    const user = await storage.getUser(tokenData.userId);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      req.session.user = userWithoutPassword;
      return next();
    }
  }
  
  // Continue with session check if no token was provided
  if (req.session && req.session.user) {
    return next();
  }
  
  // If we reach here, the user is not authenticated
  return res.status(401).json({ success: false, message: "Unauthorized" });
};

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
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      const user = await storage.validateCredentials(username, password);
      
      if (user) {
        // Store user info in session but remove password
        const { password, ...userWithoutPassword } = user;
        req.session.user = userWithoutPassword;
        
        // Generate token
        const token = generateToken();
        
        // Store token with 1 hour expiration
        const expires = new Date();
        expires.setHours(expires.getHours() + 1);
        userTokens.set(token, { userId: user.id, expires });
        
        return res.status(200).json({
          success: true,
          message: "Login successful",
          user: userWithoutPassword,
          token
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
  
  app.post("/api/auth/logout", (req, res) => {
    // Check for token in authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token) {
      userTokens.delete(token);
    }
    
    // Also destroy the session
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
  
  // Registration endpoint
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Username already exists"
        });
      }
      
      // Create the user
      const newUser = await storage.createUser(validatedData);
      
      // Don't return the password
      const { password, ...userWithoutPassword } = newUser;
      
      // Set session
      req.session.user = userWithoutPassword;
      
      // Generate token
      const token = generateToken();
      
      // Store token with 1 hour expiration
      const expires = new Date();
      expires.setHours(expires.getHours() + 1);
      userTokens.set(token, { userId: newUser.id, expires });
      
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user: userWithoutPassword,
        token
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || "Invalid registration data"
      });
    }
  });
  
  // Auth status check
  app.get("/api/auth/status", authenticateToken, (req, res) => {
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

  // API route to get all waitlist entries (protected)
  app.get("/api/waitlist", authenticateToken, isAuthenticated, async (req, res) => {
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

  // API route to get all email subscriptions (protected)
  app.get("/api/subscribe", authenticateToken, isAuthenticated, async (req, res) => {
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
