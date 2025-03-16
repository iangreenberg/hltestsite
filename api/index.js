// Simplified API handler for Vercel serverless functions

import express from 'express';
import cors from 'cors';

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
app.use(cors());
app.use(express.json());

// API routes
app.get('/api', (req, res) => {
  res.json({ message: 'API is running' });
});

// Auth routes
app.get('/api/auth/status', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader === 'Bearer admin-token') {
    res.json({
      success: true,
      isAuthenticated: true,
      user: {
        id: 1,
        username: 'admin',
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User'
      }
    });
  } else {
    res.json({ success: true, isAuthenticated: false });
  }
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple admin authentication
  if (username === 'admin' && password === 'admin123') {
    res.json({
      success: true,
      user: {
        id: 1,
        username: 'admin',
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User'
      },
      token: 'admin-token' // This token should be used for API authorization
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
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
  // Simple auth check for admin API endpoints
  // In a real app, you'd use JWT or session-based auth
  const authHeader = req.headers.authorization;
  if (authHeader === 'Bearer admin-token') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
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