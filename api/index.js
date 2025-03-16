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

app.get('/api/auth/status', (req, res) => {
  res.json({ success: true, isAuthenticated: false });
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