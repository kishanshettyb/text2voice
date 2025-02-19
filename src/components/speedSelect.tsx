import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { CircleGauge } from 'lucide-react'
import useVoiceStore from '@/store/speed'

export function SpeedSelect() {
  const { voiceSpeed, setVoiceSpeed } = useVoiceStore()

  return (
    <div className="relative">
      <Select value={voiceSpeed} onValueChange={setVoiceSpeed}>
        <CircleGauge size="16" className="absolute text-white left-[16px] top-[10px]" />
        <SelectTrigger className="w-[110px] border-zinc-600 text-white bg-zinc-700 border pl-10">
          <SelectValue className="text-zinc-500" placeholder="Select Speed" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-700  border-zinc-600 text-white border">
          <SelectGroup>
            <SelectLabel>Speed</SelectLabel>
            <SelectItem value="1.5x">1.5x</SelectItem>
            <SelectItem value="1.4x">1.4x</SelectItem>
            <SelectItem value="1.3x">1.3x</SelectItem>
            <SelectItem value="1.2x">1.2x</SelectItem>
            <SelectItem value="1.1x">1.1x</SelectItem>
            <SelectItem value="1.0x">1.0x</SelectItem>
            <SelectItem value="0.9x">0.9x</SelectItem>
            <SelectItem value="0.8x">0.8x</SelectItem>
            <SelectItem value="0.7x">0.7x</SelectItem>
            <SelectItem value="0.6x">0.6x</SelectItem>
            <SelectItem value="0.5x">0.5x</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
