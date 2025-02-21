export const getAllVoices = async () => {
  const response = await fetch('./api/voices')
  if (!response.ok) {
    throw new Error('Failed to fetch voices')
  }
  return response.json()
}

export const getAllLanguages = async () => {
  const response = await fetch('./language.json')
  if (!response.ok) {
    throw new Error('Failed to fetch voices')
  }
  return response.json()
}

// interface VoiceProps {
//   languge: string;
//   text: string;
//   voice: string;
// }

// export const createVoicePaly = async (data: VoiceProps) => {
//   const response = await fetch("/api/new", {
//     method: "POST",
//     body: JSON.stringify(data), // Use the provided data directly
//     headers: { "Content-Type": "application/json" },
//   });

//   if (!response.ok) {
//     // Handle errors appropriately
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   return response.json();
// };
