import { NextResponse } from 'next/server';
import { checkDatabaseConnection } from '@/lib/prisma/check-connection';

/**
 * Health check endpoint to verify database connection
 * Useful for debugging deployment issues
 */
export async function GET() {
  try {
    const dbCheck = await checkDatabaseConnection();
    
    return NextResponse.json({
      status: 'ok',
      database: dbCheck.connected ? 'connected' : 'disconnected',
      error: dbCheck.error,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
