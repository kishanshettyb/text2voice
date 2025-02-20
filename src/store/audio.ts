import { create } from 'zustand'

interface AudioStore {
  playingVoice: string | null
  /*eslint-disable*/
  setPlayingVoice: (voice: string | null) => void
  audio: HTMLAudioElement | null
  /*eslint-disable*/
  setAudio: (audio: HTMLAudioElement | null) => void
  /*eslint-enable*/
}

const useAudioStore = create<AudioStore>((set) => ({
  playingVoice: null,
  setPlayingVoice: (voice) => set({ playingVoice: voice }),
  audio: null,
  setAudio: (audio) => set({ audio })
}))
export default useAudioStore
