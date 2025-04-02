'use client'
import { LoginForm } from '@/components/login'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

function Page() {
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      router.push('/studio')
    }
  }, [router]) // Runs only once on component mount
  return (
    <div className="flex justify-center items-center my-auto w-screen h-screen">
      <LoginForm />
    </div>
  )
}

export default Page
