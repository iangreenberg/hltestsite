// This file serves as an entry point for Vercel serverless functions
// It forwards all requests to our Express application

import { app } from '../dist/index.js';

// For Vercel serverless functions, we need to export a handler
export default async function handler(req, res) {
  // This ensures the app object is properly initialized
  // before handling requests in a serverless environment
  try {
    // We're using the app as middleware for the serverless function
    return new Promise((resolve, reject) => {
      app(req, res, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  } catch (error) {
    console.error('Serverless function error:', error);
    res.status(500).send('Internal Server Error');
  }
}