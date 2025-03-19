// Simplified API handler for Vercel serverless functions

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fs from 'fs/promises';
import path from 'path';

// Create a memory-based storage for this serverless function
const memStorage = {
  waitlist: [],
  emailSubscriptions: [],
  nextWaitlistId: 1,
  nextSubscriptionId: 1,
  
  async addToWaitlist(entry) {
    const id = this.nextWaitlistId++;
    const waitlistEntry = { ...entry, id, createdAt: new Date().toISOString() };
    this.waitlist.push(waitlistEntry);
    return waitlistEntry;
  },
  
  async getEmailSubscriptionByEmail(email) {
    return this.emailSubscriptions.find(sub => sub.email === email);
  },
  
  async addEmailSubscription(subscription) {
    const id = this.nextSubscriptionId++;
    const sub = { ...subscription, id, createdAt: new Date().toISOString() };
    this.emailSubscriptions.push(sub);
    return sub;
  },
  
  async getWaitlistEntries() {
    return this.waitlist;
  },
  
  async getEmailSubscriptions() {
    return this.emailSubscriptions;
  }
};

// Application file functions
async function getApplicationFiles() {
  try {
    const dirPath = path.join(process.cwd(), 'applicationInfo');
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (err) {
      console.log('Error creating or accessing applicationInfo directory:', err);
    }
    
    const files = await fs.readdir(dirPath);
    return files.filter(file => file.endsWith('.json'));
  } catch (error) {
    console.error('Error getting application files:', error);
    return [];
  }
}

async function readApplicationFile(filename) {
  try {
    const filePath = path.join(process.cwd(), 'applicationInfo', filename);
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading application file ${filename}:`, error);
    throw error;
  }
};

// Create Express app
const app = express();

// Handle CORS for both development and production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [/\.vercel\.app$/, /hemplaunch\.co$/, /hemplaunch\.com$/]
    : true,
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// Add middleware to log requests in development
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// API routes
app.get('/api', (req, res) => {
  res.json({ message: 'API is running' });
});

// Auth routes - updated to match our application's API structure
// User info endpoint
app.get('/api/user', (req, res) => {
  // Check both cookie and authorization header
  const authCookie = req.cookies && req.cookies.auth_token;
  const authHeader = req.headers.authorization;
  const token = authCookie || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null);
  
  if (token === 'admin-token') {
    // Return admin user info matching our schema
    res.json({
      id: 1,
      username: 'admin',
      isAdmin: true
    });
  } else if (token && token.startsWith('user-token-')) {
    // Extract username from token format 'user-token-username'
    const username = token.substring(11);
    // Return regular user info matching our schema
    res.json({
      id: 2,
      username,
      isAdmin: false
    });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple admin authentication
  if (username === 'admin' && password === 'admin123') {
    const authToken = 'admin-token';
    
    // Set cookie for maintaining session in Vercel environment
    res.cookie('auth_token', authToken, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    // Return user info matching our schema WITH the token
    // This is critical for our client-side code
    res.json({
      id: 1,
      username: 'admin',
      isAdmin: true,
      token: authToken // Important! Include token in the response
    });
    
    console.log('Login successful for admin, token provided in response');
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Register endpoint
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  
  // Only allow registration if username isn't admin
  if (username === 'admin') {
    return res.status(400).json({ message: "Username already exists" });
  }
  
  const authToken = `user-token-${username}`;
  
  // Set cookie for maintaining session in Vercel environment
  res.cookie('auth_token', authToken, { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
  
  // In a real app, you'd store the user in a database
  // Include the token in the response for client-side storage
  res.status(201).json({
    id: 2,
    username,
    isAdmin: false,
    token: authToken // Include token in the response
  });
  
  console.log('Registration successful for user, token provided in response');
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  // Clear auth cookie - use same options as when setting to ensure proper clearing
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// Waitlist submission
app.post('/api/waitlist', async (req, res) => {
  try {
    const entry = await memStorage.addToWaitlist(req.body);
    console.log('Added to waitlist:', entry);
    res.status(201).json(entry);
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    res.status(400).json({ error: error.message || 'Invalid request' });
  }
});

// Email subscription
app.post('/api/subscribe', async (req, res) => {
  try {
    const existing = await memStorage.getEmailSubscriptionByEmail(req.body.email);
    if (existing) {
      return res.status(200).json({ message: 'Already subscribed' });
    }
    const subscription = await memStorage.addEmailSubscription(req.body);
    console.log('Added subscription:', subscription);
    res.status(201).json(subscription);
  } catch (error) {
    console.error('Error adding subscription:', error);
    res.status(400).json({ error: error.message || 'Invalid request' });
  }
});

// Admin dashboard data endpoints (protected)
const checkAdminAuth = (req, res, next) => {
  // Check for auth token in cookies or Authorization header
  const authCookie = req.cookies && req.cookies.auth_token;
  const authHeader = req.headers.authorization;
  const token = authCookie || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null);
  
  console.log('Admin auth check - Token:', token);
  
  if (token === 'admin-token') {
    console.log('Admin auth check - Access granted');
    next();
  } else {
    console.log('Admin auth check - Access denied');
    res.status(401).json({ message: 'Forbidden: Admin privileges required' });
  }
};

app.get('/api/admin/waitlist', checkAdminAuth, async (req, res) => {
  try {
    const entries = await memStorage.getWaitlistEntries();
    res.json(entries);
  } catch (error) {
    console.error('Error getting waitlist entries:', error);
    res.status(500).json({ error: 'Failed to retrieve waitlist entries' });
  }
});

app.get('/api/admin/subscriptions', checkAdminAuth, async (req, res) => {
  try {
    const subscriptions = await memStorage.getEmailSubscriptions();
    res.json(subscriptions);
  } catch (error) {
    console.error('Error getting email subscriptions:', error);
    res.status(500).json({ error: 'Failed to retrieve email subscriptions' });
  }
});

// Admin test endpoint for authentication testing
app.get('/api/admin-test', checkAdminAuth, (req, res) => {
  res.json({
    message: 'You have admin access',
    timestamp: new Date().toISOString()
  });
});

// Additional Auth endpoints
app.post('/api/auth/register', (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  
  // Simple registration - in a real app, you'd check for existing users
  // and properly hash the password
  if (username && password) {
    res.json({
      success: true,
      user: {
        id: 2,
        username,
        firstName: firstName || '',
        lastName: lastName || '',
        role: 'user'
      },
      token: `user-token-${username}`
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Username and password are required'
    });
  }
});

// Applications endpoints for the admin dashboard
app.get('/api/applications', checkAdminAuth, async (req, res) => {
  try {
    console.log('GET /api/applications - Getting real application files');
    
    // Get the list of application files
    const files = await getApplicationFiles();
    
    // Format them for the response
    const applicationList = files.map(filename => {
      // Extract timestamp from filename if possible, otherwise use current time
      let timestamp;
      const timestampMatch = filename.match(/(\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2})/);
      if (timestampMatch) {
        timestamp = new Date(timestampMatch[0].replace(/-/g, ':')).getTime();
      } else {
        // If no timestamp in filename, try to extract numbers that might be a timestamp
        const numbersMatch = filename.match(/(\d+)/);
        timestamp = numbersMatch ? parseInt(numbersMatch[0]) : Date.now();
      }
      
      return {
        filename,
        path: `/applicationInfo/${filename}`,
        timestamp: timestamp.toString()
      };
    });
    
    // Sort by timestamp (newest first)
    applicationList.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp));
    
    res.json({
      success: true,
      data: applicationList
    });
  } catch (error) {
    console.error('Error getting applications:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve applications' });
  }
});

app.get('/api/applications/:filename', checkAdminAuth, async (req, res) => {
  try {
    const { filename } = req.params;
    console.log(`GET /api/applications/${filename} - Getting real file data`);
    
    // First, get the list of application files to check if the requested file exists
    const files = await getApplicationFiles();
    
    if (!files.includes(filename)) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application file not found' 
      });
    }
    
    // Read the requested file
    const fileContent = await readApplicationFile(filename);
    
    res.json({
      success: true,
      data: fileContent
    });
  } catch (error) {
    console.error(`Error getting application ${req.params.filename}:`, error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve application',
      error: error.message 
    });
  }
});

// Admin dashboard summary endpoint
app.get('/api/admin/dashboard', checkAdminAuth, async (req, res) => {
  try {
    console.log('GET /api/admin/dashboard - Getting real data');
    
    // Get real application counts
    const applicationFiles = await getApplicationFiles();
    
    // Get waitlist entries
    const waitlistEntries = await memStorage.getWaitlistEntries();
    
    // Get email subscriptions
    const emailSubscriptions = await memStorage.getEmailSubscriptions();
    
    // Create recent activity from real data
    const recentActivity = [];
    
    // Add application activity (from files)
    for (const file of applicationFiles.slice(0, 3)) {
      try {
        const content = await readApplicationFile(file);
        const data = JSON.parse(content);
        recentActivity.push({
          type: 'application',
          name: data.fullName || 'Unknown Applicant',
          date: new Date(file.match(/(\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2})/)?.[0].replace(/-/g, ':') || Date.now()).toISOString()
        });
      } catch (err) {
        console.error('Error parsing application file:', err);
      }
    }
    
    // Add waitlist entries to activity
    for (const entry of waitlistEntries.slice(0, 3)) {
      recentActivity.push({
        type: 'waitlist',
        name: `${entry.firstName} ${entry.lastName}`,
        date: new Date().toISOString() // Using current date as stored data doesn't have timestamps
      });
    }
    
    // Add subscriptions to activity
    for (const sub of emailSubscriptions.slice(0, 3)) {
      recentActivity.push({
        type: 'subscription',
        name: sub.email.split('@')[0], // Use part of email as name
        date: new Date().toISOString() // Using current date as stored data doesn't have timestamps
      });
    }
    
    // Sort by most recent first (although dates are approximate)
    recentActivity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Return the real data
    res.json({
      success: true,
      data: {
        applications: applicationFiles.length,
        waitlist: waitlistEntries.length,
        emailSubscriptions: emailSubscriptions.length,
        recentActivity: recentActivity.slice(0, 5) // Limit to 5 most recent activities
      }
    });
  } catch (error) {
    console.error('Error getting dashboard data:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve dashboard data' });
  }
});

// Health check endpoint
app.get('/api/healthcheck', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Vercel serverless function handler
export default function handler(req, res) {
  // Log the incoming request for debugging
  console.log(`${req.method} ${req.url}`);
  
  // Handle preflight requests for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Forward to Express
  return app(req, res);
}