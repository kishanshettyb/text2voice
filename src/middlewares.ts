import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes
const protectedRoutes = ['/studio']

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value // Get token from cookies

  // If the user is trying to access a protected route but is not authenticated
  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  return NextResponse.next()
}

// Apply middleware to all routes
export const config = {
  matcher: ['/studio/:path*'] // Adjust based on your protected routes
}
