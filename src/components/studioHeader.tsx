import React from 'react'
import { ProfileDropdown } from './profileDropdown'
import { Button } from './ui/button'
import { Download, Zap } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ModeToggle } from './themeModeToggle'

function StudioHeader() {
  return (
    <div className="px-6 py-3 w-auto flex-1 flex items-center justify-between">
      <div className="md:flex hidden gap-x-5 justify-end items-center">
        <div className="md:w-[250px]">
          <Input
            placeholder="Enter Title"
            className="border-zinc-800 text-white placeholder:text-zink-700"
          />
        </div>
        <div>
          <Button variant="outline" className="opacity-20 hover:opacity-100">
            <Zap />
            Generate
          </Button>
        </div>
        <div>
          <Button variant="secondary" className="opacity-20 hover:opacity-100">
            <Download size="12" /> Download
          </Button>
        </div>
      </div>
      <div className="flex flex-row gap-x-5 justify-center">
        <div>
          <ProfileDropdown />
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

export default StudioHeader
