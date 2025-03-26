import { create } from 'zustand'

interface TitleStore {
  title: string
  /*eslint-disable*/
  settitle: (fileTitle: string) => void
  /*eslint-enable*/
}

const useTitleStore = create<TitleStore>((set) => ({
  title: 'United',
  settitle: (fileTitle) => set({ title: fileTitle })
}))

export default useTitleStore
