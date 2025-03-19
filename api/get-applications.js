// API route to retrieve application submissions
const fs = require('fs').promises;
const path = require('path');

// Simple CORS handler
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// Very simple authentication check - replace with proper auth in production
function isAuthorized(req) {
  // For simple demo purposes only - this is NOT secure
  // In production, use proper authentication like JWT or OAuth
  const authHeader = req.headers.authorization;
  const expectedToken = process.env.ADMIN_TOKEN || 'hemp-launch-demo-token';
  
  return authHeader === `Bearer ${expectedToken}`;
}

module.exports = async (req, res) => {
  // Set CORS headers for all responses
  setCorsHeaders(res);
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow GET method
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use GET to retrieve applications.'
    });
  }
  
  // Simple authorization check
  if (!isAuthorized(req)) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized. Please provide valid credentials.'
    });
  }
  
  try {
    // Define directory path
    const dirPath = path.join(process.cwd(), 'applicationInfo');
    
    // Check if directory exists
    try {
      await fs.access(dirPath);
    } catch (err) {
      // Return empty array if directory doesn't exist
      return res.status(200).json({
        success: true,
        applications: []
      });
    }
    
    // Get list of files in directory
    const files = await fs.readdir(dirPath);
    
    // Filter for JSON files
    const applicationFiles = files.filter(file => file.endsWith('.json'));
    
    // Read files and parse JSON content
    const applications = await Promise.all(
      applicationFiles.map(async (filename) => {
        const filePath = path.join(dirPath, filename);
        try {
          const content = await fs.readFile(filePath, 'utf8');
          const data = JSON.parse(content);
          return {
            ...data,
            filename
          };
        } catch (err) {
          console.error(`Error reading file ${filename}:`, err);
          return {
            filename,
            error: 'Could not read file'
          };
        }
      })
    );
    
    // Return applications sorted by date (newest first)
    const sortedApplications = applications.sort((a, b) => {
      const dateA = new Date(a.submitted_at || 0);
      const dateB = new Date(b.submitted_at || 0);
      return dateB - dateA;
    });
    
    return res.status(200).json({
      success: true,
      count: sortedApplications.length,
      applications: sortedApplications
    });
    
  } catch (error) {
    console.error('Error retrieving applications:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Server error while retrieving applications',
      error: error.message
    });
  }
};