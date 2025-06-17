import { create } from 'zustand'
import httpService from '../../services/httpService'
import { User } from './types'

interface UserState {
    user: User
    error: string | null
    isLoading: boolean
}

interface UserActions {
    //add login and sign up later
    setUser: (user: User) => void
    clearUser: () => void
    setError: (error: string | null) => void
    setLoading: (loading: boolean) => void
}

type UserStore = UserActions & UserState

// Zustand store
export const useUserStore = create<UserStore>((set, get) => ({
    // Initial state
    user: null,
    isLoading: false,
    error: null,

    // Actions
    setUser: (user: User) => {
        set({ user })
    },

    clearUser: () => {
        set({ user: null })
    },

    setError: (error: string | null) => {
        set({ error })
    },

    setLoading: (loading: boolean) => {
        set({ isLoading: loading })
    },
}))

// Selector hooks for better performance
export const useUser = () => useUserStore(state => state.user)
export const useUserLoading = () => useUserStore(state => state.isLoading)
export const useUserError = () => useUserStore(state => state.error)
export const useSetUser = () => useUserStore(state => state.setUser)
export const useClearUser = () => useUserStore(state => state.clearUser)
export const useSetError = () => useUserStore(state => state.setError)
export const useSetLoading = () => useUserStore(state => state.setLoading)
