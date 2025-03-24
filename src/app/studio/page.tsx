'use client'

import { useAuth } from '@/context/AuthProvider'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div>
      <h1>Welcome {user ? user.email : 'Guest'}</h1>
      <h1>Welcome {user ? user.documentId : 'Guest'}</h1>
    </div>
  )
}
