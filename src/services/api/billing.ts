import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const getUserTransactionDetails = async (customer_email: string) => {
  return await axiosInstance.get(
    `payments?filters[customer_email][$eq]=${customer_email}&sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=10`
  )
}
