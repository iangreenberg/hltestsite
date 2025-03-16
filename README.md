# Hemp Launch Website

A modern, responsive website for a hemp-derived THC business services company, featuring lead qualification, service information, and authentication.

## Project Structure

- `/client` - React frontend
- `/server` - Express backend (for local development)
- `/api` - Serverless API endpoints (for Vercel deployment)
- `/shared` - Shared types and schemas

## Development

```bash
# Start development server
npm run dev
```

## Deployment to Vercel

This project is configured for deployment to Vercel with the following setup:

1. The frontend is built using Vite and served as static files
2. The API is implemented as serverless functions
3. Authentication works in both environments with session and token-based auth

### Important Files for Deployment

- `vercel.json` - Vercel configuration
- `api/index.js` - Main API endpoint for Vercel
- `build.sh` - Build script for frontend
- `vercel-package.json` - Package file for Vercel build

## Authentication

The system supports both session-based auth (for local development) and token-based auth (for Vercel), using the same API endpoints:

- `/api/login` - Login endpoint
- `/api/register` - Registration endpoint
- `/api/logout` - Logout endpoint
- `/api/user` - Get current user

Default admin credentials:
- Username: admin
- Password: admin123