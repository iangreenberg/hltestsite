// Simplified API handler for Vercel serverless functions

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

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
    // Return user info matching our schema
    res.json({
      id: 1,
      username: 'admin',
      isAdmin: true
    });
    
    // Set cookie for maintaining session in Vercel environment
    res.cookie('auth_token', 'admin-token', { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
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
  
  // In a real app, you'd store the user in a database
  res.status(201).json({
    id: 2,
    username,
    isAdmin: false
  });
  
  // Set cookie for maintaining session in Vercel environment
  res.cookie('auth_token', `user-token-${username}`, { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
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
  
  if (token === 'admin-token') {
    next();
  } else {
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