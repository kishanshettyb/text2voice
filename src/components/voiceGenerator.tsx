'use client'

import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import { ChevronDown, Download, Loader2, PlayCircle, Volume2, Zap } from 'lucide-react'
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
import { PlayProgress } from './playProgress'
import { useAuth } from '@/context/AuthProvider'

// Form schema using Zod for validation
const formSchema = speechSchema
interface RequestData {
  text: string
  speed: string
  userId: string
}

// Function to call the API and generate the speech
const generateSpeech = async (requestData: RequestData) => {
  const response = await fetch('../api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData)
  })

  const data = await response.json()
  if (!response.ok || !data.audioUrl) {
    throw new Error('Failed to generate speech')
  }
  return data.audioUrl
}

function VoiceGenerator() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const voiceSpeed = useVoiceStore((state) => state.voiceSpeed) || '1.0x'
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
    onSuccess: (audioUrl) => {
      setAudioUrl(audioUrl)
    }
  })

  // Handle form submission and trigger speech generation
  function onSubmit(values: z.infer<typeof formSchema>) {
    const requestData = {
      ...values,
      speed: voiceSpeed,
      userId: user.documentId
    }
    mutateAsync(requestData)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col md:flex-row gap-x-6 gap-y-6 lg:gap-y-0 p-6">
            <div className="w-full md:w-3/4">
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full md:w-1/4">
              <div className="border rounded-xl dark:bg-zinc-900 dark:border-zinc-700  p-5">
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
                {isError && <p className="text-sm text-red-500 mt-5">{(error as Error).message}</p>}
                <p className="text-sm mt-5 text-zinc-500">
                  There are no audio samples in this paragraph yet. Click the button above to
                  generate the first one.
                </p>
                {/* {audioUrl && ( */}
                <>
                  <div className="border w-full border-x-0 border-zinc-200 dark:border-zinc-600 my-5 border-b-0"></div>
                  <div className="flex ">
                    <div className="cursor-pointer">
                      <PlayCircle />
                    </div>
                    <div>
                      <PlayProgress />
                    </div>
                    <div className="cursor-pointer">
                      <Download />
                    </div>
                  </div>
                </>
                {/* )} */}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}

export default VoiceGenerator
