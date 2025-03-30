import React from 'react'
import { FileUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import * as XLSX from 'xlsx'

type ExportDataProps<T> = {
  data: T[]
  fileName?: string
}
function ExportData<T>({ data, fileName }: ExportDataProps<T>) {
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          const datas = data?.length ? data : []
          const worksheet = XLSX.utils.json_to_sheet(datas)
          const workbook = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
          XLSX.writeFile(workbook, fileName ? `${fileName}.xlsx` : 'report.xlsx')
        }}
      >
        <FileUp className="w-4 h-4 " />
        Export
      </Button>
    </>
  )
}

export default ExportData
