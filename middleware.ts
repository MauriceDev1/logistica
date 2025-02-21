import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from './lib/supabase/server'

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Initialize Supabase client
  const supabase = await createClient()

  // Update session
  await updateSession(request)

  // Get current user session
  const { data: { session } } = await supabase.auth.getSession()

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/profile'] // Add more as needed

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route =>
    path.startsWith(route) || path === route
  )

  // If accessing a protected route and no session exists, redirect to login
  if (isProtectedRoute && !session) {
    // Create URL for login page
    const redirectUrl = new URL('/login', request.url)
    // Add the original URL as a "from" parameter
    redirectUrl.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If user is authenticated and tries to access login page, redirect to dashboard
  if (session && path === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
