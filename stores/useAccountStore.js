import create from "zustand"
import { persist } from "zustand/middleware"

export const useAccountStore = create(set => ({
  userData: null,
  setUserData: u => set({ userData: u }),
  setUpdateUserData: update =>
    set(state => Object.assign(state.userData, update)),
}))
