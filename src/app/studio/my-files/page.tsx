'use client'
import { columns } from '@/app/config/myFiles'
import { MyFilesDataTable } from '@/components/myFilesDataTable'
import { useGetAllUserTextToVoiceData } from '@/services/queries/voices'
import Cookies from 'js-cookie'

export default function MyFilesPage() {
  const userId = Cookies.get('userId') ?? ''
  const { data: voiceData } = useGetAllUserTextToVoiceData(userId)
  const data = voiceData?.data?.data || []

  return (
    <div className="container p-4 mx-auto border rounded-2xl">
      <MyFilesDataTable columns={columns} data={data} />
    </div>
  )
}
