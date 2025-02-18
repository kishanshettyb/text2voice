import React from 'react'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'

function StudioSidebar() {
  return (
    <div className="border  border-y-0 border-l-0 border-zinc-600 flex flex-col flex-1 h-100">
      <div className="mb-5 p-5 border border-zinc-700 border-x-0 border-t-0">
        <p className="text-white font-semibold">LOGO</p>
      </div>
      <div className="px-5">
        <Button className="w-full p-5 text-lg shadow-2xl shadow-green-800 hover:bg-green-400 hover:animate-pulse bg-green-500 text-black">
          <Plus size="24" className="mr-2" />
          Create New File
        </Button>
      </div>
    </div>
  )
}

export default StudioSidebar
