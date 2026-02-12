# Quick Fix: Local Development Issues

## Most Common Issues (90% of cases)

### 1. Missing `.env.local` file

**Create `.env.local` in project root:**
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-min-32-chars"
```

### 2. Wrong `NEXTAUTH_URL`

**❌ Wrong:**
```
NEXTAUTH_URL="http://localhost:3000/"  # Trailing slash causes redirects!
```

**✅ Correct:**
```
NEXTAUTH_URL="http://localhost:3000"   # No trailing slash
```

### 3. Database not connected

**Test connection:**
```bash
npx prisma db pull
```

**If fails:**
- Check `DATABASE_URL` is correct
- Ensure database is running
- Run: `npm run db:push`

### 4. Prisma Client not generated

**Fix:**
```bash
npm run db:generate
```

### 5. Redirect loops (ERR_TOO_MANY_REDIRECTS)

**Causes:**
- Wrong `NEXTAUTH_URL` (trailing slash)
- Middleware processing API routes
- Missing `NEXTAUTH_SECRET`

**Fix:**
1. Check `.env.local` has correct `NEXTAUTH_URL` (no trailing slash)
2. Ensure `NEXTAUTH_SECRET` is set
3. Clear browser cache
4. Restart dev server

## One-Command Fix

Run this to fix most issues:

```bash
./fix-local.sh
```

Or manually:

```bash
# 1. Clear caches
rm -rf .next node_modules/.cache node_modules/.prisma

# 2. Reinstall
npm install

# 3. Generate Prisma Client
npm run db:generate

# 4. Setup database
npm run db:push

# 5. Start dev server
npm run dev
```

## Verify Setup

After fixing, verify:

```bash
# 1. Check environment variables
cat .env.local

# 2. Test database
npx prisma db pull

# 3. Test build
npm run build

# 4. Start dev server
npm run dev
```

Then visit: http://localhost:3000/api/health

## Still Broken?

Check:
1. ✅ `.env.local` exists and has all variables
2. ✅ `NEXTAUTH_URL` has NO trailing slash
3. ✅ `NEXTAUTH_SECRET` is set (min 32 chars)
4. ✅ Database is running and accessible
5. ✅ Port 3000 is not in use
6. ✅ Node version is 18+ (`node --version`)
