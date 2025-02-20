import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { text, voice, language } = await req.json()

    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyC_jP66URZIuQqnMoAOY8k4nhbJJVrLWD0`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode: language,
            name: voice
          },
          audioConfig: { audioEncoding: 'MP3' }
        })
      }
    )

    if (!response.ok) throw new Error('Failed to generate speech')

    const { audioContent } = await response.json()
    const buffer = Buffer.from(audioContent, 'base64')

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg'
      }
    })
  } catch {
    return NextResponse.json({ error: 'Error generating text-to-speech' }, { status: 500 })
  }
}
