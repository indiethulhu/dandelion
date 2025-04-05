import { create } from 'zustand'

interface SessionState {
  token: string | null
  login: (token: string) => void
  logout: () => void
}

export const useSessionStore = create<SessionState>((set) => ({
  token: null,
  login: (token) => set({ token }),
  logout: () => set({ token: null })
}))
