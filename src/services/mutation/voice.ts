import { useMutation } from '@tanstack/react-query'
import { StoreVoices } from '@/types/commonTypes'
import { createGeneratedVoices } from '../api/voiceApi'

export const useCreateGeneratedVoicesMutation = () => {
  return useMutation({
    mutationFn: (data: StoreVoices) => createGeneratedVoices(data),
    onSuccess: () => {
      console.log('success')
    },
    onError: (error) => {
      console.error(error.response?.data?.error || error.message)
    }
  })
}
