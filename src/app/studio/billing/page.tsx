import { columns } from '@/app/config/transactions'
import { MyFilesDataTable } from '@/components/myFilesDataTable'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function Billing() {
  const data = {
    data: [
      {
        id: 2,
        documentId: 'k9k8kdtpl3igu5vh5iqwwl6v',
        checkout_session_id: 'cs_test_a19QPBqWTsh6KYWiuIhpYYAcGHZTnom4ATwCmwiKrVWHk4Iilaa7yDOHHz',
        customer_id: 'cus_S5NXvKee5tqbCj',
        amount: 2900,
        currency: 'usd',
        payment_status: 'paid',
        createdAt: '2025-04-07T10:27:58.792Z',
        updatedAt: '2025-04-07T10:27:58.792Z',
        publishedAt: '2025-04-07T10:27:59.082Z',
        customer_email: null
      },
      {
        id: 4,
        documentId: 'c368tzv5maq01fecamnadbqa',
        checkout_session_id: 'cs_test_a1ef0F8m6T4RN1iqmmfkZNsAtbbDjXII47OA4G8sBqDCxR8GfaNpjciTXj',
        customer_id: 'cus_S5Ngfr4b5B0w82',
        amount: 2900,
        currency: 'usd',
        payment_status: 'paid',
        createdAt: '2025-04-07T10:28:55.263Z',
        updatedAt: '2025-04-07T10:28:55.263Z',
        publishedAt: '2025-04-07T10:28:55.532Z',
        customer_email: null
      },
      {
        id: 6,
        documentId: 'e65p3qnbqhtngz9apq4a3c9j',
        checkout_session_id: 'cs_test_a1vER89L8TCuUhPnMjY3Xirq5lo7VQPNE2yl8YkuFZ6dOh7FmlMHXFEWOq',
        customer_id: 'cus_S5No2EmrnBGscH',
        amount: 2900,
        currency: 'usd',
        payment_status: 'paid',
        createdAt: '2025-04-07T10:36:45.509Z',
        updatedAt: '2025-04-07T10:36:45.509Z',
        publishedAt: '2025-04-07T10:36:45.734Z',
        customer_email: null
      },
      {
        id: 8,
        documentId: 'eh8ep4gn730cbvhtc4nuuyne',
        checkout_session_id: 'cs_test_a1MrmnNfYBsEEbHwN4EZ6lgDeb5OCZBgUN8V7qDJ9DnC4GCrNgK2HNeoR1',
        customer_id: 'cus_S5O11EFtdKc5C0',
        amount: 2900,
        currency: 'usd',
        payment_status: 'paid',
        createdAt: '2025-04-07T10:50:24.222Z',
        updatedAt: '2025-04-07T10:50:24.222Z',
        publishedAt: '2025-04-07T10:50:24.507Z',
        customer_email: null
      },
      {
        id: 10,
        documentId: 'ea5d6lwdcc12e0kt78fj1glt',
        checkout_session_id: 'cs_test_a1NbKx0p6hujiUNyguOx25xBh1IYmLmiUBGtVWWy2I5K7LK8jnETfDwCDS',
        customer_id: 'cus_S5OBiz69ZY6HZA',
        amount: 2900,
        currency: 'usd',
        payment_status: 'paid',
        createdAt: '2025-04-07T10:59:56.947Z',
        updatedAt: '2025-04-07T10:59:56.947Z',
        publishedAt: '2025-04-07T10:59:57.203Z',
        customer_email: null
      },
      {
        id: 12,
        documentId: 'ut10r9qo06i7o0mp40faqj1n',
        checkout_session_id: 'cs_test_a1ApeR7T6PorK7SNkLVafcgpRnQao2g4wLfgqQtW7MCbi6m2dxw2Q9yG0O',
        customer_id: 'cus_S5PVUGViDePgz3',
        amount: 2900,
        currency: 'usd',
        payment_status: 'paid',
        createdAt: '2025-04-07T12:21:51.203Z',
        updatedAt: '2025-04-07T12:21:51.203Z',
        publishedAt: '2025-04-07T12:21:51.593Z',
        customer_email: null
      },
      {
        id: 14,
        documentId: 'r70k2sdj0ldfqtb3px8w2vpg',
        checkout_session_id: 'cs_test_a1J34MNrSK5589T9PC2BaiCItfasnpk6EjTgO3uMCFg420AaiNA6xHy1N2',
        customer_id: 'cus_S5Pgyf4lLK4XAZ',
        amount: 2900,
        currency: 'usd',
        payment_status: 'paid',
        createdAt: '2025-04-07T12:32:38.520Z',
        updatedAt: '2025-04-07T12:32:38.520Z',
        publishedAt: '2025-04-07T12:32:38.755Z',
        customer_email: 'kishanqr@gmail.com'
      },
      {
        id: 16,
        documentId: 'j6ic59o7468gl8d099666vzh',
        checkout_session_id: 'cs_test_a1b7Pg3BPCFZmwEM5eN90MVHlR10llWU3gj3rC3uQzAVg6aC2Cj1HTaqKR',
        customer_id: 'cus_S5QBeLdwbTaoo6',
        amount: 2900,
        currency: 'usd',
        payment_status: 'paid',
        createdAt: '2025-04-07T13:03:59.935Z',
        updatedAt: '2025-04-07T13:03:59.935Z',
        publishedAt: '2025-04-07T13:04:00.176Z',
        customer_email: 'kishanqr@gmail.com'
      },
      {
        id: 18,
        documentId: 'xnb6uc0vk6a8dcymqlb2lrbq',
        checkout_session_id: 'cs_test_a1k6JQdhVhQ3pj2P09KE9aIwKuTjCi4SkPW0K17Wdyz7aDuhvy6DgluvmS',
        customer_id: 'cus_S5QgG7GEdjlSa3',
        amount: 2900,
        currency: 'usd',
        payment_status: 'paid',
        createdAt: '2025-04-07T13:35:22.706Z',
        updatedAt: '2025-04-07T13:35:22.706Z',
        publishedAt: '2025-04-07T13:35:23.139Z',
        customer_email: 'manikanta@gmail.com'
      },
      {
        id: 20,
        documentId: 'qasba2tuwga1r89ribxr0v8l',
        checkout_session_id: 'cs_test_a1SbC8DhlixVDM9rTMaOoq56j5Iyym2hjtDWnmKSfBDUpfARyvM0W7PZk5',
        customer_id: 'cus_S5R24wwSsXuhLT',
        amount: 2900,
        currency: 'usd',
        payment_status: 'paid',
        createdAt: '2025-04-07T13:57:20.995Z',
        updatedAt: '2025-04-07T13:57:20.995Z',
        publishedAt: '2025-04-07T13:57:21.414Z',
        customer_email: 'kishanqr@gmail.com'
      },
      {
        id: 22,
        documentId: 'qabgq6xgoqcfjo35zi92o72n',
        checkout_session_id: 'cs_test_a1nDW1ECyV0FKwnaj22vvlVNbMLfdKtB3JNwkOkjhrRDcnjLZzjrDw8FHd',
        customer_id: 'cus_S5R4B88xB6JwfX',
        amount: 2900,
        currency: 'usd',
        payment_status: 'paid',
        createdAt: '2025-04-07T13:58:52.167Z',
        updatedAt: '2025-04-07T13:58:52.167Z',
        publishedAt: '2025-04-07T13:58:52.421Z',
        customer_email: 'manikanta@gmail.com'
      },
      {
        id: 24,
        documentId: 'xmolrakhrokwi0s6mn72ahl3',
        checkout_session_id: 'cs_test_a1xu1ePFkOrzbCx932AhRQeG0JFR3AOBw38s3C4ZloUPSMBMGMJo4p1OSG',
        customer_id: 'cus_S5RDhnVXyOC0Oq',
        amount: 2900,
        currency: 'usd',
        payment_status: 'paid',
        createdAt: '2025-04-07T14:08:05.088Z',
        updatedAt: '2025-04-07T14:08:05.088Z',
        publishedAt: '2025-04-07T14:08:05.271Z',
        customer_email: 'apurvaappu.as@gmail.com'
      },
      {
        id: 26,
        documentId: 'swmjullmxkkuxs9udxh1m4iz',
        checkout_session_id: 'cs_test_a1gbrxaERFskreJPipvf2nxTmfvjNh0X9nmFjVr7Ltj6cVmabrZ4ebqr3l',
        customer_id: 'cus_S5RNAoMTghmGQh',
        amount: 2900,
        currency: 'usd',
        payment_status: 'paid',
        createdAt: '2025-04-07T14:18:02.039Z',
        updatedAt: '2025-04-07T14:18:02.039Z',
        publishedAt: '2025-04-07T14:18:02.530Z',
        customer_email: 'deekshith@gmail.com'
      },
      {
        id: 28,
        documentId: 'tbri859c64g1xpktsuqobw4y',
        checkout_session_id: 'cs_test_a1mdCp40bjqt39J9Asuo30dgqboOVwP5cYdEEuELvFk5RsYdEZrfzRvE5R',
        customer_id: 'cus_S5RP88TS9R1MXR',
        amount: 2900,
        currency: 'usd',
        payment_status: 'paid',
        createdAt: '2025-04-07T14:19:36.667Z',
        updatedAt: '2025-04-07T14:19:36.667Z',
        publishedAt: '2025-04-07T14:19:36.849Z',
        customer_email: 'ullas@gmail.com'
      },
      {
        id: 30,
        documentId: 'x236zhdhzjoy1vqhyrgjvolm',
        checkout_session_id: 'cs_test_a1BLh3PagceWVioY1yWr4TqPj834NNI6dAl7YqvcSn1lA0hLbiWn8uT64P',
        customer_id: 'cus_S5Re1yEEeUFl68',
        amount: 2900,
        currency: 'usd',
        payment_status: 'paid',
        createdAt: '2025-04-07T14:34:37.949Z',
        updatedAt: '2025-04-07T14:34:37.949Z',
        publishedAt: '2025-04-07T14:34:38.225Z',
        customer_email: 'ullas@gmail.com'
      },
      {
        id: 32,
        documentId: 'n641os7m0772w139ljmhu2w4',
        checkout_session_id: 'cs_test_a13zbB1Qjw7WU6k6CLiWUkmI7QzuY7QHtXyO83GIJpBKS402Ccs1lngpui',
        customer_id: 'cus_S5RiMcLgAyNy6C',
        amount: 2900,
        currency: 'usd',
        payment_status: 'paid',
        createdAt: '2025-04-07T14:39:24.376Z',
        updatedAt: '2025-04-07T14:39:24.376Z',
        publishedAt: '2025-04-07T14:39:24.700Z',
        customer_email: 'ullas@gmail.com'
      },
      {
        id: 34,
        documentId: 'v8v6coihrfadam0uc7ba09aq',
        checkout_session_id: 'cs_test_a1QfyvUuT91La7IpP8ezsN9d3caAe6gewsnSBkeKnslbLdq8awjTeo8BbO',
        customer_id: 'cus_S5S0HjmHeFXQNl',
        amount: 2900,
        currency: 'usd',
        payment_status: 'paid',
        createdAt: '2025-04-07T14:56:53.551Z',
        updatedAt: '2025-04-07T14:56:53.551Z',
        publishedAt: '2025-04-07T14:56:53.787Z',
        customer_email: 'ullas@gmail.com'
      }
    ],
    meta: {
      pagination: {
        page: 1,
        pageSize: 25,
        pageCount: 1,
        total: 17
      }
    }
  }
  return (
    <div className="p-4">
      {/* <h2 className="text-2xl mb-5">Billing</h2> */}
      <Tabs defaultValue="billinginfo" className="w-full">
        <TabsList className="h-[60px]">
          <TabsTrigger className="h-[50px]" value="billinginfo">
            Billing Information
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
          <div className="mt-10">
            <h2 className="text-xl mb-5">Transactions</h2>
            <div className="container p-4 mx-auto border rounded-2xl">
              <MyFilesDataTable columns={columns} data={data.data} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="billinginfo">Change your password here.</TabsContent>
        <TabsContent value="paymentmethod">Change your password here.</TabsContent>
        <TabsContent value="invoice">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}

export default Billing
