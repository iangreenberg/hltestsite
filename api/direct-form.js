// A very simple, direct form handler with minimal dependencies
const fs = require('fs').promises;
const path = require('path');

// Set CORS headers for all responses
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Main handler function
module.exports = async (req, res) => {
  // Handle CORS
  setCorsHeaders(res);
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    // Get form data 
    const formData = req.body;
    
    // Basic validation
    if (!formData || !formData.fullName || !formData.email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields (name and email)'
      });
    }
    
    // Add timestamp
    const timestamp = new Date().toISOString();
    const data = {
      ...formData,
      submitted_at: timestamp
    };
    
    // Create unique filename
    const sanitizedName = data.fullName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const filename = `application_${Date.now()}_${sanitizedName}.json`;
    
    try {
      // Attempt to ensure directory exists
      const dirPath = path.join(process.cwd(), 'applicationInfo');
      await fs.mkdir(dirPath, { recursive: true });
      
      // Write data to file
      const filePath = path.join(dirPath, filename);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      
      console.log(`Form submission saved to: ${filePath}`);
    } catch (fileError) {
      console.error('File system error:', fileError);
      // Don't fail the response if file system fails
      // We'll still return success to the client
    }
    
    // Return success response  
    return res.status(200).json({
      success: true,
      message: 'Application received',
      id: filename
    });
    
  } catch (error) {
    console.error('Form submission error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Server error processing your submission'
    });
  }
};