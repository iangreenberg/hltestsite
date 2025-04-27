import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { createAdminUserIfNotExists } from "./auth";
import cors from "cors";
import session from "express-session";
import { storage } from "./storage";
import { initializeMailchimp } from "./mailchimp";
import { initializeDatabase } from "./db";

// Create the Express app
const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: true, // Allow all origins
  credentials: true // Allow cookies to be sent
}));

// Configure session BEFORE setting up auth
app.use(session({
  secret: process.env.SESSION_SECRET || "hempLaunchSecretKey",
  resave: false,
  saveUninitialized: false,
  store: storage.sessionStore,
  cookie: { 
    secure: process.env.NODE_ENV === "production", 
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware for API logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Setup server and routes
let server: any = null;

// Self-executing async function to set up the server
const setupServer = async () => {
  // Create admin user if it doesn't exist yet
  await createAdminUserIfNotExists();
  
  // Initialize external services
  initializeMailchimp();
  try {
    await initializeDatabase();
    log('Database initialized successfully');
  } catch (error) {
    log('Failed to initialize database: ' + (error instanceof Error ? error.message : String(error)));
  }
  
  // Create an explicit API router to handle API requests first
  const apiRouter = express.Router();
  
  // Set up static file serving based on environment first
  if (app.get("env") === "development") {
    // First, mount the API router so it's available at /api
    app.use('/api', apiRouter);
    
    // Now register the routes - specify the router without '/api' prefix
    // since we've already mounted it
    server = await registerRoutes(app, apiRouter);
    
    // Then set up Vite for the frontend (after API routes are registered)
    await setupVite(app, server);
  } else {
    // For production, register routes normally
    server = await registerRoutes(app);
    serveStatic(app);
  }

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // Only start the server if we're not in a serverless environment (like Vercel functions)
  if (process.env.NODE_ENV !== 'production' || process.env.STANDALONE_SERVER === 'true') {
    const port = process.env.PORT || 5000;
    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log(`serving on port ${port}`);
    });
  }
  
  return { app, server };
};

// Initialize server
setupServer();

// Export for serverless environments
export { app, server, setupServer };
