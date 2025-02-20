'use client'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import { ChevronDown, Volume2, Zap } from 'lucide-react'
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

const formSchema = speechSchema
interface RequestData {
  text: string
  speed: string
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(JSON.stringify(values) + voiceSpeed)
    const requestData = {
      ...values,
      speed: voiceSpeed
    }
    handleGenerateSpeech(requestData)
  }

  const handleGenerateSpeech = async (requestData: RequestData) => {
    const response = await fetch('../api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    })

    const data = await response.json()
    if (data.audioUrl) {
      setAudioUrl(data.audioUrl)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col md:flex-row gap-x-6 gap-y-6 lg:gap-y-0 p-6">
            <div className="w-full md:w-3/4">
              <div className="border rounded-xl bg-zinc-800 border-zinc-700 p-6">
                <div className="flex mb-5 flex-row items-center justify-start gap-x-4">
                  <div>
                    <Button
                      onClick={() => setIsOpen(true)}
                      className="border-zinc-600 bg-zinc-700 border"
                    >
                      <Volume2 /> Voice
                      <ChevronDown />
                    </Button>
                    <CustomModal
                      modalSize="md:max-w-[600px]"
                      title="Select your voice"
                      desc="Select voice"
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
                          className="border-zinc-600 rounded-lg active:border-zinc-500 focus:border-zinc-500 text-white"
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
              <div className="border rounded-xl bg-zinc-800 border-zinc-700  p-5">
                {audioUrl != '' ? (
                  <div className="border rounded-2xl text-white flex justify-center items-center border-zinc-700 p-4">
                    Download here
                  </div>
                ) : (
                  <></>
                )}
                <Button
                  disabled={!form.formState.isValid}
                  type="submit"
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-500 mt-4 text-lg shadow-2xl py-6 shadow-blue-900 w-full"
                >
                  <Zap size={30} />
                  Generate
                </Button>
                <p className="text-sm mt-5 text-zinc-500">
                  There are no audio samples in this paragraph yet. Click the button above to
                  generate the first one.
                </p>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  )
}

export default VoiceGenerator
