# Debugging Server Components Errors

If you're seeing the error:
```
Uncaught Error: An error occurred in the Server Components render. The specific message is omitted in production builds...
```

## Quick Diagnosis Steps

### 1. Check Database Connection

Visit the health check endpoint:
```
http://localhost:3000/api/health
```

This will show:
- Database connection status
- Error messages (in development)
- Environment information

### 2. Check Environment Variables

Ensure these are set:
```bash
DATABASE_URL="postgresql://user:password@host:5432/database"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Verify Database Setup

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate
```

### 4. Check Development vs Production

**Development Mode:**
- Error messages are shown in the UI
- Console logs show detailed errors
- Check browser console and terminal

**Production Mode:**
- Errors are hidden for security
- Check Vercel logs or server logs
- Use `/api/health` endpoint for diagnostics

## Common Issues & Solutions

### Issue 1: Database Not Connected

**Symptoms:**
- Error on homepage
- Empty product lists
- API routes return errors

**Solution:**
1. Verify `DATABASE_URL` is correct
2. Check database is accessible
3. Ensure database schema is migrated
4. Test connection: `npm run db:push`

### Issue 2: Prisma Client Not Generated

**Symptoms:**
- Import errors
- "Cannot find module '@prisma/client'"

**Solution:**
```bash
npm run db:generate
# Or
npm run postinstall
```

### Issue 3: Missing Environment Variables

**Symptoms:**
- Connection errors
- Authentication failures

**Solution:**
1. Copy `.env.example` to `.env`
2. Fill in all required variables
3. Restart development server

### Issue 4: Database Schema Not Migrated

**Symptoms:**
- "Table does not exist" errors
- Prisma query errors

**Solution:**
```bash
# Push schema (for development)
npm run db:push

# Or run migrations (for production)
npm run db:migrate
```

## Debugging in Development

The app now includes better error handling:

1. **Error Display**: Errors show in the UI with helpful messages
2. **Health Check**: `/api/health` endpoint for diagnostics
3. **Console Logs**: Check terminal for detailed error messages

## Debugging in Production (Vercel)

1. **Check Vercel Logs:**
   - Go to Vercel Dashboard
   - Click on your deployment
   - View "Functions" tab for server logs

2. **Use Health Endpoint:**
   ```
   https://your-app.vercel.app/api/health
   ```

3. **Check Environment Variables:**
   - Vercel Dashboard → Settings → Environment Variables
   - Ensure all variables are set

4. **Verify Database:**
   - Check database connection string
   - Ensure database allows connections from Vercel IPs
   - Verify SSL is enabled if required

## Getting More Details

To see the actual error message:

1. **Development:**
   - Check browser console
   - Check terminal where `npm run dev` is running
   - Errors are displayed in the UI

2. **Production:**
   - Check server logs (Vercel Functions tab)
   - Use `/api/health` endpoint
   - Temporarily set `NODE_ENV=development` to see errors (not recommended for production)

## Testing Database Connection

Run this in your terminal:
```bash
# Test Prisma connection
npx prisma db pull

# Or check connection
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.\$connect().then(() => console.log('Connected!')).catch(e => console.error('Error:', e));"
```

## Still Having Issues?

1. Check the error digest in the browser console
2. Look at the network tab for failed requests
3. Check server-side logs
4. Verify all dependencies are installed: `npm install`
5. Clear Next.js cache: `rm -rf .next`
