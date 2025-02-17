'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

// Define a type for Voice
interface Voice {
  name: string
  languageCodes: string[]
  ssmlGender: 'male' | 'female' | 'neutral' // Adjust based on your requirements
}

interface VoiceComboboxProps {
  voices: Voice[]
  selectedVoice: string
  setSelectedVoice: () => void
}

export function VoiceCombobox({ voices, selectedVoice, setSelectedVoice }: VoiceComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {selectedVoice
            ? voices.find((voice) => voice.name === selectedVoice)?.name
            : 'Select a voice...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search voice..." className="h-9" />
          <CommandList>
            <CommandEmpty>No voice found.</CommandEmpty>
            <CommandGroup>
              {voices.map((voice) => (
                <CommandItem
                  key={voice.name}
                  value={voice.name}
                  onSelect={(currentValue) => {
                    setSelectedVoice(currentValue)
                    setOpen(false)
                  }}
                >
                  {voice.name} - {voice.languageCodes.join(', ')} ({voice.ssmlGender})
                  <Check
                    className={cn(
                      'ml-auto',
                      selectedVoice === voice.name ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
