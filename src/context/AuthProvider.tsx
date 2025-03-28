'use client'

import { createContext, useState, useEffect, useContext } from 'react'
import { usePathname } from 'next/navigation'
import Cookies from 'js-cookie'

interface User {
  email: string
  id: string
  documentId: string
  username: string
}

interface AuthContextType {
  user: User | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Get the stored user data from cookies
    const storedUser = Cookies.get('user') // Assuming you store the full user object in JSON format

    if (storedUser) {
      // If the cookie exists, parse it to get the user object
      const userData = JSON.parse(storedUser) as User
      setUser(userData)
    } else {
      // If no user cookie, set user to null
      setUser(null)
    }
  }, [pathname])

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
