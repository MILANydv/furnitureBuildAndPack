# Vercel Deployment Checklist

Use this checklist to ensure your app is ready for Vercel deployment.

## Pre-Deployment

- [ ] Code is pushed to Git repository (GitHub/GitLab/Bitbucket)
- [ ] All environment variables documented in `.env.example` (if exists)
- [ ] Database schema is finalized
- [ ] All migrations are tested locally

## Vercel Setup

- [ ] Create Vercel account or login
- [ ] Connect repository to Vercel
- [ ] Set up PostgreSQL database (Vercel Postgres recommended)
- [ ] Configure environment variables:
  - [ ] `DATABASE_URL` - PostgreSQL connection string
  - [ ] `NEXTAUTH_URL` - Production URL
  - [ ] `NEXTAUTH_SECRET` - Secure random string

## Build Configuration

- [ ] `package.json` has `postinstall` script: `"postinstall": "prisma generate"`
- [ ] `package.json` build script includes Prisma: `"build": "prisma generate && next build"`
- [ ] `next.config.ts` is optimized for Vercel (no `distDir`, images enabled)
- [ ] `vercel.json` exists (optional but recommended)

## Database

- [ ] Database migrations are ready
- [ ] Connection string includes SSL parameters if required
- [ ] Database allows connections from Vercel IPs

## Post-Deployment

- [ ] Run database migrations: `npx prisma migrate deploy`
- [ ] Verify app loads correctly
- [ ] Test authentication flow
- [ ] Test database operations (create/read/update)
- [ ] Check build logs for any warnings
- [ ] Verify environment variables are set correctly

## Troubleshooting

If deployment fails:

1. **Check Build Logs**
   - Go to Vercel Dashboard → Your Project → Deployments → Click on failed deployment
   - Look for error messages

2. **Common Issues:**
   - **Prisma Client not generated**: Ensure `postinstall` script exists
   - **Database connection failed**: Verify `DATABASE_URL` is correct and database allows external connections
   - **Environment variables missing**: Check all required vars are set in Vercel dashboard
   - **Build timeout**: Optimize build process or upgrade Vercel plan

3. **Test Locally First:**
   ```bash
   # Pull Vercel environment variables
   vercel env pull .env.local
   
   # Test build locally
   npm run build
   
   # Test production server
   npm start
   ```

## Quick Deploy Command

```bash
# One-time setup
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```
