import { Button } from '@/components/ui/button'
import useAudioStore from '@/store/audio'
import { ColumnDef } from '@tanstack/react-table'
import { Pause, Play } from 'lucide-react'
import Image from 'next/image'
import { FormattedVoice } from '@/types/formattedVoice' // Import FormattedVoice

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
    <Button className="bg-zinc-950 shadow-2xl border border-zinc-800" onClick={togglePlayPause}>
      {playingVoice === voiceName ? <Pause /> : <Play />}
    </Button>
  )
}

export const columns: ColumnDef<FormattedVoice>[] = [
  {
    id: 'play',
    header: 'Action',
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
    id: 'flag',
    header: 'Flag',
    cell: ({ row }) =>
      row.original.accent !== 'XA' ? (
        <Image
          src={row.original.flag}
          alt={`${row.original.language} Flag`}
          width={30}
          height={20}
          className="rounded-full"
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
