'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface CustomModalProps {
  isOpen: boolean
  onClose: () => void
  modalSize?: string
  title: string
  desc?: string
  children?: React.ReactNode // children prop
}
const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  desc,
  modalSize
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`sm:max-w-[425px] bg-white dark:bg-zinc-900  ${modalSize} rounded-2xl`}
      >
        <DialogHeader>
          <DialogTitle className="dark:text-zinc-300">{title}</DialogTitle>
          <DialogDescription className="dark:text-zinc-300">{desc}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 h-[500px]">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
export default CustomModal
