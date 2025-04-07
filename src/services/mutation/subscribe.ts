import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

// Define LoginCredentials Type
export type LoginCredentials = {
  data: {
    plan: string
    users_permissions_user: string
    subscription_status: string
    start_date: Date
    end_date: Date
  }
}

export const useCreateFreeSubscribeMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async (loginData: LoginCredentials) => {
      const token = Cookies.get('token')
      console.log('token==' + token)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/subscriptions`,
        loginData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response
    },
    onSuccess: async (data) => {
      console.log(JSON.stringify(data))
      router.push('/studio')
      Cookies.set('token', data?.data.jwt, { expires: 1, path: '/' })
      Cookies.set('userId', data?.data.user.documentId, {
        expires: 1,
        path: '/'
      })
    },
    onError: (error) => {
      console.error(error.message)
    }
  })
}
