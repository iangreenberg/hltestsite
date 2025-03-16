// This file serves as an entry point for Vercel serverless functions
// It forwards all requests to our main server application

import { createServer } from 'http';
import { app } from '../dist/index.js';

// Create HTTP server
const server = createServer(app);

// Listen on the port provided by Vercel
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`API server running on port ${port}`);
});

// Export for serverless use
export default app;