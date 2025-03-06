import { LoginCredentials } from '@/components/login'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export const useLoginMutation = () => {
  const router = useRouter()
  const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL
  if (!LOGIN_URL) {
    throw new Error('LOGIN_URL is not defined in the environment variables.')
  }

  return useMutation<void, unknown, LoginCredentials>({
    mutationFn: async (loginData) => {
      const response = await axios.post(LOGIN_URL, loginData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    },
    onSuccess: async (data) => {
      console.log(JSON.stringify(data))
      // todo set cookies
      router.push('/studio')
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.error.message || error.message)
      } else {
        console.log(error)
      }
    }
  })
}
