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
import { getUserId } from '@/utils/localStorage'
import { TitleBar } from '@/components/titleBar'
import useTitleStore from '@/store/title'
import useTitleSaveStore from '@/store/titleSave'

// Form schema using Zod for validation
const formSchema = speechSchema
interface RequestData {
  text: string
  speed: string
  userId: string
}
interface SendData {
  uid: string
  voices: string
  token: string
  title: string
}

// Function to call the API and generate the speech
const generateSpeech = async (requestData: RequestData) => {
  const response = await fetch('../../api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData)
  })

  const data = await response.json()
  console.log(data)
  if (!response.ok || !data) {
    throw new Error('Failed to generate speech')
  }
  return data
}

const uploadTextToSpeech = async (sendData: SendData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/text-to-voice-generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sendData.token}`
    },
    body: JSON.stringify({
      data: {
        uid: sendData.uid,
        voices: sendData.voices,
        title: sendData.title
      }
    })
  })

  const data = await response.json()
  if (!response.ok || !data) {
    throw new Error('Failed to generate speech')
  }
  return data
}

function VoiceGenerator() {
  const fileTitle = useTitleStore((state) => state.title) || 'United'
  const params = useParams()
  const [pageUid, setPageUid] = useState('')
  const uid = params?.uid // Extract 'uid' from params

  useEffect(() => {
    console.log('Extracted UID:', uid)
    setPageUid(uid)
  }, [uid])

  const [isOpen, setIsOpen] = useState(false)
  const voiceSpeed = useVoiceStore((state) => state.voiceSpeed) || '1.0x'
  const titleSaved = useTitleSaveStore((state) => state.titleSave) || false
  const [audioUrl, setAudioUrl] = useState<string>('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: ''
    },
    mode: 'onChange'
  })

  // Use TanStack Query's useMutation for generating speech
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: generateSpeech,
    onSuccess: (data) => {
      setAudioUrl(data.audioUrl)
      const uid = pageUid
      const token = data.token
      const title = fileTitle
      const voices = data.strapiData.data.documentId
      const sendData = {
        uid,
        token,
        voices,
        title
      }
      uploadTextToSpeech(sendData)
    }
  })

  // Handle form submission and trigger speech generation
  function onSubmit(values: z.infer<typeof formSchema>) {
    const userId = getUserId()
    console.log(userId)
    const requestData = {
      ...values,
      speed: voiceSpeed,
      userId: userId
    }
    mutateAsync(requestData)
  }

  // Update title in Zustand store based on the first 50 words in the textarea
  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (titleSaved == false) {
      const text = event.target.value
      const title = text.slice(0, 30) // Take only the first 10 characters
      useTitleStore.getState().settitle(title)
    }
  }
  return (
    <div className="flex flex-col md:flex-row gap-x-6 gap-y-6 lg:gap-y-0 pt-3">
      <div className={`w-full ${audioUrl ? `md:w-3/4>` : ``}`}>
        {/* <p className="mb-3 font-semibold">Title</p> */}
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
                <div className=" flex justify-start">
                  <div className="w-1/4">
                    <Button
                      disabled={!form.formState.isValid || isPending}
                      type="submit"
                      size="lg"
                      className="bg-green-500 text-white hover:bg-green-600 mt-4 text-lg   py-6   w-full"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="animate-spin" size={30} />
                          {audioUrl ? `Regenerating...` : `Generating...`}
                        </>
                      ) : (
                        <>
                          <Zap size={30} />
                          {audioUrl ? `Regenerate` : `Generate`}
                        </>
                      )}
                    </Button>
                    {isError && (
                      <p className="text-sm text-red-500 mt-5">{(error as Error).message}</p>
                    )}
                    <p className="text-sm my-5 text-zinc-500 hidden">
                      There are no audio samples in this paragraph yet. Click the button above to
                      generate the first one.
                    </p>
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
            <Mp3Player title="test" src={audioUrl} />
          </div>
        </div>
      )}
    </div>
  )
}

export default VoiceGenerator
