/**
 * Script to fix invalid JSON in the database
 * Run with: npx tsx scripts/fix-invalid-json.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixInvalidJson() {
  console.log('Checking for invalid JSON in products...');

  try {
    // Get all products with raw query to avoid JSON parsing errors
    const products = await prisma.$queryRaw<Array<{
      id: string;
      images: string | null;
      dimensions: string | null;
    }>>`
      SELECT id, images, dimensions 
      FROM products
      WHERE images IS NOT NULL OR dimensions IS NOT NULL
    `;

    let fixed = 0;
    let errors = 0;

    for (const product of products) {
      try {
        const updates: any = {};

        // Fix images field
        if (product.images !== null && product.images !== undefined) {
          const imagesStr = String(product.images);
          if (imagesStr.trim() === '' || imagesStr === 'null' || imagesStr === 'undefined') {
            // Empty or invalid - set to empty array
            updates.images = [];
            fixed++;
          } else {
            try {
              // Try to parse - if it fails, we'll fix it
              JSON.parse(imagesStr);
            } catch {
              // Invalid JSON - set to empty array
              updates.images = [];
              fixed++;
            }
          }
        }

        // Fix dimensions field
        if (product.dimensions !== null && product.dimensions !== undefined) {
          const dimensionsStr = String(product.dimensions);
          if (dimensionsStr.trim() === '' || dimensionsStr === 'null' || dimensionsStr === 'undefined') {
            // Empty or invalid - set to null
            updates.dimensions = null;
            fixed++;
          } else {
            try {
              JSON.parse(dimensionsStr);
            } catch {
              // Invalid JSON - set to null
              updates.dimensions = null;
              fixed++;
            }
          }
        }

        // Update if needed
        if (Object.keys(updates).length > 0) {
          await prisma.product.update({
            where: { id: product.id },
            data: updates,
          });
          console.log(`Fixed product ${product.id}`);
        }
      } catch (error) {
        console.error(`Error fixing product ${product.id}:`, error);
        errors++;
      }
    }

    console.log(`\nFixed ${fixed} products with invalid JSON`);
    console.log(`Errors: ${errors}`);
  } catch (error) {
    console.error('Error running fix script:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixInvalidJson();
