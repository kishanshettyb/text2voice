// /src/utils/api.ts

import Cookies from 'js-cookie'
interface RequestData {
  text: string
  speed: string
  userId: string | undefined
}
interface SendData {
  uid: string
  voices: string
  token: string
  title: string
  userId: string
}

export const generateSpeech = async (requestData: RequestData) => {
  const response = await fetch('../../api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData)
  })

  const data = await response.json()
  if (!response.ok || !data) {
    throw new Error('Failed to generate speech')
  }
  return data
}

export const uploadTextToSpeech = async (sendData: SendData) => {
  const userId = Cookies.get('userId')
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
        title: sendData.title,
        users_permissions_user: userId
      }
    })
  })

  const data = await response.json()
  if (!response.ok || !data) {
    throw new Error('Failed to generate speech')
  }
  return data
}
