import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma Client singleton for serverless environments (Vercel)
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Handle Prisma connection errors gracefully
if (typeof window === 'undefined') {
  // Only run on server-side
  prisma.$connect().catch((error) => {
    console.error('Prisma connection error:', error);
    if (process.env.NODE_ENV === 'development') {
      console.error('Make sure DATABASE_URL is set in your .env file');
      console.error('Run: npm run db:push or npm run db:migrate to set up the database');
    }
  });
}
