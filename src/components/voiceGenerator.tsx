'use client'

import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
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
import { useCreateGeneratedVoicesMutation } from '@/services/mutation/voice'

// Form schema using Zod for validation
const formSchema = speechSchema
interface RequestData {
  text: string
  speed: string
  user_id: string
}

// Function to call the API and generate the speech
const generateSpeech = async (requestData: RequestData) => {
  const response = await fetch('../../api/tts', {
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
      createHolidayMutation.mutate(holiday)
    }
  })

  const holiday = {
    data: {
      uid: '6e3dd23a-a866-4455-bfae-262da68cc799',
      voices: 'mdcganhy0p5zmbd6jvckiqyf',
      title: '1 generated from postman 1'
    }
  }
  const createHolidayMutation = useCreateGeneratedVoicesMutation()

  // Handle form submission and trigger speech generation
  function onSubmit(values: z.infer<typeof formSchema>) {
    const requestData = {
      ...values,
      speed: voiceSpeed
    }
    mutateAsync(requestData)
  }

  return (
    <div className="flex flex-col md:flex-row gap-x-6 gap-y-6 lg:gap-y-0 p-6">
      <div className={`w-full ${audioUrl ? `md:w-3/4>` : ``}`}>
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
          <div className="border rounded-xl  dark:bg-zinc-900 dark:border-zinc-700  p-5">
            <Mp3Player title="test" src={audioUrl} />
          </div>
        </div>
      )}
    </div>
  )
}

export default VoiceGenerator
