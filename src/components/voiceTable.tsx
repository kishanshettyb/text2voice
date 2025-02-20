import React, { useEffect, useState } from 'react'
import { DataTable } from './dataTable'
import { columns } from '@/app/config/voicesColumns'

// Define the type for each voice object
interface Voice {
  name: string
  ssmlGender: string
  languageCodes: string[]
}

function Voicetable() {
  const [voices, setVoices] = useState([])
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

  // Extract accent from language code
  const extractAccent = (code: string): string => {
    return code.split('-')[1] || 'N/A'
  }

  useEffect(() => {
    // Get Country Flag URL - Move this inside useEffect
    const getFlagUrl = (code: string): string => {
      const country = code.split('-')[1]?.toLowerCase() || 'us' // default to 'us' if no code is provided
      return `https://flagcdn.com/w320/${country}.png`
    }

    async function fetchVoices() {
      if (Object.keys(languageMap).length === 0) return // Wait until languageMap is loaded

      try {
        const response = await fetch('/api/voices')
        if (!response.ok) {
          throw new Error('Failed to fetch voices')
        }
        const data = await response.json()

        // Transforming the data
        const formattedData = data.voices.map((voice: Voice) => ({
          name: voice.name,
          gender: voice.ssmlGender.charAt(0) + voice.ssmlGender.slice(1).toLowerCase(), // Convert "FEMALE" → "Female"
          language: languageMap[voice.languageCodes[0]] || voice.languageCodes[0], // Convert "en-US" → "English (US)"
          accent: extractAccent(voice.languageCodes[0]), // Extract "US" from "en-US"
          flag: getFlagUrl(voice.languageCodes[0]),
          languageraw: voice.languageCodes[0]
        }))

        setVoices(formattedData)
      } catch (error) {
        console.error('Error loading voice data:', error)
      }
    }

    fetchVoices()
  }, [languageMap]) // No need to include getFlagUrl as it's inside useEffect now

  return (
    <div>
      <DataTable columns={columns} data={voices} />
    </div>
  )
}

export default Voicetable
