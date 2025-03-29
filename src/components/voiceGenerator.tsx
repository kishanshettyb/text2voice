'use client'

import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import { ChevronDown, Loader2, Volume2, Zap } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { speechSchema } from '@/schema/speechSchema'
import { SpeedSelect } from '@/components/speedSelect'
import useVoiceStore from '@/store/speed'
import Voicetable from '@/components/voiceTable'
import CustomModal from '@/components/customModal'
import { useMutation } from '@tanstack/react-query'
import Mp3Player from './mp3Player'
import { useParams } from 'next/navigation'
import { TitleBar } from '@/components/titleBar'
import useTitleStore from '@/store/title'
import Cookies from 'js-cookie'
import { generateSpeech, uploadTextToSpeech } from '@/services/api/generateSpeech'

// Form schema using Zod for validation
const formSchema = speechSchema
// interface RequestData {
//   text: string
//   speed: string
//   userId: string | undefined
// }
// interface SendData {
//   uid: string
//   voices: string
//   token: string
//   title: string
//   userId: string
// }

// Function to call the API and generate the speech
// const generateSpeech = async (requestData: RequestData) => {
//   const response = await fetch('../../api/tts', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(requestData)
//   })

//   const data = await response.json()
//   console.log(data)
//   if (!response.ok || !data) {
//     throw new Error('Failed to generate speech')
//   }
//   return data
// }

// const uploadTextToSpeech = async (sendData: SendData) => {
//   const userId = Cookies.get('userId')
//   const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/text-to-voice-generations`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${sendData.token}`
//     },
//     body: JSON.stringify({
//       data: {
//         uid: sendData.uid,
//         voices: sendData.voices,
//         title: sendData.title,
//         users_permissions_user: userId
//       }
//     })
//   })

//   const data = await response.json()
//   if (!response.ok || !data) {
//     throw new Error('Failed to generate speech')
//   }
//   return data
// }

function VoiceGenerator() {
  const fileTitle = useTitleStore((state) => state.title) || 'United'
  const params = useParams()
  const [pageUid, setPageUid] = useState('')
  const uid = params?.uid
  const [textCount, setTextCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const voiceSpeed = useVoiceStore((state) => state.voiceSpeed) || '1.0x'
  const [audioUrl, setAudioUrl] = useState<string>('')
  const [audioText, setAudioText] = useState<string>('')

  useEffect(() => {
    setPageUid(uid)
  }, [uid])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: ''
    },
    mode: 'onChange'
  })

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: generateSpeech,
    onSuccess: (data) => {
      setAudioUrl(data.documentId)
      setAudioText(data.text)
      const sendData = {
        uid: pageUid,
        token: data.token,
        voices: data.documentId,
        title: fileTitle,
        userId: data.userId
      }
      uploadTextToSpeech(sendData)
    }
  })

  // Handle form submission and trigger speech generation
  function onSubmit(values: z.infer<typeof formSchema>) {
    const userId = Cookies.get('userId')
    const requestData = {
      ...values,
      speed: voiceSpeed,
      userId: userId
    }
    mutateAsync(requestData)
  }

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value
    const title = text.slice(0, 30) // Limit to 30 chars for title
    useTitleStore.getState().settitle(title)
    setTextCount(text.length > 5000 ? 5000 : text.length)
  }

  return (
    <div className="flex flex-col md:flex-row gap-x-6 gap-y-6 lg:gap-y-0 pt-3">
      <div className={`w-full ${audioUrl ? 'md:w-3/4>' : ''}`}>
        <TitleBar />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="">
              <div className="w-full">
                <div className="border rounded-xl  border-zinc-200 dark:border-zinc-600 dark:bg-zinc-900 p-6">
                  <div className="flex mb-5 flex-row items-center justify-start gap-x-4">
                    <div>
                      <Button onClick={() => setIsOpen(true)} variant="outline">
                        <Volume2 /> Voice
                        <ChevronDown />
                      </Button>
                      <CustomModal
                        modalSize="md:max-w-[600px]"
                        title="Select your voice"
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                      >
                        <Voicetable />
                      </CustomModal>
                    </div>
                    <div>
                      <SpeedSelect />
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            className="dark:border-zinc-600 rounded-lg dark:active:border-zinc-500 dark:focus:border-zinc-500 dark:text-white"
                            placeholder="Type here..."
                            {...field}
                            onChange={(e) => {
                              field.onChange(e) // to update react-hook-form state
                              handleTextareaChange(e) // update Zustand store
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {isError && (
                  <div className="flex justify-start py-1">
                    <p className="text-sm text-red-500">{(error as Error).message}</p>
                  </div>
                )}
                <div className=" flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-50">3900 credits remaining</p>
                  </div>
                  <div
                    className={`flex justify-end gap-x-5 ${isError ? 'mt-0' : 'mt-5'} items-center flex-row`}
                  >
                    <div className="w-full">
                      <p className="text-xs opacity-50">{textCount} / 5,000 characters</p>
                    </div>
                    <div>
                      <Button
                        disabled={!form.formState.isValid || isPending}
                        type="submit"
                        className="bg-green-500 text-white hover:bg-green-600  w-full"
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="animate-spin" size={30} />
                            {audioUrl ? 'Regenerating...' : 'Generating...'}
                          </>
                        ) : (
                          <>
                            <Zap size={24} />
                            {audioUrl ? 'Regenerate Speech' : 'Generate Speech'}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
      {audioUrl && (
        <div className="w-full md:w-1/4">
          <p className="text-base py-3">Records</p>
          <div className="border rounded-xl  dark:bg-zinc-900 dark:border-zinc-700  p-5">
            <Mp3Player src={audioUrl} title={audioText} />
          </div>
        </div>
      )}
    </div>
  )
}

export default VoiceGenerator
