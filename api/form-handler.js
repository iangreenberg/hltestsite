// Form handler for API requests
const fs = require('fs').promises;
const path = require('path');

// Set CORS headers helper
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Save application data to file
async function saveApplication(data) {
  try {
    // Create directory if it doesn't exist
    const dir = path.join(process.cwd(), 'applicationInfo');
    await fs.mkdir(dir, { recursive: true });
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const sanitizedName = (data.fullName || 'unnamed').toLowerCase().replace(/[^a-z0-9]/g, '-');
    const filename = `application_${timestamp}_${sanitizedName}.json`;
    
    // Add timestamp to data
    const appData = {
      ...data,
      submitted_at: new Date().toISOString()
    };
    
    // Write data to file
    const filePath = path.join(dir, filename);
    await fs.writeFile(filePath, JSON.stringify(appData, null, 2));
    
    return {
      success: true,
      filename,
      path: filePath
    };
  } catch (err) {
    console.error('Error saving application:', err);
    throw err;
  }
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
      message: 'Method not allowed, please use POST'
    });
  }
  
  try {
    // Parse form data (should already be JSON from fetch)
    const formData = req.body;
    
    // Basic validation
    if (!formData) {
      throw new Error('No form data received');
    }
    
    if (!formData.fullName || !formData.email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: fullName and email'
      });
    }
    
    // Save application
    const result = await saveApplication(formData);
    
    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      id: result.filename
    });
    
  } catch (error) {
    console.error('Form submission error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Error processing form submission',
      error: error.message
    });
  }
};