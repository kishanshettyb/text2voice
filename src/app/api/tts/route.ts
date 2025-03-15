import { NextResponse } from 'next/server'
import textToSpeech from '@google-cloud/text-to-speech'
import fs from 'fs'
import path from 'path'
import cloudinary from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const client = new textToSpeech.TextToSpeechClient()

export async function POST(req: Request) {
  try {
    const { text, voice = 'en-US-Wavenet-D', audioFormat = 'MP3', speed } = await req.json()
    const value = speed
    const voiceSpeed = parseFloat(value)
    const characterCount = text.length

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

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

    const [response] = await client.synthesizeSpeech(request)

    if (!response.audioContent) {
      console.log('error')
      return NextResponse.json({ error: 'Failed to generate speech' }, { status: 500 })
    }
    const audioBuffer = Buffer.from(response.audioContent, 'binary')
    // Save file temporarily (or upload to storage)
    const filePath = path.join('./tmp', `speech-${Date.now()}.mp3`)
    fs.writeFileSync(filePath, response.audioContent, 'binary')

    // save in cloudinary
    // Upload to Cloudinary
    const cloudinaryResponse = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream({ resource_type: 'video', folder: 'tts_audio' }, (error, result) =>
          error ? reject(error) : resolve(result)
        )
        .end(audioBuffer)
    })
    const audioUrl = cloudinaryResponse.secure_url

    const userId = 'pufpt61m03feyks5ck8adn31'

    // Save TTS record in Strapi
    const strapiRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/text-to-voice-generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`
      },
      body: JSON.stringify({
        data: {
          user: userId,
          text,
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

    return NextResponse.json({ audioUrl })
  } catch (error) {
    console.error('TTS Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
