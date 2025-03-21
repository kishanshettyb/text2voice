'use client'
import React from 'react'

import { useAuth } from '@/context/AuthContext'
function Page() {
  const { user, loading, logout } = useAuth()

  if (loading) return <p>Loading...</p>
  if (!user)
    return (
      <p>
        Unauthorized. Please log in. <button onClick={logout}>Logout</button>
      </p>
    )

  return (
    <div className="flex-1 ">
      <p>Show Dashbord</p>
      <h1>Welcome, {user.username}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Page
