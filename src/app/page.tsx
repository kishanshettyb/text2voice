import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="p-4">
      <Link href="/auth">
        <Button>Login</Button>
      </Link>
    </div>
  )
}
