import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware completely for API routes
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Only process admin and account routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/account')) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Check admin routes
    if (pathname.startsWith('/admin')) {
      if (!token || token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // Check account routes
    if (pathname.startsWith('/account')) {
      if (!token) {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/account/:path*',
  ],
};
