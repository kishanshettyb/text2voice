import { create } from 'zustand'

interface TitleSaveStore {
  titleSave: boolean
  /*eslint-disable*/
  setTitleSave: (fileTitle: boolean) => void
  /*eslint-enable*/
}

const useTitleSaveStore = create<TitleSaveStore>((set) => ({
  titleSave: false,
  setTitleSave: (fileTitle) => set({ titleSave: fileTitle })
}))

export default useTitleSaveStore
