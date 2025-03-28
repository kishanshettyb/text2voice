'use client'

import { useAuth } from '@/context/AuthProvider'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div>
      <h1>Welcome {user ? user.username : 'Guest'}</h1>
      <h2>Document ID: {user ? user.documentId : 'N/A'}</h2>
    </div>
  )
}
