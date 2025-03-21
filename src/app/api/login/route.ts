import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json()

    // Send login request to Strapi
    const response = await axios.post(`${process.env.NEXT_PUBLIC_LOGIN_URL}`, {
      identifier: identifier,
      password: password
    })

    const { jwt, user } = response.data

    if (!jwt) {
      return NextResponse.json({ error: 'Login failed' }, { status: 401 })
    }

    // Set HTTP-only cookie
    const res = NextResponse.json({ user })
    res.cookies.set({
      name: 'token',
      value: jwt,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 24 // 1 day
    })

    return res
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}
