#!/bin/bash

echo "🔧 Fixing local environment issues..."

# Clear caches
echo "Clearing caches..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf node_modules/.prisma

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found!"
    echo "Creating .env.local from template..."
    cat > .env.local << EOF
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"

# NextAuth - IMPORTANT: Change these values!
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="change-this-to-a-random-secret-minimum-32-characters"

# Node Environment
NODE_ENV="development"
EOF
    echo "✅ Created .env.local - Please update DATABASE_URL and NEXTAUTH_SECRET!"
else
    echo "✅ .env.local exists"
fi

# Reinstall dependencies
echo "Reinstalling dependencies..."
npm install

# Generate Prisma Client
echo "Generating Prisma Client..."
npm run db:generate

# Check database connection
echo "Testing database connection..."
if npx prisma db pull > /dev/null 2>&1; then
    echo "✅ Database connection successful"
    echo "Pushing database schema..."
    npm run db:push
else
    echo "⚠️  Database connection failed!"
    echo "Please check your DATABASE_URL in .env.local"
fi

echo ""
echo "✅ Done! Run 'npm run dev' to start."
echo ""
echo "If you still have issues:"
echo "1. Check .env.local has correct DATABASE_URL and NEXTAUTH_SECRET"
echo "2. Ensure your database is running"
echo "3. Check README.md for setup instructions"
