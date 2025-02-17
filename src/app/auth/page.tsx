import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-4 w-[400px] h-[200px] border rounded-2xl shadow-2xl shadow-green-100">
        <Link href="/studio">
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  )
}

export default Page
