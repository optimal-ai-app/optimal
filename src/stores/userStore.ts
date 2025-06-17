import { create } from 'zustand'
import httpService from '../../services/httpService'
import { User } from './types'

interface UserState {
    id: string
    userName: string
    email: string
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
    id: 'f506545e-8ad0-43fe-958f-7a5e8e94d7c9',
    userName: '',
    email: '',
    isLoading: false,
    error: null,

    // Actions
    setUser: (user: User) => {
        set({ id: user?.id, userName: user?.userName, email: user?.email })
    },

    clearUser: () => {
        set({ id: '', userName: '', email: '' })
    },

    setError: (error: string | null) => {
        set({ error })
    },

    setLoading: (loading: boolean) => {
        set({ isLoading: loading })
    },
}))

// Selector hooks for better performance
export const useUserId = () => useUserStore(state => state.id)
export const useUserName = () => useUserStore(state => state.userName)
export const useUserEmail = () => useUserStore(state => state.email)
export const useUserLoading = () => useUserStore(state => state.isLoading)
export const useUserError = () => useUserStore(state => state.error)
export const useSetUser = () => useUserStore(state => state.setUser)
export const useClearUser = () => useUserStore(state => state.clearUser)
export const useSetError = () => useUserStore(state => state.setError)
export const useSetLoading = () => useUserStore(state => state.setLoading)
