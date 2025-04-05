import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export type LoginCredentials = {
  identifier: string
  password: string
}

export type SignUpCredentials = {
  email: string
  username: string
  password: string
}

export const useLoginMutation = () => {
  const router = useRouter()
  const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL
  if (!LOGIN_URL) {
    throw new Error('LOGIN_URL is not defined in the environment variables.')
  }

  return useMutation({
    mutationFn: async (loginData: LoginCredentials) => {
      const response = await axios.post(LOGIN_URL, loginData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response
    },
    onSuccess: async (data) => {
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

export const useSignUpMutation = () => {
  const LOGIN_URL = process.env.NEXT_PUBLIC_LOGIN_URL
  const router = useRouter()

  if (!LOGIN_URL) {
    throw new Error('LOGIN_URL is not defined in the environment variables.')
  }

  return useMutation({
    mutationFn: async (loginData: SignUpCredentials) => {
      const response = await axios.post(`${LOGIN_URL}/register`, loginData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response
    },
    onSuccess: async (data) => {
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
