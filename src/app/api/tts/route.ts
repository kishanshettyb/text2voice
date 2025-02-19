import { NextResponse } from 'next/server'
import textToSpeech from '@google-cloud/text-to-speech'
import fs from 'fs'
import path from 'path'

const client = new textToSpeech.TextToSpeechClient()

export async function POST(req: Request) {
  try {
    const { text, voice = 'en-US-Wavenet-D', audioFormat = 'MP3', speed } = await req.json()
    const value = speed
    const voiceSpeed = parseFloat(value)

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

    // Save file temporarily (or upload to storage)
    const filePath = path.join('./tmp', `speech-${Date.now()}.mp3`)
    fs.writeFileSync(filePath, response.audioContent, 'binary')

    return NextResponse.json({ audioUrl: filePath })
  } catch (error) {
    console.error('TTS Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
