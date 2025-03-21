import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const STRAPI_USER_URL = process.env.NEXT_PUBLIC_STRAPI_USER_URL!

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch user details from Strapi using the token
    const response = await axios.get(STRAPI_USER_URL, {
      headers: { Authorization: `Bearer ${token}` }
    })

    return NextResponse.json(response.data)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}
