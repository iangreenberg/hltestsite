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

### Deployment Steps

1. Connect your GitHub repository to Vercel
2. Configure the following settings:
   - Build Command: `sh vercel-build.sh`
   - Output Directory: `dist`
   - Development Command: `npm run dev`
3. Add the following environment variables:
   - `NODE_ENV`: `production`
   - `SESSION_SECRET`: (generate a random string)

### Important Files for Deployment

- `vercel.json` - Main Vercel configuration for routing and headers
- `api/vercel.json` - API-specific Vercel configuration
- `api/index.js` - Main API endpoint implementation
- `vercel-build.sh` - Custom build script for Vercel
- `.vercelignore` - Files to ignore during deployment

### Cookie Authentication

This project uses secure cookies for authentication that are properly configured for:
- Local development environment
- Production Vercel environment with cross-domain support
- Token-based fallback via Authorization headers

Cookies are automatically adjusted based on the environment with proper security settings:
```javascript
{
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
}
```

## Authentication

The system supports both session-based auth (for local development) and token-based auth (for Vercel), using the same API endpoints:

- `/api/login` - Login endpoint
- `/api/register` - Registration endpoint
- `/api/logout` - Logout endpoint
- `/api/user` - Get current user

Default admin credentials:
- Username: admin
- Password: admin123