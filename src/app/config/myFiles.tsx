'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { Download, Edit2 } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import moment from 'moment'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/DataTableColumnHeader'
import Link from 'next/link'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  character_count: string
  voice_name: string
  voice_speed: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },

  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created Date" />,
    cell: ({ row }) => <p>{moment(row.getValue('createdAt')).format('DD MMM YYYY HH:mm a')}</p>,
    enableSorting: true
  },

  {
    accessorKey: 'character_count',
    header: 'Character Count'
  },
  {
    accessorKey: 'voice_speed',
    header: 'Voice Speed'
  },
  {
    accessorKey: 'text',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Text" />,
    enableSorting: true,
    cell: ({ row }) => (
      <Popover>
        <PopoverTrigger>
          <div className="w-[200px] p-2 border text-left border-slate-100 bg-slate-50 dark:bg-transparent ">
            <p className="line-clamp-1">{row.getValue('text')}</p>
          </div>
        </PopoverTrigger>
        <PopoverContent>{row.getValue('text')}</PopoverContent>
      </Popover>
    )
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
    accessorKey: 'audio_url',
    header: 'Download',
    cell: ({ row }) => (
      <div className="flex gap-x-2">
        <Button asChild variant="outline">
          <a href={row.getValue('audio_url')} download={row.getValue('audio_url')}>
            <Download />
          </a>
        </Button>
      </div>
    )
  }
]
