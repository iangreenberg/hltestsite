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
app.get('/api/applications', checkAdminAuth, (req, res) => {
  try {
    console.log('GET /api/applications - Mock data for Vercel deployment');
    // Return sample application files data
    // This is just a mock implementation for the Vercel deployment
    res.json({
      success: true,
      data: [
        {
          filename: 'application_1710876543210.json',
          path: '/applicationInfo/application_1710876543210.json',
          timestamp: '1710876543210'
        },
        {
          filename: 'application_1710976543210.json',
          path: '/applicationInfo/application_1710976543210.json',
          timestamp: '1710976543210'
        }
      ]
    });
  } catch (error) {
    console.error('Error getting applications:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve applications' });
  }
});

app.get('/api/applications/:filename', checkAdminAuth, (req, res) => {
  try {
    const { filename } = req.params;
    console.log(`GET /api/applications/${filename} - Mock data for Vercel deployment`);
    
    // Return sample application data depending on the filename
    // This is just a mock implementation for the Vercel deployment
    if (filename === 'application_1710876543210.json') {
      res.json({
        success: true,
        data: JSON.stringify({
          fullName: "John Smith",
          email: "john@example.com",
          phone: "512-555-1234",
          businessName: "Green Gardens Hemp",
          cityState: "Austin, TX",
          businessSituation: "new",
          packageInterest: "starter",
          businessBasics: "partial",
          timeframe: "within30",
          submitDate: "2023-03-20T14:22:23.210Z"
        })
      });
    } else if (filename === 'application_1710976543210.json') {
      res.json({
        success: true,
        data: JSON.stringify({
          fullName: "Sarah Johnson",
          email: "sarah@example.com",
          phone: "214-555-9876",
          businessName: "Texas Hemp Solutions",
          cityState: "Dallas, TX",
          businessSituation: "existing",
          packageInterest: "growth",
          businessBasics: "complete",
          timeframe: "immediate",
          submitDate: "2023-03-21T17:42:23.210Z"
        })
      });
    } else {
      res.status(404).json({ success: false, message: 'Application file not found' });
    }
  } catch (error) {
    console.error(`Error getting application ${req.params.filename}:`, error);
    res.status(500).json({ success: false, message: 'Failed to retrieve application' });
  }
});

// Admin dashboard summary endpoint
app.get('/api/admin/dashboard', checkAdminAuth, (req, res) => {
  try {
    console.log('GET /api/admin/dashboard - Mock data for Vercel deployment');
    // Return sample dashboard summary data
    res.json({
      success: true,
      data: {
        applications: 2,
        waitlist: 12,
        emailSubscriptions: 27,
        recentActivity: [
          { type: 'application', name: 'Sarah Johnson', date: '2023-03-21T17:42:23.210Z' },
          { type: 'waitlist', name: 'Michael Davis', date: '2023-03-19T09:12:43.801Z' },
          { type: 'subscription', name: 'Jessica White', date: '2023-03-18T14:33:21.432Z' }
        ]
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