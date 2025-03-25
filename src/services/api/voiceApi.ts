import { StoreVoices } from '@/types/commonTypes'
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

// export const getAllUserTextToVoiceData = async (userId: string) => {
//   const response = await axiosInstance.get(
//     `text-to-voice-generations?filters[user][documentId][$eq]=${userId}&populate=user&pagination[pageSize]=10`
//   );
//   return response.data; // ✅ Extract and return only the data
// };

export const getAllUserTextToVoiceData = async (userId: string, page: number) => {
  try {
    const response = await axiosInstance.get(
      `text-to-voice-generations?filters[user][documentId][$eq]=${userId}&&populate=user&pagination[page]=${page}&pagination[pageSize]=10&_sort=created_at:desc&_start=0&_limit=10`
    )

    // Ensure response contains the expected structure
    const data = response.data?.data ?? [] // ✅ Extract 'data' array, or return empty array
    console.log(JSON.stringify(response))
    return Array.isArray(data) ? data : [] // ✅ Ensure it's always an array
  } catch (error) {
    console.error('Error fetching user text-to-voice data:', error)
    return [] // ✅ Return an empty array on error
  }
}

// export const getAllUserTextToVoiceData = async (userId: string) => {
//   try {
//     let allData: any[] = [];
//     let page = 1;
//     let hasMore = true;

//     while (hasMore) {
//       const response = await axiosInstance.get(
//         `text-to-voice-generations?filters[user][documentId][$eq]=${userId}&populate=user&pagination[page]=${page}&pagination[pageSize]=100`
//       );

//       const data = response.data?.data ?? [];
//       allData = [...allData, ...data];

//       // Check if more pages exist
//       const totalPages = response.data?.meta?.pagination?.pageCount ?? 1;
//       hasMore = page < totalPages;
//       page++;
//     }

//     // Sort data by 'createdAt' (newest first)
//     const sortedData = allData.sort((a, b) => {
//       const dateA = new Date(a.attributes?.createdAt).getTime() || 0;
//       const dateB = new Date(b.attributes?.createdAt).getTime() || 0;
//       return dateB - dateA;
//     });

//     return sortedData;
//   } catch (error) {
//     console.error("Error fetching user text-to-voice data:", error);
//     return [];
//   }
// };

export const createGeneratedVoices = async (data: StoreVoices) => {
  await axiosInstance.post('text-to-voice-generations', data)
}
