import React from 'react'
import {
  CreditCard,
  FolderClosed,
  Headset,
  LayoutDashboard,
  Plus,
  Settings,
  Sparkles
} from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

function StudioSidebar() {
  return (
    <div className="border  border-y-0 border-l-0 border-zinc-600 flex flex-col flex-1 h-100">
      <div className="mb-5 p-5 border border-zinc-700 border-x-0 border-t-0">
        <p className="text-white font-semibold">LOGO</p>
      </div>
      <div className="px-5">
        <Button className="w-full mb-5 rounded-xl px-5 py-6 text-lg shadow-2xl shadow-green-800 hover:bg-green-400 hover:animate-pulse bg-green-500 text-black">
          <Plus size="24" className="mr-2" />
          Create New File
        </Button>
        <ul>
          <li>
            <Link href="#">
              <div className="text-zinc-400 flex justify-start gap-x-3 items-center   hover:bg-zinc-700 px-6 py-2 w-full mb-5 rounded-xl">
                <LayoutDashboard size="20" /> Dashboard
              </div>
            </Link>
          </li>
          <li>
            <Link href="#">
              <div className="text-zinc-400 flex justify-start gap-x-3 items-center   hover:bg-zinc-700 px-6 py-2 w-full mb-5 rounded-xl">
                <FolderClosed size="20" /> My Files
              </div>
            </Link>
          </li>
          <li>
            <Link href="#">
              <div className="text-zinc-400 flex justify-start gap-x-3 items-center   hover:bg-zinc-700 px-6 py-2 w-full mb-5 rounded-xl">
                <Sparkles size="20" /> Voice Cloning
              </div>
            </Link>
          </li>
          <li>
            <Link href="#">
              <div className="text-zinc-400 flex justify-start gap-x-3 items-center   hover:bg-zinc-700 px-6 py-2 w-full mb-5 rounded-xl">
                <CreditCard size="20" /> Billing
              </div>
            </Link>
          </li>
          <li>
            <Link href="#">
              <div className="text-zinc-400 flex justify-start gap-x-3 items-center   hover:bg-zinc-700  px-6 py-2 w-full mb-5 rounded-xl">
                <Settings size="20" /> Settings
              </div>
            </Link>
          </li>
          <li>
            <Link href="#">
              <div className="text-zinc-400 flex justify-start gap-x-3 items-center   hover:bg-zinc-700  px-6 py-2 w-full mb-5 rounded-xl">
                <Headset size="20" /> Support
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default StudioSidebar
