'use client'

import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { DataTableColumnHeader } from '@/components/DataTableColumnHeader'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transactions = {
  id: string
  createdAt: Date
  amount: number
  currency: string
}

export const columns: ColumnDef<Transactions>[] = [
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created Date" />,
    cell: ({ row }) => <p>{moment(row.getValue('createdAt')).format('DD MMM YYYY HH:mm a')}</p>,
    enableSorting: true
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  },
  {
    accessorKey: 'currency',
    header: 'Currency'
  },
  {
    accessorKey: 'payment_status',
    header: 'Payment Status'
  }
]
