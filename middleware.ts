import { NextRequest, NextResponse } from 'next/server';

// Define protected routes
const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/settings'
];

// Define public routes
const PUBLIC_ROUTES = [
  '/login',
  '/signup',
  '/reset-password'
];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = req.cookies.get('session');

  // Check if the route is public
  if (PUBLIC_ROUTES.includes(path)) {
    return NextResponse.next();
  }

  // Redirect to login if no session exists for protected routes
  if (PROTECTED_ROUTES.some(route => path.startsWith(route))) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      // Verify the session token using a custom API route
      const response = await fetch(`${req.nextUrl.origin}/api/verify-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session: session.value })
      });

      if (!response.ok) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      return NextResponse.next();
    } catch (error) {
      // Error in session verification, redirect to login
      console.error('Session verification error:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Allow other routes to proceed
  return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    // Match all routes except static files and API routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};
