// Standalone form handler that handles form submissions without relying on Express
// This is a direct Vercel serverless function to capture form data

const fs = require('fs').promises;
const path = require('path');

// Set CORS headers for all responses
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
}

// Save application to file
async function saveApplication(data) {
  try {
    // Validate data
    if (!data || !data.fullName || !data.email) {
      return { 
        success: false, 
        message: 'Name and email are required fields' 
      };
    }

    // Create filename with timestamp
    const timestamp = Date.now();
    const sanitizedName = (data.fullName || 'anonymous')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_');
    const filename = `application_${timestamp}_${sanitizedName}.json`;
    
    // Create directory if it doesn't exist
    const dirPath = path.join(process.cwd(), 'applicationInfo');
    await fs.mkdir(dirPath, { recursive: true });
    
    // Write the file
    const filePath = path.join(dirPath, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    
    return { 
      success: true, 
      message: 'Application submitted successfully',
      filename,
      timestamp
    };
  } catch (error) {
    console.error('Error saving application:', error);
    return { 
      success: false, 
      message: `Error saving application: ${error.message}` 
    };
  }
}

module.exports = async (req, res) => {
  // Set CORS headers for all responses
  setCorsHeaders(res);
  res.setHeader('Content-Type', 'application/json');
  
  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Handle POST request
  if (req.method === 'POST') {
    try {
      // Parse the request body
      const data = req.body;
      
      // Save the application
      const result = await saveApplication(data);
      
      // Return the response
      if (result.success) {
        return res.status(201).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      console.error('Error handling form submission:', error);
      return res.status(500).json({ 
        success: false, 
        message: `Server error: ${error.message}` 
      });
    }
  }
  
  // Handle other request methods
  return res.status(405).json({ 
    success: false, 
    message: `Method ${req.method} not allowed` 
  });
};