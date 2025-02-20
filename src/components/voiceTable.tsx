import React, { useEffect, useState } from 'react'
import { DataTable } from './dataTable'
import { columns } from '@/app/config/voicesColumns'
import { useGetAllVoices } from '@/services/queries/voices'

// Define the type for each voice object
interface Voice {
  name: string
  ssmlGender: string
  languageCodes: string[]
}

function Voicetable() {
  const newData = useGetAllVoices()
  const [voices, setVoices] = useState<Voice[]>([])
  const [languageMap, setLanguageMap] = useState<{ [key: string]: string }>({})

  // Fetch language map from public/language.json
  useEffect(() => {
    async function fetchLanguageMap() {
      try {
        const response = await fetch('/language.json') // Fetch from public folder
        if (!response.ok) {
          throw new Error('Failed to fetch language map')
        }
        const data = await response.json()
        setLanguageMap(data) // Store language map in state
      } catch (error) {
        console.error('Error fetching language map:', error)
      }
    }

    fetchLanguageMap()
  }, [])

  // Function to extract accent from language code
  const extractAccent = (code: string): string => {
    return code.split('-')[1] || 'N/A'
  }

  // Get Country Flag URL
  const getFlagUrl = (code: string): string => {
    const country = code.split('-')[1]?.toLowerCase() || 'us' // default to 'us' if no code is provided
    return `https://flagcdn.com/w320/${country}.png`
  }

  // This useEffect triggers once newData and languageMap are available
  useEffect(() => {
    if (!newData.data || Object.keys(languageMap).length === 0) {
      return // Don't run the effect if necessary data is not available
    }

    const formattedData = newData.data?.voices?.map((voice: Voice) => ({
      name: voice.name,
      gender: voice.ssmlGender.charAt(0) + voice.ssmlGender.slice(1).toLowerCase(), // Convert "FEMALE" → "Female"
      language: languageMap[voice.languageCodes[0]] || voice.languageCodes[0], // Convert "en-US" → "English (US)"
      accent: extractAccent(voice.languageCodes[0]), // Extract "US" from "en-US"
      flag: getFlagUrl(voice.languageCodes[0]),
      languageraw: voice.languageCodes[0]
    }))
    setVoices(formattedData)
  }, [newData.data, languageMap]) // Depend on both newData and languageMap

  if (newData.isLoading) {
    return <span className="text-white flex justify-center items-center">Loading...</span>
  }

  if (newData.isError) {
    return (
      <span className="text-white flex justify-center items-center">
        Error: {newData.error?.message}
      </span>
    )
  }

  return (
    <div>
      <DataTable columns={columns} data={voices} />
    </div>
  )
}

export default Voicetable
