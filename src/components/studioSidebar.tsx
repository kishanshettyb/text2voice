import React from 'react'
import { Plus } from 'lucide-react'

function StudioSidebar() {
  return (
    <div className="border  border-y-0 border-l-0 border-zinc-600 flex flex-col flex-1 h-100">
      <div className="mb-5 p-5 border border-zinc-700 border-x-0 border-t-0">
        <p className="text-white font-semibold">LOGO</p>
      </div>
      <div className="px-5">
        <div className="rounded-2xl hover:cursor-pointer hover:animate-pulse border border-green-600 bg-green-500 hover:bg-green-400 shadow-2xl shadow-green-800 p-4 text-semibold flex justify-center items-center">
          <Plus size="20" className="mr-2" /> Create New File
        </div>
      </div>
    </div>
  )
}

export default StudioSidebar
