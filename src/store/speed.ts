import { create } from 'zustand'

interface VoiceStore {
  voiceSpeed: string
  /*eslint-disable*/
  setVoiceSpeed: (speed: string) => void
  /*eslint-enable*/
}

const useVoiceStore = create<VoiceStore>((set) => ({
  voiceSpeed: '1.0x',
  setVoiceSpeed: (speed) => set({ voiceSpeed: speed })
}))

export default useVoiceStore
