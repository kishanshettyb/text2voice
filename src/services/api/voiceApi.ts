import axios from 'axios'

// import Cookies from "js-cookie";

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

// const token = Cookies.get('token');
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_ADMIN_TOKEN}`
  }
})

export const getAllUserTextToVoiceData = async (userId: string) => {
  const response = await axiosInstance.get(
    `text-to-voice-generations?filters[user][documentId][$eq]=${userId}&populate=user&pagination[pageSize]=10`
  )
  return response // ✅ Extract and return only the data
}
