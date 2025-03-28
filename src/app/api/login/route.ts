import { NextResponse } from 'next/server'
import axios from 'axios'
import Cookies from 'js-cookie'

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json()
    const response = await axios.post(`${process.env.NEXT_PUBLIC_LOGIN_URL}`, {
      identifier,
      password
    })
    const { jwt, user } = response.data
    if (!jwt) {
      return NextResponse.json({ error: 'Login failed' }, { status: 401 })
    }
    Cookies.set('token', jwt, {
      expires: 1,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax'
    })
    return NextResponse.json({ user, jwt })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}
