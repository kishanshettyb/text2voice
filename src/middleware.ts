import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value || ''

  console.log('Token:', token) // Debugging

  // If accessing /studio without a token, redirect to /auth
  if (req.nextUrl.pathname.startsWith('/studio') && !token) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  return NextResponse.next()
}

// Apply middleware to all /studio routes
export const config = {
  matcher: ['/studio', '/studio/:path*'] // Ensures /studio and all its subpaths are protected
}
