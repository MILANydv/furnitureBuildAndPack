# Fix "Unexpected end of JSON input" Error

This error occurs when the database contains invalid JSON in the `images` or `dimensions` fields of products.

## Quick Fix

Run the fix script to clean up invalid JSON in your database:

```bash
npm run db:fix-json
```

This script will:
- Find all products with invalid JSON in `images` or `dimensions` fields
- Fix empty strings, null values, or malformed JSON
- Set `images` to `[]` (empty array) if invalid
- Set `dimensions` to `null` if invalid

## What Was Changed

1. **Homepage Query** (`app/page.tsx`):
   - Excluded JSON fields (`images`, `dimensions`) from the initial query
   - This prevents Prisma from trying to parse invalid JSON during queries
   - Only fetches the fields needed for display

2. **Safe JSON Parsing** (`lib/utils/json.ts`):
   - Utility functions to safely parse JSON
   - Handles empty strings, null values, and invalid JSON gracefully

3. **Fix Script** (`scripts/fix-invalid-json.ts`):
   - Script to clean up existing invalid JSON in the database
   - Can be run anytime to fix data issues

## Manual Fix (SQL)

If you prefer to fix it manually with SQL:

```sql
-- Fix empty or invalid images field
UPDATE products 
SET images = '[]'::jsonb 
WHERE images IS NULL 
   OR images::text = '' 
   OR images::text = 'null'
   OR images::text IS NULL;

-- Fix empty or invalid dimensions field  
UPDATE products 
SET dimensions = NULL 
WHERE dimensions IS NULL 
   OR dimensions::text = '' 
   OR dimensions::text = 'null'
   OR dimensions::text IS NULL;
```

## Prevention

To prevent this issue in the future:

1. Always use the `safeJsonParse` utility when parsing JSON from the database
2. Validate JSON before saving to the database
3. Use Prisma's `select` to exclude JSON fields if you don't need them
4. Set proper defaults in your schema (`@default("[]")` for arrays)

## Testing

After running the fix script, restart your dev server:

```bash
npm run dev
```

The homepage should now load without errors.
