// Simple standalone API route for form submissions
// This will work in Vercel without complex integrations

const fs = require('fs').promises;
const path = require('path');

// Helper function to ensure directory exists
async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    // Ignore error if directory already exists
    if (err.code !== 'EEXIST') throw err;
  }
}

// Simple CORS handler
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Main handler function
module.exports = async (req, res) => {
  // Set CORS headers for all responses
  setCorsHeaders(res);
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use POST to submit forms.'
    });
  }
  
  try {
    // Get form data from request body
    const formData = req.body;
    
    // Basic validation
    if (!formData || !formData.fullName || !formData.email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: fullName and email are required'
      });
    }
    
    // Add timestamp to form data
    const timestamp = new Date().toISOString();
    const data = {
      ...formData,
      submitted_at: timestamp
    };
    
    // Create a unique filename
    const sanitizedName = data.fullName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const filename = `application_${Date.now()}_${sanitizedName}.json`;
    
    // Make sure directory exists
    const dirPath = path.join(process.cwd(), 'applicationInfo');
    await ensureDir(dirPath);
    
    // Write form data to file
    const filePath = path.join(dirPath, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    
    console.log(`Form submission saved to ${filePath}`);
    
    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      timestamp,
      id: filename
    });
    
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Server error processing your submission',
      error: error.message
    });
  }
};