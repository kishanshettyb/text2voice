import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createVoicePaly } from '../api/voiceApi'

interface VoiceProps {
  languge: string
  text: string
  voice: string
}
export function useCreateVoicePlay() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: VoiceProps) => createVoicePaly(data),
    onMutate: () => {
      console.log('mutate!!!')
    },

    onError: () => {
      console.log('error!!!')
    },

    onSuccess: (data) => {
      console.log('success!!!' + data)
    },

    onSettled: async (_, error) => {
      console.log('settled')
      if (error) {
        console.log('Show Error: ' + error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ['playVoice']
        })
      }
    }
  })
}
