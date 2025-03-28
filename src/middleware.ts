import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token') // Use server-side cookie access
  const isAuthRoute = req.nextUrl.pathname.startsWith('/studio')

  if (!token && isAuthRoute) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/studio/:path*'] // Protect all studio routes
}
