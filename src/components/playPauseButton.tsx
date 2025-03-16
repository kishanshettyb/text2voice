import useAudioStore from '@/store/audio'
import { Button } from './ui/button'
import { Loader2, Pause, Play } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const PlayPauseButton = ({ voiceName, language }: { voiceName: string; language: string }) => {
  const { playingVoice, setPlayingVoice, audio, setAudio } = useAudioStore()
  const queryClient = useQueryClient()

  // Mutation for fetching audio
  const { mutate, isPending } = useMutation({
    mutationKey: ['voice', voiceName, language], // Cache based on voice & language
    mutationFn: async () => {
      const response = await fetch('../api/new', {
        method: 'POST',
        body: JSON.stringify({
          text: 'Hello, this is a sample voice test.',
          voice: voiceName,
          language: language
        }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (!response.ok) throw new Error('Failed to generate speech')

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      return audioUrl
    },
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
