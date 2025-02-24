import { Login } from '@/types/commonTypes'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOGIN_URL
})

export const login = async (data: Login) => {
  return await axiosInstance.post('login', data)
}
