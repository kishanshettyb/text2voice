'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Play, Pause, Download } from 'lucide-react'

const Mp3Player = ({ src, title }: { src: string; title: string }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100)
    }

    audio.addEventListener('timeupdate', updateProgress)
    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div>
      <h3 className="text-xs font-semibold line-clamp-1  pb-2">{title}</h3>
      <div className="w-full max-w-sm p-2 border rounded-2xl  bg-white">
        <div className="flex items-center justify-between gap-x-3">
          <div>
            <Button
              size="sm"
              onClick={togglePlay}
              variant="outline"
              className="rounded-full w-[35px] h-[35px] flex justify-center items-center"
            >
              {isPlaying ? <Pause size={12} /> : <Play size={18} />}
            </Button>
          </div>
          <div className="w-full">
            <Progress value={progress} className="h-2  w-100" />
          </div>
          <div className="flex items-center space-x-3">
            <a href={src} download className="ml-auto">
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full w-[35px] h-[35px] flex justify-center items-center"
              >
                <Download size={12} />
              </Button>
            </a>
          </div>
        </div>

        <audio ref={audioRef} src={src} />
      </div>
    </div>
  )
}

export default Mp3Player
