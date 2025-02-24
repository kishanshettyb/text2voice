import React from 'react'
import {
  AudioLines,
  CreditCard,
  FolderClosed,
  Headset,
  LayoutDashboard,
  Mic,
  Plus,
  Settings,
  Sparkles
} from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

function StudioSidebar() {
  return (
    <div className="border  border-y-0 border-l-0  bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-600 flex flex-col flex-1 h-100">
      <div className="mb-5 px-5 py-4 border border-zinc-100 dark:border-zinc-800 border-x-0 border-t-0">
        <div className="flex justify-start gap-x-2 flex-row items-center ">
          <Mic />
          <p className="dark:text-white text-2xl font-semibold">tivo</p>
        </div>
      </div>
      <div className="px-5 mb-5">
        <Button className="w-full  flex justify-start mb-5 " variant="secondary">
          <Plus className="mr-1" />
          Create New Voice
        </Button>
        <Button className="w-full  flex justify-start  " variant="secondary">
          <Mic className="mr-1" />
          Voice Clone
        </Button>
      </div>
      <div>
        <div className="px-5">
          <p className="ml-4 mb-1 dark:text-zinc-100  text-zinc-950 opacity-50">Overview</p>
          <ul>
            <li className="mb-1">
              <Link href="#">
                <Button
                  variant="ghost"
                  className="w-full flex justify-start opacity-90 hover:opacity-100"
                  size="default"
                >
                  <LayoutDashboard /> Dashboard
                </Button>
              </Link>
            </li>
            <li className="mb-1">
              <Link href="#">
                <Button
                  variant="ghost"
                  className="w-full flex justify-start opacity-90 hover:opacity-100"
                  size="default"
                >
                  <FolderClosed /> My Files
                </Button>
              </Link>
            </li>
          </ul>
          <p className="ml-4 mt-5 mb-1 dark:text-zinc-100  text-zinc-950 opacity-50">
            Voice Features
          </p>
          <ul>
            <li className="mb-1">
              <Link href="#">
                <Button
                  variant="ghost"
                  className="w-full flex justify-start opacity-90 hover:opacity-100"
                  size="default"
                >
                  <AudioLines /> Text to Speech
                </Button>
              </Link>
            </li>
            <li className="mb-1">
              <Link href="#">
                <Button
                  variant="ghost"
                  className="w-full flex justify-start opacity-90 hover:opacity-100"
                  size="default"
                >
                  <Sparkles /> Voice Cloning
                </Button>
              </Link>
            </li>
          </ul>
          <p className="ml-4 mb-1 mt-5 dark:text-zinc-100  text-zinc-950 opacity-50">Account </p>
          <ul>
            <li className="mb-1">
              <Link href="#">
                <Button
                  variant="ghost"
                  className="w-full flex justify-start opacity-90 hover:opacity-100"
                  size="default"
                >
                  <CreditCard /> Billing
                </Button>
              </Link>
            </li>
            <li className="mb-1">
              <Link href="#">
                <Button
                  variant="ghost"
                  className="w-full flex justify-start opacity-90 hover:opacity-100"
                  size="default"
                >
                  <Settings /> Settings
                </Button>
              </Link>
            </li>
            <li>
              <Link href="#">
                <Button
                  variant="ghost"
                  className="w-full flex justify-start opacity-90 hover:opacity-100"
                  size="default"
                >
                  <Headset /> Support
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default StudioSidebar
