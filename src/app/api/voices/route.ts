import { NextResponse } from 'next/server'
import textToSpeech from '@google-cloud/text-to-speech'
// import { promises as fs } from "fs";

export async function GET() {
  try {
    // Initialize Google TTS Client
    const client = new textToSpeech.TextToSpeechClient()

    // Fetch available voices
    const [result] = await client.listVoices()

    return NextResponse.json({ voices: result.voices })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to fetch voices' }, { status: 500 })
  }
}
