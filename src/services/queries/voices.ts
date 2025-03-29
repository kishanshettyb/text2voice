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

export function useGetAllUserTextToVoiceData(userId: string, page: number) {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ['userTextToVoice'],
    queryFn: () => getAllUserTextToVoiceData(userId, page),
    staleTime: 1000
  })
  return { isLoading, isError, data, isFetching }
}

export function useGetUserVoicesByUid(uid: string) {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ['userTextToVoice'],
    queryFn: () => getUserVoicesByUid(uid),
    staleTime: 1000
  })
  return { isLoading, isError, data, isFetching }
}
