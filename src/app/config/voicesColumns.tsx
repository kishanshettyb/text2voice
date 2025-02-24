import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { FormattedVoice } from '@/types/formattedVoice' // Import FormattedVoice
import PlayPauseButton from '@/components/playPauseButton'

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
          height={30}
          className="rounded-full h-[30px] w-[30px] object-cover"
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
