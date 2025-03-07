import React, { useEffect, useState } from 'react'
import { DataTable } from './dataTable'
import { columns } from '@/app/config/voicesColumns'
import { useGetAllLanguages, useGetAllVoices } from '@/services/queries/voices'
import { FormattedVoice } from '@/types/formattedVoice' // Import FormattedVoice

interface VoiceProps {
  name: string
  ssmlGender: string
  languageCodes: string[]
}

type LanguageMap = Record<string, string>

function Voicetable() {
  const newData = useGetAllVoices()
  const newLanguages = useGetAllLanguages()
  const [voices, setVoices] = useState<FormattedVoice[]>([])
  const [languageMap, setLanguageMap] = useState<LanguageMap>({})

  const extractAccent = (code: string): string => {
    return code.split('-')[1] || 'N/A'
  }

  const getFlagUrl = (code: string): string => {
    const country = code.split('-')[1]?.toLowerCase() || 'us' // default to 'us' if no code is provided
    return `https://flagcdn.com/w320/${country}.png`
  }

  useEffect(() => {
    if (newLanguages?.data && typeof newLanguages.data === 'object') {
      setLanguageMap(newLanguages.data as LanguageMap)
    }
  }, [newLanguages?.data])

  useEffect(() => {
    if (!newData.data?.voices || Object.keys(languageMap).length === 0) {
      return
    }

    const formattedData: FormattedVoice[] = newData.data.voices.map((voice: VoiceProps) => ({
      name: voice.name,
      gender: voice.ssmlGender.charAt(0) + voice.ssmlGender.slice(1).toLowerCase(), // Convert "FEMALE" → "Female"
      language: languageMap[voice.languageCodes[0]] || voice.languageCodes[0], // Convert "en-US" → "English (US)"
      accent: extractAccent(voice.languageCodes[0]), // Extract "US" from "en-US"
      flag: getFlagUrl(voice.languageCodes[0]),
      languageraw: voice.languageCodes[0],
      paly: () => console.log(`Playing voice: ${voice.name}`) // Dummy function
    }))

    setVoices(formattedData)
  }, [newData.data, languageMap])

  if (newData.isLoading) {
    return <div className="dark:text-white flex justify-center items-center">Loading...</div>
  }

  if (newData.isError) {
    return (
      <div className="dark:text-white flex justify-center items-center">
        Error: {newData.error?.message}
      </div>
    )
  }

  return (
    <div>
      <DataTable columns={columns} data={voices} />
    </div>
  )
}

export default Voicetable
