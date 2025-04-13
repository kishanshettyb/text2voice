'use client'

import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import { DataTableColumnHeader } from '@/components/DataTableColumnHeader'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

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
    accessorKey: 'checkout_session_id',
    header: 'Transaction Id',
    cell: ({ row }) => {
      const checkoutSessionId = row.original.checkout_session_id
      return (
        <Popover>
          <PopoverTrigger>
            <div className="w-[200px] p-2 border text-left border-slate-100 bg-slate-50 dark:bg-transparent ">
              <p className="line-clamp-1">{checkoutSessionId}</p>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto">{checkoutSessionId}</PopoverContent>
        </Popover>
      )
    }
  },
  {
    accessorKey: 'currency',
    header: 'Currency'
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  },
  {
    accessorKey: 'payment_status',
    header: 'Payment Status'
  }
]
