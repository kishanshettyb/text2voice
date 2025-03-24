import { NextResponse } from 'next/server'
import axios from 'axios'
import { cookies } from 'next/headers' // ✅ Import cookies from next/headers

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

    // ✅ Set HTTP-only cookie correctly
    cookies().set('token', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}
