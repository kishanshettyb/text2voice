import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const isAuthRoute = req.nextUrl.pathname.startsWith('/studio')

  if (!token && isAuthRoute) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/studio/:path*'] // Protect all studio routes
}
