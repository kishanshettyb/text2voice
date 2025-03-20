'use client'
import { columns } from '@/app/config/myFiles'
import { MyFilesDataTable } from '@/components/myFilesDataTable'
import { useGetAllUserTextToVoiceData } from '@/services/queries/voices'

export default function MyFilesPage() {
  const userId = 'nsf2kn65hohydco68sn0i1x1'
  const userTextToVoiceData = useGetAllUserTextToVoiceData(userId)
  return (
    <div className="container mx-auto p-4 border rounded-2xl">
      <MyFilesDataTable
        columns={columns}
        data={userTextToVoiceData?.data?.data?.data}
        exportData={true}
        exportDataName="MyFiles"
      />
    </div>
  )
}
