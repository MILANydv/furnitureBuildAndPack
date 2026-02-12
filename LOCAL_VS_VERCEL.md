# Local vs Vercel: Common Issues & Solutions

If your app works on Vercel but not locally, here are the most common causes and fixes:

## 1. Environment Variables Missing

**Issue:** Environment variables are set in Vercel but missing locally.

**Solution:**
Create a `.env.local` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"

# NextAuth - CRITICAL for local development
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-minimum-32-characters"

# Node Environment
NODE_ENV="development"
```

**Common mistake:** Using `NEXTAUTH_URL="http://localhost:3000/"` (trailing slash) - remove it!

## 2. Database Connection Issues

**Issue:** Database not accessible locally or connection string incorrect.

**Check:**
```bash
# Test database connection
npx prisma db pull
```

**Fix:**
- Verify `DATABASE_URL` is correct
- Ensure database is running locally
- Check if database allows local connections
- For PostgreSQL: ensure it's listening on `localhost:5432`

## 3. NextAuth Redirect Loops

**Issue:** `NEXTAUTH_URL` mismatch causes redirect loops.

**Symptoms:**
- `ERR_TOO_MANY_REDIRECTS` errors
- `/api/auth/session` or `/api/auth/providers` failing

**Fix:**
```bash
# In .env.local
NEXTAUTH_URL="http://localhost:3000"  # No trailing slash!
NEXTAUTH_SECRET="your-secret-here"    # Must be set
```

**Verify:**
- Check browser console for redirect errors
- Check Network tab to see redirect chain
- Ensure middleware isn't processing API routes (see middleware.ts)

## 4. Database Not Migrated

**Issue:** Database schema not set up locally.

**Fix:**
```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed
```

## 5. Port Conflicts

**Issue:** Port 3000 already in use.

**Fix:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

## 6. Build Cache Issues

**Issue:** Stale build cache causing issues.

**Fix:**
```bash
# Clear Next.js cache
rm -rf .next
rm -rf node_modules/.cache

# Clear Prisma cache
rm -rf node_modules/.prisma

# Rebuild
npm run build
```

## 7. Node Version Mismatch

**Issue:** Different Node.js versions locally vs Vercel.

**Check:**
```bash
node --version
```

**Fix:**
- Vercel uses Node 18+ by default
- Use `nvm` to match versions:
  ```bash
  nvm install 18
  nvm use 18
  ```

## 8. Middleware Redirect Loops

**Issue:** Middleware processing API routes.

**Check:** Look at `middleware.ts` - it should skip API routes:
```typescript
if (pathname.startsWith('/api')) {
  return NextResponse.next();
}
```

**Fix:** Ensure middleware excludes API routes (already fixed in current version)

## 9. Missing Dependencies

**Issue:** Dependencies not installed locally.

**Fix:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 10. Prisma Client Not Generated

**Issue:** Prisma Client not generated locally.

**Fix:**
```bash
npm run db:generate
# Or
npm run postinstall
```

## Quick Diagnostic Checklist

Run these commands to diagnose:

```bash
# 1. Check environment variables
cat .env.local | grep -E "DATABASE_URL|NEXTAUTH"

# 2. Test database connection
npx prisma db pull

# 3. Check if Prisma Client exists
ls node_modules/.prisma/client

# 4. Test build
npm run build

# 5. Check for port conflicts
lsof -i:3000
```

## Common Error Patterns

### "Cannot find module '@prisma/client'"
```bash
npm run db:generate
```

### "Unexpected end of JSON input"
```bash
npm run db:fix-json
```

### "ERR_TOO_MANY_REDIRECTS"
- Check `NEXTAUTH_URL` in `.env.local`
- Ensure middleware skips API routes
- Clear browser cache

### "Failed to connect to database"
- Verify `DATABASE_URL` is correct
- Check database is running
- Test connection: `npx prisma db pull`

## Quick Fix Script

Create a `fix-local.sh` script:

```bash
#!/bin/bash
echo "Fixing local environment..."

# Clear caches
rm -rf .next
rm -rf node_modules/.cache
rm -rf node_modules/.prisma

# Reinstall dependencies
npm install

# Generate Prisma Client
npm run db:generate

# Push database schema
npm run db:push

echo "Done! Run 'npm run dev' to start."
```

Make it executable:
```bash
chmod +x fix-local.sh
./fix-local.sh
```

## Still Not Working?

1. **Check Vercel logs** - Compare with local errors
2. **Check browser console** - Look for specific error messages
3. **Check terminal output** - Look for build/runtime errors
4. **Compare environment variables** - Vercel dashboard vs local `.env.local`
5. **Test API routes directly** - `curl http://localhost:3000/api/health`
