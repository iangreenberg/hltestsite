import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
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

// Function to create an admin user if one doesn't exist
export async function createAdminUserIfNotExists() {
  try {
    // Check if admin user already exists
    const adminUser = await storage.getUserByUsername("admin");
    if (!adminUser) {
      console.log("Creating admin user...");
      const hashedPassword = await hashPassword("admin123");
      await storage.createUser({
        username: "admin",
        password: hashedPassword,
        isAdmin: true
      });
      console.log("Admin user created successfully");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "hempLaunchSecretKey",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: { 
      secure: process.env.NODE_ENV === "production", 
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        
        // Compare passwords
        const isValid = await comparePasswords(password, user.password);
        if (!isValid) {
          return done(null, false, { message: "Incorrect password" });
        }
        
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: Error, user: SelectUser) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        
        // Generate JWT token for environments where cookies don't work
        // This is a simple implementation - in production, you'd want to use a proper JWT library
        const token = Buffer.from(JSON.stringify({
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin,
          exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        })).toString('base64');
        
        // Return both user data and token
        return res.status(200).json({
          ...userWithoutPassword,
          token
        });
      });
    })(req, res, next);
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Hash password
      const hashedPassword = await hashPassword(req.body.password);
      
      // Create user with hashed password
      const user = await storage.createUser({
        ...req.body,
        password: hashedPassword
      });

      // Log user in after registration
      req.login(user, (err) => {
        if (err) return next(err);
        
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        
        // Generate JWT token for environments where cookies don't work
        const token = Buffer.from(JSON.stringify({
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin,
          exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        })).toString('base64');
        
        // Return both user data and token
        res.status(201).json({
          ...userWithoutPassword,
          token
        });
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  });

  // Custom middleware to check for token-based authentication
  const tokenAuthMiddleware = async (req: any, res: any, next: any) => {
    // Skip if user is already authenticated via session
    if (req.isAuthenticated()) {
      return next();
    }
    
    // Check for Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // No token, proceed to next middleware
    }
    
    try {
      // Extract and verify token
      const token = authHeader.split(' ')[1];
      const decodedData = JSON.parse(Buffer.from(token, 'base64').toString());
      
      // Check token expiration
      if (decodedData.exp < Date.now()) {
        return next(); // Token expired, proceed to next middleware
      }
      
      // Get user from database
      const user = await storage.getUser(decodedData.id);
      if (!user) {
        return next(); // User not found, proceed to next middleware
      }
      
      // Set user in request object
      req.user = user;
      req.isTokenAuth = true; // Flag to indicate this is token auth, not session auth
      
      next();
    } catch (error) {
      // Invalid token format, proceed to next middleware
      next();
    }
  };
  
  // Apply token auth middleware to all routes
  app.use(tokenAuthMiddleware);
  
  app.get("/api/user", (req, res) => {
    // Check both session and token authentication
    if (!req.isAuthenticated() && !req.isTokenAuth) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    // Remove password from response
    const { password, ...userWithoutPassword } = req.user as SelectUser;
    res.json(userWithoutPassword);
  });
}