import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Transaction from '@/components/billing/transaction'

function Billing() {
  return (
    <div className="p-4">
      <Tabs defaultValue="transaction" className="w-full">
        <TabsList className="h-[60px]">
          <TabsTrigger className="h-[50px]" value="billinginfo">
            Billing Details
          </TabsTrigger>
          <TabsTrigger className="h-[50px]" value="transaction">
            Transactions
          </TabsTrigger>
          <TabsTrigger className="h-[50px]" value="paymentmethod">
            Payment Method
          </TabsTrigger>
          <TabsTrigger className="h-[50px]" value="invoice">
            Invoice
          </TabsTrigger>
        </TabsList>
        <TabsContent value="transaction">
          <Transaction />
        </TabsContent>
        <TabsContent value="billinginfo">Change your password here.</TabsContent>
        <TabsContent value="paymentmethod">Change your password here.</TabsContent>
        <TabsContent value="invoice">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}

export default Billing
