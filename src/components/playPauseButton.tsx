import useAudioStore from '@/store/audio'
import { Button } from './ui/button'
import { Pause, Play } from 'lucide-react'

const PlayPauseButton = ({ voiceName, language }: { voiceName: string; language: string }) => {
  const { playingVoice, setPlayingVoice, audio, setAudio } = useAudioStore()

  const togglePlayPause = async () => {
    if (playingVoice === voiceName && audio) {
      audio.pause()
      setPlayingVoice(null)
      return
    }

    try {
      if (audio) {
        audio.pause()
      }

      const response = await fetch('/api/new', {
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
      const newAudio = new Audio(audioUrl)

      setAudio(newAudio)
      setPlayingVoice(voiceName)
      newAudio.play()

      newAudio.onended = () => {
        setPlayingVoice(null)
        URL.revokeObjectURL(audioUrl)
      }
    } catch (error) {
      console.error('Error playing voice sample:', error)
    }
  }

  return (
    <Button variant="ghost" className="shadow-2xl border " onClick={togglePlayPause}>
      {playingVoice === voiceName ? <Pause /> : <Play />}
    </Button>
  )
}
export default PlayPauseButton
