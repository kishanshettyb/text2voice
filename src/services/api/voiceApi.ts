export const getAllVoices = async () => {
  const response = await fetch('./api/voices') // Adjust the API route if needed
  if (!response.ok) {
    throw new Error('Failed to fetch voices')
  }
  return response.json()
}
