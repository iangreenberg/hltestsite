# Deploying the SEO System to thehemplaunch.com

This guide outlines the steps needed to deploy the SEO system with PostgreSQL database to the live site.

## Step 1: Set Up PostgreSQL Database in Production

The SEO system requires a PostgreSQL database. You should set up a PostgreSQL database in your production environment:

1. If you're using Vercel, add a PostgreSQL database through the Vercel dashboard or connect to an external provider like Neon, Supabase, or Railway.
2. Make sure to configure the `DATABASE_URL` environment variable in your Vercel project settings.

## Step 2: Deploy the Updated Code

1. Push the following files to your production GitHub repository:
   - `/shared/schema.ts` - Contains the updated database schema
   - `/server/storageSeo.ts` - Contains the SEO database operations
   - `/server/routes/seo.ts` - Contains the SEO API routes
   - `/server/routes.ts` - Includes the updated route registration
   - `/server/auth.ts` - Contains authentication configuration

2. After pushing the code, Vercel should automatically deploy the updates.

## Step 3: Run Database Migrations

Once the code is deployed, run the database migration to create the required tables:

1. Connect to your Vercel project using the Vercel CLI:
   ```
   vercel login
   vercel link
   ```

2. Run a one-time command to execute the migration:
   ```
   vercel --prod exec "npx drizzle-kit push"
   ```

## Step 4: Initialize SEO Data

Run the initialization script to create the initial SEO data:

```
vercel --prod exec "npx tsx scripts/init-seo-db.ts"
```

## Step 5: Verify Deployment

1. Check that the SEO dashboard loads at: https://www.thehemplaunch.com/admin/seo-dashboard
2. Verify the API endpoints are working by testing: https://www.thehemplaunch.com/api/seo/test

## Troubleshooting

If you encounter issues:

1. Check the Vercel deployment logs for errors
2. Verify that the DATABASE_URL environment variable is correctly set
3. Make sure your database is accessible from the Vercel environment
4. Check if the authentication middleware is properly configured

## Important Notes

- The temporary authentication bypass should be removed before production deployment
- Make sure to set up proper database backups for your production database
- Consider adding rate limiting to the SEO API endpoints to prevent abuse