'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Play, Pause, Download } from 'lucide-react'
import { useGetUserVoicesByUid } from '@/services/queries/voices'
import { useParams } from 'next/navigation'
import moment from 'moment'
const Mp3Player = ({ src }: { src: string }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { uid } = useParams()
  const userUid = Array.isArray(uid) ? uid[0] : uid || ''
  const { data: getUserCreatedVoicebypageId } = useGetUserVoicesByUid(userUid)

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

  const downloadFile = (src: string) => {
    const getFileNameFromUrl = (url: string): string => {
      const parsedUrl = new URL(url) // Parse the URL
      const pathSegments = parsedUrl.pathname.split('/') // Split the path by "/"
      return pathSegments[pathSegments.length - 1] // Get the last segment (the file name)
    }

    // Fetch the file
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch the file')
        }
        return response.blob() // Convert response to blob
      })
      .then((blob) => {
        // Create an object URL for the blob
        const fileURL = window.URL.createObjectURL(blob)

        // Create a link element and trigger the download
        const alink = document.createElement('a')
        alink.href = fileURL
        alink.download = getFileNameFromUrl(src) // Set the file name from URL
        alink.click() // Trigger the download

        // Clean up the object URL after download
        window.URL.revokeObjectURL(fileURL)
      })
      .catch((error) => {
        console.error('Download failed:', error)
      })
  }

  return (
    <div>
      {getUserCreatedVoicebypageId?.data?.data?.map(
        (item: { id: string; title: string; createdAt: string }) => (
          <div key={item.id} className="mb-5">
            <div className="flex flex-1 pb-2 justify-between items-center">
              <div className="w-1/2 ">
                <p className="text-xs font-semibold line-clamp-1">{item.title}</p>
              </div>
              <div>
                <p className="text-[10px] line-clamp-1">
                  {moment(item.createdAt).format(' DD-MM hh:mm:ss A ')}
                </p>
              </div>
            </div>
            <div className="w-full max-w-sm p-2 border rounded-2xl  bg-white dark:bg-zinc-950 dark:border-zinc-800">
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
                  <Button
                    onClick={() => downloadFile(src)}
                    size="sm"
                    variant="secondary"
                    className="rounded-full w-[35px] h-[35px] flex justify-center items-center"
                  >
                    <Download size={12} />
                  </Button>
                  {/* </a> */}
                </div>
              </div>

              {/* <audio ref={audioRef} src={src} /> */}
              {src ? <audio ref={audioRef} src={src} /> : null}
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default Mp3Player
