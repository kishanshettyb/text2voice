import { StoreVoices } from '@/types/commonTypes'
import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('token')

export const getAllVoices = async () => {
  const response = await fetch('../api/voices')
  if (!response.ok) {
    throw new Error('Failed to fetch voices')
  }
  return response.json()
}

export const getAllLanguages = async () => {
  const response = await fetch('../language.json')
  if (!response.ok) {
    throw new Error('Failed to fetch voices')
  }
  return response.json()
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export const getAllUserTextToVoiceData = async (
  userId: string
  // page: number
) => {
  try {
    const response = await axiosInstance.get(
      `voices?filters[users_permissions_user][documentId][$eq]=${userId}`
    )
    const data = response.data?.data ?? [] // ✅ Extract 'data' array, or return empty array
    return Array.isArray(data) ? data : [] // ✅ Ensure it's always an array
  } catch (error) {
    console.error('Error fetching user text-to-voice data:', error)
    return [] // ✅ Return an empty array on error
  }
}

type T2Vprops = {
  uid: string
}

export const getUserVoicesByUid = async (uid: string): Promise<T2Vprops> => {
  try {
    const response = await axiosInstance.get<T2Vprops>(
      `text-to-voice-generations?populate=voices.users_permissions_user.subscription&pagination[page]=1&pagination[pageSize]=10&filters[users_permissions_user][documentId]=${uid}`
    )
    return response.data
  } catch (error) {
    console.log('Error fetching domains:', error)
    throw error
  }
}

export const createGeneratedVoices = async (data: StoreVoices) => {
  await axiosInstance.post('text-to-voice-generations', data)
}
