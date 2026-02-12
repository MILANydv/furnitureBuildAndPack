import { prisma } from './client';

/**
 * Check if database connection is working
 * Useful for debugging connection issues
 */
export async function checkDatabaseConnection(): Promise<{
  connected: boolean;
  error?: string;
}> {
  try {
    await prisma.$connect();
    // Try a simple query
    await prisma.$queryRaw`SELECT 1`;
    return { connected: true };
  } catch (error: any) {
    return {
      connected: false,
      error: error.message || 'Unknown database error',
    };
  }
}
