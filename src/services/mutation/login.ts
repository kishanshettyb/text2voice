import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export const useLoginMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async (loginData) => {
      await axios.post('../../api/login', loginData, {
        withCredentials: true // Ensures the cookie is sent
      })
    },
    onSuccess: () => {
      router.push('/studio')
    },
    onError: (error) => {
      console.error(error.response?.data?.error || error.message)
    }
  })
}
export const useLogoutMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async () => {
      await axios.post('../../api/logout', {}, { withCredentials: true })
    },
    onSuccess: () => {
      router.push('/auth')
    }
  })
}
