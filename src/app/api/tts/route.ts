import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import textToSpeech from '@google-cloud/text-to-speech'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const client = new textToSpeech.TextToSpeechClient()
// Parse the Google credentials from the environment variable
// const googleCredentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || '{}') as {
//   [key: string]: unknown
// } // Type the googleCredentials as an object

// const client = new textToSpeech.TextToSpeechClient({
//   credentials: googleCredentials
// })

export async function POST(req: Request) {
  try {
    // Await cookies before using it
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    // Check if token exists
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse the request JSON data
    const { text, voice = 'en-US-Wavenet-D', audioFormat = 'MP3', speed, userId } = await req.json()

    const value = speed
    const voiceSpeed = parseFloat(value)
    const characterCount = text.length
    console.log(characterCount)

    const user = userId
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    // Request for Google TTS API
    const request = {
      input: { text },
      voice: {
        languageCode: 'en-US',
        name: voice
      },
      audioConfig: {
        audioEncoding: audioFormat,
        speakingRate: voiceSpeed
      }
    }

    // Synthesize speech using Google Cloud Text-to-Speech
    const [response] = await client.synthesizeSpeech(request)

    if (!response.audioContent) {
      return NextResponse.json({ error: 'Failed to generate speech' }, { status: 500 })
    }

    // const audioBuffer = Buffer.from(response.audioContent, 'binary')
    const audioBuffer = Buffer.from(response.audioContent as Uint8Array)

    // Upload to Cloudinary
    const cloudinaryResponse = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'video',
            type: 'authenticated',
            folder: 'tts_audio'
          },
          (error, result) => (error ? reject(error) : resolve(result as { secure_url: string })) // Ensure correct type
        )
        .end(audioBuffer)
    })

    const audioUrl = cloudinaryResponse.secure_url
    console.log(audioUrl)
    console.log(token)

    // // Save TTS record in Strapi
    const strapiRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/voices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        data: {
          users_permissions_user: user,
          text: text,
          character_count: characterCount,
          voice_name: voice,
          voice_speed: speed,
          audio_format: audioFormat,
          audio_url: audioUrl
        }
      })
    })

    if (!strapiRes.ok) {
      throw new Error('Failed to save in Strapi')
    }

    const strapiData = await strapiRes.json()
    const documentId = strapiData?.data.documentId
    const audioText = strapiData?.data.text.slice(0, 30)

    return NextResponse.json({ documentId, token, audioText })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
