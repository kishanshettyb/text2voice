import { useQuery } from '@tanstack/react-query'
import {
  getAllLanguages,
  getAllUserTextToVoiceData,
  getAllVoices,
  getUserVoicesByUid
} from '../api/voiceApi'

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
  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: ['userTextToVoice'],
    queryFn: () => getAllUserTextToVoiceData(userId),
    staleTime: 1000
  })
  return { isLoading, isError, error, data, isFetching }
}

export function useGetUserVoicesByUid(uid: string) {
  const { isLoading, isError, data, isFetching } = useQuery({
    queryKey: ['userTextToVoiceByUid'],
    queryFn: () => getUserVoicesByUid(uid),
    staleTime: 1000
  })
  return { isLoading, isError, data, isFetching }
}
