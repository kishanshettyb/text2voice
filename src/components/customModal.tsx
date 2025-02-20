'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface Props {
  isOpen?: boolean
  onClose?: () => void
  title: string
  desc?: string
  size?: string
  modalSize?: string
  children: React.ReactNode
}

export function CustomModal({ isOpen, onClose, title, desc, children, modalSize }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`sm:max-w-[425px] bg-zinc-950   border-zinc-600 ${modalSize} rounded-2xl`}
      >
        <DialogHeader>
          <DialogTitle className="text-zinc-200">{title}</DialogTitle>
          <DialogDescription className="text-zinc-200">{desc}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 h-[650px]">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
