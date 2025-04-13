'use client'
import React from 'react'
import { MyFilesDataTable } from '../myFilesDataTable'
import { transactioncolumns } from '@/app/config/transactions'
import { useGetUserTransactionDetails } from '@/services/queries/billing'
import { useGetUserDetails } from '@/services/queries/user'

function Transaction() {
  const { data: userDetails } = useGetUserDetails()
  const customer_email = userDetails?.data?.email
  const { data: userData } = useGetUserTransactionDetails(customer_email)
  const data = userData?.data?.data || []
  const searchField = 'amount'

  return (
    <div className="mt-10">
      <MyFilesDataTable searchText={searchField} columns={transactioncolumns} data={data} />
    </div>
  )
}

export default Transaction
