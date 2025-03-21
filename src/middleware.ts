import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value // Read JWT from cookie
  console.log(token)
  const protectedRoutes = ['/studio'] // Add protected pages
  const isProtected = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/auth', req.url)) // Redirect unauthorized users
  }

  return NextResponse.next() // Allow access if authenticated
}

// Apply middleware to specific routes
export const config = {
  matcher: ['/studio/:path*', '/profile/:path*'] // Protect multiple routes
}
