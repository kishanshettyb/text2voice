import useAudioStore from '@/store/audio'
import { Button } from './ui/button'
import { Loader2, Pause, Play } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

// const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY' // Replace with your actual API key

// Function to generate SSML format
function textToSsml(inputText: string) {
  // Replace special characters with HTML Ampersand Character Codes
  // These codes prevent the API from confusing text with SSML tags
  // For example, '<' --> '&lt;' and '&' --> '&amp;'
  let escapedText = inputText
  escapedText = escapedText.replace(/&/g, '&amp;')
  escapedText = escapedText.replace(/"/g, '&quot;')
  escapedText = escapedText.replace(/</g, '&lt;')
  escapedText = escapedText.replace(/>/g, '&gt;')

  // Convert plaintext to SSML
  // Tag SSML so that there is a 2-second pause between each address
  const expandedNewline = escapedText.replace(/\n/g, '\n<break time="2s"/>')
  const ssml = '<speak>' + expandedNewline + '</speak>'

  // Return the concatenated String of SSML
  console.log(ssml)
  return ssml
}

const PlayPauseButton = ({ voiceName, language }: { voiceName: string; language: string }) => {
  const { playingVoice, setPlayingVoice, audio, setAudio } = useAudioStore()
  const queryClient = useQueryClient()

  // Function to fetch audio with SSML support check
  const fetchAudio = async () => {
    const supportsSSML = voiceName.includes('Wavenet') || voiceName.includes('Neural2') // Basic check

    const requestBody = {
      input: supportsSSML
        ? {
            ssml: textToSsml(
              `Technology has revolutionized the way we connect, communicate, and share information, making the world more accessible and interconnected, transforming lives and businesses across the globe each day.`
            )
          }
        : { text: 'This is a sample text for testing plain text speech.' },
      voice: { name: voiceName, languageCode: language },
      audioConfig: { audioEncoding: 'MP3' }
    }

    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyC_jP66URZIuQqnMoAOY8k4nhbJJVrLWD0`,
      {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      }
    )

    if (!response.ok) throw new Error('Failed to generate speech')

    const data = await response.json()
    const audioBlob = new Blob([Uint8Array.from(atob(data.audioContent), (c) => c.charCodeAt(0))], {
      type: 'audio/mp3'
    })
    return URL.createObjectURL(audioBlob)
  }

  // Mutation for fetching audio
  const { mutate, isPending } = useMutation({
    mutationKey: ['voice', voiceName, language], // Cache based on voice & language
    mutationFn: fetchAudio,
    onSuccess: (audioUrl) => {
      // Stop and reset previous audio
      if (audio) {
        audio.pause()
        setPlayingVoice(null)
      }

      const newAudio = new Audio(audioUrl)
      setAudio(newAudio)
      setPlayingVoice(voiceName)
      newAudio.play()

      // When audio ends, reset state
      newAudio.onended = () => {
        setPlayingVoice(null)
        URL.revokeObjectURL(audioUrl)
      }

      // Cache the audio URL to avoid re-fetching
      queryClient.setQueryData(['voice', voiceName, language], audioUrl)
    }
  })

  // Play/Pause Logic
  const togglePlayPause = () => {
    if (playingVoice === voiceName && audio) {
      audio.pause()
      setPlayingVoice(null)
      return
    }

    // Check if audio is already cached
    const cachedAudioUrl = queryClient.getQueryData<string>(['voice', voiceName, language])
    if (cachedAudioUrl) {
      // Play cached audio
      if (audio) {
        audio.pause()
        setPlayingVoice(null)
      }
      const newAudio = new Audio(cachedAudioUrl)
      setAudio(newAudio)
      setPlayingVoice(voiceName)
      newAudio.play()

      newAudio.onended = () => {
        setPlayingVoice(null)
      }
    } else {
      mutate() // Fetch new audio if not cached
    }
  }

  return (
    <Button
      variant="ghost"
      className="shadow-2xl border"
      onClick={togglePlayPause}
      disabled={isPending} // Disable when loading
    >
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : playingVoice === voiceName ? (
        <Pause />
      ) : (
        <Play />
      )}
    </Button>
  )
}

export default PlayPauseButton
