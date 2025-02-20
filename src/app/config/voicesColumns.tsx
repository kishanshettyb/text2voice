import { Button } from '@/components/ui/button'
import useAudioStore from '@/store/audio'
import { ColumnDef } from '@tanstack/react-table'
import { Pause, Play } from 'lucide-react'
import Image from 'next/image'

const PlayPauseButton = ({ voiceName, language }: { voiceName: string; language: string }) => {
  const { playingVoice, setPlayingVoice, audio, setAudio } = useAudioStore()

  const togglePlayPause = async () => {
    if (playingVoice === voiceName && audio) {
      // If the same voice is playing, pause it
      audio.pause()
      setPlayingVoice(null)
      return
    }

    try {
      if (audio) {
        audio.pause() // Pause currently playing audio if any
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

      // Stop audio when it ends
      newAudio.onended = () => {
        setPlayingVoice(null)
        URL.revokeObjectURL(audioUrl) // Clean up URL object
      }
    } catch (error) {
      console.error('Error playing voice sample:', error)
    }
  }

  return (
    <Button onClick={togglePlayPause} size="sm">
      {playingVoice === voiceName ? <Pause /> : <Play />}
    </Button>
  )
}
export type Voices = {
  name: string
  gender: string
  language: string
  accent: string
  flag: string
  languageraw: string
  paly: () => void
}

export const columns: ColumnDef<Voices>[] = [
  {
    header: 'Action',
    accessorKey: 'play',
    cell: ({ row }) => {
      return <PlayPauseButton voiceName={row.original.name} language={row.original.languageraw} />
    }
  },

  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'gender',
    header: 'Gender'
  },

  {
    accessorKey: 'flag',
    header: 'Flag',
    cell: ({ row }) =>
      row.original.accent !== 'XA' ? (
        <Image
          className="w-[30px] h-[30px] rounded-full"
          src={row.original.flag}
          alt={row.original.accent}
          width={30}
          height={30}
        />
      ) : (
        <></>
      )
  },
  {
    accessorKey: 'accent',
    header: 'Accent'
  },
  {
    accessorKey: 'language',
    header: 'Language'
  }
]
