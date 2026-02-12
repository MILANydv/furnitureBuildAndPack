# Vercel Deployment Guide

This guide will help you deploy this Next.js application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. A PostgreSQL database (recommended: [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres), [Supabase](https://supabase.com), or [Neon](https://neon.tech))

## Step 1: Prepare Your Database

1. Set up a PostgreSQL database:
   - **Vercel Postgres**: Available directly in Vercel dashboard
   - **Supabase**: Free tier available
   - **Neon**: Free tier available

2. Get your database connection string (DATABASE_URL)

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Configure environment variables (see Step 3)
5. Click "Deploy"

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## Step 3: Configure Environment Variables

In your Vercel project settings, add the following environment variables:

### Required Variables

- `DATABASE_URL` - Your PostgreSQL connection string
  ```
  postgresql://user:password@host:5432/database?schema=public
  ```

- `NEXTAUTH_URL` - Your app URL
  - Production: `https://your-domain.vercel.app`
  - Preview: `https://your-preview-url.vercel.app`

- `NEXTAUTH_SECRET` - A random secret key
  ```bash
  # Generate a secret:
  openssl rand -base64 32
  ```

### Optional Variables

- `NODE_ENV` - Set to `production` (automatically set by Vercel)

## Step 4: Run Database Migrations

After deployment, run your Prisma migrations:

```bash
# Using Vercel CLI
vercel env pull .env.local
npx prisma migrate deploy

# Or using Prisma Studio
npx prisma studio
```

Alternatively, you can use Vercel's Postgres integration which handles migrations automatically.

## Step 5: Verify Deployment

1. Visit your deployed URL
2. Check that pages load correctly
3. Test authentication flows
4. Verify database connections

## Troubleshooting

### Prisma Client Not Generated

If you see Prisma errors, ensure the `postinstall` script runs:
- Check build logs in Vercel dashboard
- Verify `package.json` has `"postinstall": "prisma generate"`

### Database Connection Issues

- Verify `DATABASE_URL` is set correctly
- Check database allows connections from Vercel IPs
- Ensure SSL is enabled (most cloud databases require this)

### Build Failures

- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility (Vercel uses Node 18+ by default)

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Prisma on Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
