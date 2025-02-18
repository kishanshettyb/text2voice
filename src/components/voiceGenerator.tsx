import React from 'react'
import { Button } from './ui/button'
import { Zap } from 'lucide-react'

function VoiceGenerator() {
  return (
    <div className="flex flex-row gap-x-6 p-6">
      <div className="w-3/4">
        <div className="border rounded-xl border-zinc-600 p-6"></div>
      </div>
      <div className="w-1/4">
        <div className="border rounded-xl border-zinc-600 p-6">
          <Button size="lg" className="bg-blue-600  text-lg shadow-2xl py-6 shadow-blue-900 w-full">
            <Zap size={30} />
            Generate
          </Button>
        </div>
      </div>
    </div>
  )
}

export default VoiceGenerator
