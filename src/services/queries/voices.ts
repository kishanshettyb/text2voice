import { useQuery } from '@tanstack/react-query'
import { getAllLanguages, getAllUserTextToVoiceData, getAllVoices } from '../api/voiceApi'

export function useGetAllVoices() {
  return useQuery({
    queryKey: ['voices'],
    queryFn: () => getAllVoices(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}

export function useGetAllLanguages() {
  return useQuery({
    queryKey: ['languages'],
    queryFn: () => getAllLanguages(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}

export function useGetAllUserTextToVoiceData(userId: string) {
  return useQuery({
    queryKey: ['userTestToVoice'],
    queryFn: () => getAllUserTextToVoiceData(userId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!userId
  })
}
