import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out' })
  res.cookies.set('token', '', { maxAge: 0 }) // Clear cookie
  res.cookies.set('userId', '', { maxAge: 0 }) // Clear cookie
  res.cookies.set('user', '', { maxAge: 0 }) // Clear cookie
  return res
}
