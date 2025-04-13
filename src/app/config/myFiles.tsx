'use client'

import { Button } from '@/components/ui/button'
import { Download, Edit2 } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import moment from 'moment'
import Link from 'next/link'
import { ColumnDef } from '@tanstack/react-table'

type Voice = {
  id: number
  documentId: string
  text: string
  voice_name: string
  voice_speed: string
  audio_url: string
  audio_format: string
  character_count: number
  createdAt: string
  updatedAt: string
  publishedAt: string
  users_permissions_user: {
    id: number
    documentId: string
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
    publishedAt: string
    name?: string | null
    subscription: {
      id: number
      documentId: string
      start_date: string
      createdAt: string
      updatedAt: string
      publishedAt: string
      end_date: string
      subscription_status: string
      stripe_subscription_id: string
    }
  }
}

type DataItem = {
  id: number
  documentId: string
  title: string
  uid: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  voices: Voice[]
}

export const columns: ColumnDef<DataItem>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => <p>{moment(row.getValue('createdAt')).format('DD MMM YYYY HH:mm a')}</p>,
    enableSorting: true,
    enableResizing: true
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: (info) => info.getValue(),
    enableSorting: true,
    enableResizing: true
  },
  {
    accessorKey: 'voices.0.text',
    header: 'Text',
    cell: (info) => {
      const voices = info.row.original.voices
      return voices && voices.length > 0 ? (
        <Popover>
          <PopoverTrigger>
            <div className="w-[200px] p-2 border text-left border-slate-100 bg-slate-50 dark:bg-transparent ">
              <p className="line-clamp-1">{voices[0].text}</p>
            </div>
          </PopoverTrigger>
          <PopoverContent>{voices[0].text}</PopoverContent>
        </Popover>
      ) : (
        'N/A'
      )
    },
    enableSorting: true,
    enableResizing: true
  },
  {
    accessorKey: 'voices.0.character_count',
    header: 'Character Count',
    cell: (info) => {
      const voices = info.row.original.voices
      return voices && voices.length > 0 ? (
        <p className="line-clamp-1">{voices[0].character_count}</p>
      ) : (
        'N/A'
      )
    },
    enableSorting: true,
    enableResizing: true
  },
  {
    accessorKey: 'voices.0.voice_speed',
    header: 'Voice Speed',
    cell: (info) => {
      const voices = info.row.original.voices
      return voices && voices.length > 0 ? (
        <p className="line-clamp-1">{voices[0].voice_speed}</p>
      ) : (
        'N/A'
      )
    },
    enableSorting: true,
    enableResizing: true
  },
  {
    accessorKey: 'voices.0.voice_name',
    header: 'Voice Name',
    cell: (info) => {
      const voices = info.row.original.voices
      return voices && voices.length > 0 ? voices[0].voice_name : 'N/A'
    },
    enableSorting: true,
    enableResizing: true
  },

  {
    accessorKey: 'uid',
    header: 'Action',
    cell: ({ row }) => (
      <div>
        <Button asChild variant="outline">
          <Link href={`/studio/text-to-speech/${row.getValue('uid')}?edit=true`}>
            <Edit2 />
          </Link>
        </Button>
      </div>
    )
  },
  {
    accessorKey: 'voices.0.audio_url',
    header: 'Download',
    cell: (info) => {
      const voices = info.row.original.voices
      const voicefile = info.row.original.voices[0].audio_url
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

      return voices && voices.length > 0 ? (
        <Button onClick={() => downloadFile(voicefile)} variant="outline">
          <Download />
        </Button>
      ) : (
        'N/A'
      )
    }
    // cell: ({ row }) => (
    //   <div className="flex gap-x-2">
    //     <Button variant="outline">
    //       <Link
    //         href={row.getValue('voices.0.audio_url')}
    //         download={row.getValue('voices.0.audio_url')}
    //       >
    //         <Download />
    //       </Link>
    //     </Button>
    //     <Link
    //       href={row.getValue('voices.0.audio_url')}
    //       download={row.getValue('voices.0.audio_url')}
    //     >
    //       <Download />
    //     </Link>
    //   </div>
    // )
  }
]
