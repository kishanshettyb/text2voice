'use client'

import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { DataTableColumnHeader } from '@/components/DataTableColumnHeader'

export type Transactions = {
  createdAt: Date
  amount: number
  currency: string
  payment_status: string
}

export const transactioncolumns: ColumnDef<Transactions>[] = [
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
