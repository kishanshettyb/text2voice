import { ChevronDown, Volume2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

export function VoiceModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-zinc-600 bg-zinc-700 border">
          <Volume2 /> Voice
          <ChevronDown />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-zinc-950 border-zinc-800 border w-[600px]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-row justify-between items-center">
              <div className="text-white">Select your Voice</div>
              <div>
                <X className="text-white" size="20" />
              </div>
            </div>
          </DialogTitle>
          <DialogDescription>
            Choose your preferred voice to convert text into speech.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2"></div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
