// Main API handler - redirects requests to appropriate endpoint handlers
const submitFormHandler = require('./submit-form');
const getApplicationsHandler = require('./get-applications');

// Utility functions
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// Simplified in-memory storage for testing and demo purposes
// This allows us to handle the form in memory if file system operations fail in Vercel
const inMemoryData = {
  // Waitlist entries
  waitlist: [],
  
  // Email subscriptions
  emailSubscriptions: [],
  
  // Form submissions (applications)
  applications: [],
  
  // Methods to interact with the data
  async addToWaitlist(entry) {
    const id = this.waitlist.length + 1;
    const waitlistEntry = { ...entry, id };
    this.waitlist.push(waitlistEntry);
    return waitlistEntry;
  },
  
  async getEmailSubscriptionByEmail(email) {
    return this.emailSubscriptions.find(sub => sub.email === email);
  },
  
  async addEmailSubscription(subscription) {
    const id = this.emailSubscriptions.length + 1;
    const emailSubscription = { ...subscription, id };
    this.emailSubscriptions.push(emailSubscription);
    return emailSubscription;
  },
  
  async getWaitlistEntries() {
    return this.waitlist;
  },
  
  async getEmailSubscriptions() {
    return this.emailSubscriptions;
  },
  
  // Add an application to memory (fallback if file system fails)
  async addApplication(data) {
    const id = Date.now().toString();
    const application = { ...data, id, submitted_at: new Date().toISOString() };
    this.applications.push(application);
    return application;
  },
  
  // Get all applications
  async getApplications() {
    return this.applications;
  }
};

// Mock file operations for fallback
async function getApplicationFiles() {
  try {
    // This is just a placeholder, file operations will be handled by submit-form.js
    return [];
  } catch (err) {
    console.error('Error getting application files:', err);
    return [];
  }
}

async function readApplicationFile(filename) {
  try {
    // This is just a placeholder, file operations will be handled by submit-form.js
    return '{}';
  } catch (err) {
    console.error(`Error reading application file ${filename}:`, err);
    return '{}';
  }
}

// Main handler function
module.exports = async function handler(req, res) {
  // Set CORS headers
  setCorsHeaders(res);
  
  // Handle OPTIONS requests for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Parse URL to determine request target
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname.split('/').filter(Boolean);
  
  // Log request details
  console.log(`API Request: ${req.method} ${url.pathname}`);
  
  try {
    // Route the request to the appropriate handler
    if (path[0] === 'submit-form') {
      // Form submission endpoint
      return await submitFormHandler(req, res);
    } else if (path[0] === 'get-applications') {
      // Get applications endpoint
      return await getApplicationsHandler(req, res);
    } else {
      // Handle unknown endpoints
      return res.status(404).json({
        success: false,
        message: 'API endpoint not found'
      });
    }
  } catch (error) {
    console.error('API error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};