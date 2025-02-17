'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { VoiceCombobox } from '@/components/voiceComboBox'

function Page() {
  const [text, setText] = useState('')
  const [audioUrl, setAudioUrl] = useState('')

  const handleGenerateSpeech = async () => {
    const response = await fetch('../api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })

    const data = await response.json()
    if (data.audioUrl) {
      console.log(data.audioUrl)
      setAudioUrl(data.audioUrl)
    }
  }
  const [voices, setVoices] = useState([])
  const [voice, setVoice] = useState([])

  useEffect(() => {
    async function fetchVoices() {
      const response = await fetch('../api/voices')
      const data = await response.json()
      setVoices(data.voices || [])
    }
    fetchVoices()
  }, [])

  return (
    <div>
      <p>studio</p>
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">Enter</h1>
        <Textarea onChange={(e) => setText(e.target.value)} />
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleGenerateSpeech}
        >
          Submit
        </button>
        <VoiceCombobox voices={voices} selectedVoice={voice} setSelectedVoice={setVoice} />

        {audioUrl && (
          <div className="mt-4">
            <audio controls>
              <source src={audioUrl} type="audio/mp3" />
            </audio>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
