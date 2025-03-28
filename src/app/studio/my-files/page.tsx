'use client'
import { columns } from '@/app/config/myFiles'
import { MyFilesDataTable } from '@/components/myFilesDataTable'
import { useGetAllUserTextToVoiceData } from '@/services/queries/voices'
import { useState } from 'react'
import Cookies from 'js-cookie'

export default function MyFilesPage() {
  const userId = Cookies.get('userId')
  const [page] = useState(1)
  const { data = [], isLoading, error } = useGetAllUserTextToVoiceData(userId, page)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime() || 0
    const dateB = new Date(b.createdAt).getTime() || 0
    return dateB - dateA // Sort in descending order (newest first)
  })
  return (
    <div className="container mx-auto p-4 border rounded-2xl">
      <MyFilesDataTable
        columns={columns}
        data={sortedData}
        exportData={true}
        exportDataName="MyFiles"
      />
    </div>
  )
}
