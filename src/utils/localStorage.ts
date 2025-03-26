export const getUserId = () => {
  const storedUser = localStorage.getItem('user')

  if (!storedUser) return ''

  try {
    const parsedUser = JSON.parse(storedUser) // Parse JSON
    return parsedUser.documentId || '' // Get user ID
  } catch (error) {
    console.error('Error parsing user from localStorage:', error)
    return ''
  }
}
