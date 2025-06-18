import { create } from 'zustand'
import httpService from '../../services/httpService'

// Types
export interface ChatMessage {
    id: string
    content: {
        summary: string
        tags: string[]
    }
    role: 'user' | 'agent'
    timestamp: Date
    context?: {
        type: 'goal_response' | 'goal_setting' | 'help_request'
        value?: string
    }
}

interface ChatState {
    messages: ChatMessage[]
    isLoading: boolean
    error: string | null
}

interface ChatActions {
    sendMessage: (message: string, context?: ChatMessage['context'], userId?: string) => Promise<void>
    addMessage: (message: ChatMessage) => void
    clearMessages: () => void
    setError: (error: string | null) => void
    setLoading: (loading: boolean) => void
}

type ChatStore = ChatState & ChatActions

// Zustand store
export const useChatStore = create<ChatStore>((set, get) => ({
    // Initial state
    messages: [],
    isLoading: false,
    error: null,

    // Actions
    sendMessage: async (message: string, context?: ChatMessage['context'], userId?: string) => {
        try {
            set({ isLoading: true, error: null })

            // Add user message to store
            const userMessage: ChatMessage = {
                id: Date.now().toString(),
                content: {
                    summary: message,
                    tags: []
                },
                role: 'user',
                timestamp: new Date(),
                context
            }

            console.log('userMessage', userMessage)
            console.log('messages', get().messages)
            console.log('context', context)

            set(state => ({
                messages: [...state.messages, userMessage]
            }))

            // Send message to backend
            console.log('messages', get().messages)
            const response = await httpService.post<any>('/chat', {
                date: new Date().toISOString(),
                userId: userId || 'user123', // Add userId to request
                messages: get().messages.map(msg => ({
                    role: msg.role,
                    content: JSON.stringify(msg.content)
                }))
            })

            // Validate response
            if (!response) {
                throw new Error('Invalid response from agent')
            }
            console.log('response', response)

            // Add agent response to store
            const agentMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                content: {
                    summary: response.content,
                    tags: response.tags
                },
                role: 'agent',
                timestamp: new Date()
            }

            set(state => ({
                messages: [...state.messages, agentMessage],
                isLoading: false
            }))

        } catch (error: any) {
            set({
                error: 'the agent is down right now',
                isLoading: false
            })

            // Add error message from agent
            const errorAgentMessage: ChatMessage = {
                id: (Date.now() + 2).toString(),
                content: {
                    summary: 'the agent is down right now',
                    tags: []
                },
                role: 'agent',
                timestamp: new Date()
            }

            set(state => ({
                messages: [...state.messages, errorAgentMessage]
            }))
        }
    },

    addMessage: (message: ChatMessage) => {
        set(state => ({
            messages: [...state.messages, message]
        }))
    },

    clearMessages: () => {
        set({ messages: [], error: null })
    },

    setError: (error: string | null) => {
        set({ error })
    },

    setLoading: (loading: boolean) => {
        set({ isLoading: loading })
    }
}))

// Selector hooks for better performance
export const useChatMessages = () => useChatStore(state => state.messages)
export const useChatLoading = () => useChatStore(state => state.isLoading)
export const useChatError = () => useChatStore(state => state.error)

// Individual action hooks to prevent object recreation
export const useSendMessage = () => useChatStore(state => state.sendMessage)
export const useAddMessage = () => useChatStore(state => state.addMessage)
export const useClearMessages = () => useChatStore(state => state.clearMessages)
export const useSetError = () => useChatStore(state => state.setError)
export const useSetLoading = () => useChatStore(state => state.setLoading) 