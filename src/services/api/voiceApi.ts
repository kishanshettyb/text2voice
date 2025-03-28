import { StoreVoices } from '@/types/commonTypes'
import axios from 'axios'

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

// import axios from "axios";
// import Cookies from "js-cookie";

// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL, // Your Strapi backend URL
//   withCredentials: true, // Allow cookies to be sent with requests
// });

// import axios from "axios";
// import Cookies from "js-cookie";

// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL, // Your Strapi backend URL
//   withCredentials: true, // Allow cookies to be sent with requests
// });

// // Add an interceptor to include the token from cookies
// axiosInstance.interceptors.request.use((config) => {
//   const token = Cookies.get("token"); // Get token from cookies
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosInstance;

// axiosInstance.interceptors.request.use((config) => {
//   const token = Cookies.get("token"); // Get token from cookies
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosInstance;

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_ADMIN_TOKEN}`
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
