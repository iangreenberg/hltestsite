import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express, Request, Response, NextFunction, Router } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

// Create a default admin user for testing purposes
export async function createAdminUserIfNotExists() {
  try {
    console.log("Creating admin user...");
    // Check if admin user already exists
    const adminUser = await storage.getUserByUsername("admin");
    
    if (!adminUser) {
      // Hash password for admin
      const hashedPassword = await hashPassword("admin");
      
      // Create admin user
      await storage.createUser({
        username: "admin",
        password: hashedPassword,
        isAdmin: true
      });
      
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

// Simplified authentication setup
export function setupAuth(app: Express, apiRouter?: Router) {
  // Session is now configured in index.ts BEFORE calling this function
  
  // Configure passport
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      console.log("Authenticating user:", username);
      const user = await storage.getUserByUsername(username);
      if (!user) {
        console.log("User not found");
        return done(null, false, { message: "Invalid credentials" });
      }
      
      const passwordMatch = await comparePasswords(password, user.password);
      if (!passwordMatch) {
        console.log("Password doesn't match");
        return done(null, false, { message: "Invalid credentials" });
      }
      
      console.log("Authentication successful for user:", username);
      return done(null, user);
    } catch (err) {
      console.error("Authentication error:", err);
      return done(err);
    }
  }));

  passport.serializeUser((user, done) => {
    console.log("Serializing user:", user.id);
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      console.log("Deserializing user:", id);
      const user = await storage.getUser(id);
      if (!user) {
        console.log("User not found during deserialization");
        return done(null, false);
      }
      done(null, user);
    } catch (err) {
      console.error("Deserialization error:", err);
      done(err);
    }
  });

  // Set up passport middleware (only on app, not router)
  app.set("trust proxy", 1);
  app.use(passport.initialize());
  app.use(passport.session());

  // Determine the route handler (either apiRouter or app)
  const router = apiRouter || app;

  // Login route
  router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err: Error | null, user: SelectUser | false) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: "Invalid credentials" });
      
      req.login(user, (err: Error | null) => {
        if (err) return next(err);
        
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        return res.status(200).json(userWithoutPassword);
      });
    })(req, res, next);
  });

  // Register route
  router.post("/register", async (req, res, next) => {
    try {
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Hash password and create user
      const hashedPassword = await hashPassword(req.body.password);
      const user = await storage.createUser({
        ...req.body,
        password: hashedPassword
      });

      // Log user in after registration
      req.login(user, (err: Error | null) => {
        if (err) return next(err);
        
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Logout route
  router.post("/logout", (req, res) => {
    req.logout((err: Error | null) => {
      if (err) return res.status(500).json({ message: "Failed to logout" });
      res.status(200).json({ message: "Logged out successfully" });
    });
  });

  // Get current user route
  router.get("/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    // Remove password from response
    const { password, ...userWithoutPassword } = req.user as SelectUser;
    res.json(userWithoutPassword);
  });
}