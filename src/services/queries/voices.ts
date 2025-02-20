import { useQuery } from '@tanstack/react-query'
import { getAllVoices } from '../api/voiceApi'

export function useGetAllVoices() {
  return useQuery({
    queryKey: ['voices'],
    queryFn: () => getAllVoices(),
    staleTime: 5 * 60 * 1000, // Data will stay fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // Cache will persist for 10 minutes
    refetchOnWindowFocus: false
  })
}
