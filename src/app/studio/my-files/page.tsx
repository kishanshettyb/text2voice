'use client'
import { columns } from '@/app/config/myFiles'
import { MyFilesDataTable } from '@/components/myFilesDataTable'
import { useGetAllUserTextToVoiceData } from '@/services/queries/voices'
import { useState } from 'react'
import Cookies from 'js-cookie'

export default function MyFilesPage() {
  const userId = Cookies.get('userId') ?? ''
  const [page] = useState(1)
  const { data = [], isLoading, error } = useGetAllUserTextToVoiceData(userId, page)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const transformedData = data.map((item) => {
    const voice = item.voices[0] // Assuming there's only one voice per item
    return {
      id: item.id,
      uid: item.uid,
      voice_name: voice?.voice_name,
      voice_speed: voice?.voice_speed,
      text: voice?.text,
      character_count: voice?.character_count
    }
  })

  return (
    <div className="container mx-auto p-4 border rounded-2xl">
      <MyFilesDataTable
        columns={columns}
        data={transformedData}
        exportData={true}
        exportDataName="MyFiles"
      />
    </div>
  )
}
