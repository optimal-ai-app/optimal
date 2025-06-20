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

export interface ChatSession {
    id: string
    title: string
    lastMessage: string
    timestamp: Date
    messages: ChatMessage[]
}

interface ChatState {
    messages: ChatMessage[]
    isLoading: boolean
    error: string | null
    chatSessions: ChatSession[]
    currentSessionId: string | null
}

interface ChatActions {
    sendMessage: (message: string, context?: ChatMessage['context'], userId?: string) => Promise<void>
    addMessage: (message: ChatMessage) => void
    clearMessages: () => void
    setError: (error: string | null) => void
    setLoading: (loading: boolean) => void
    createNewChat: () => void
    loadChatSession: (sessionId: string) => void
    getChatSessions: () => ChatSession[]
    saveChatSession: () => void
}

type ChatStore = ChatState & ChatActions

// Generate a chat title from the first user message
const generateChatTitle = (firstMessage: string): string => {
    const words = firstMessage.split(' ').slice(0, 6)
    return words.length < firstMessage.split(' ').length
        ? words.join(' ') + '...'
        : words.join(' ')
}

// Zustand store
export const useChatStore = create<ChatStore>((set, get) => ({
    // Initial state
    messages: [],
    isLoading: false,
    error: null,
    chatSessions: [],
    currentSessionId: null,

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

            set(state => ({
                messages: [...state.messages, userMessage]
            }))

            // Send message to backend
            const response = await httpService.post<any>('/chat', {
                date: new Date().toISOString(),
                userId: userId || 'user123',
                messages: get().messages.map(msg => ({
                    role: msg.role,
                    content: JSON.stringify(msg.content)
                }))
            })

            // Validate response
            if (!response) {
                throw new Error('Invalid response from agent')
            }

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

            // Auto-save chat session after successful exchange
            get().saveChatSession()

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
    },

    createNewChat: () => {
        // Save current chat if it has messages
        if (get().messages.length > 0) {
            get().saveChatSession()
        }

        // Clear current chat and create new session
        set({
            messages: [],
            currentSessionId: null,
            error: null
        })
    },

    loadChatSession: (sessionId: string) => {
        const session = get().chatSessions.find(s => s.id === sessionId)
        if (session) {
            set({
                messages: session.messages,
                currentSessionId: sessionId,
                error: null
            })
        }
    },

    getChatSessions: () => {
        return get().chatSessions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    },

    saveChatSession: () => {
        const { messages, currentSessionId, chatSessions } = get()

        if (messages.length === 0) return

        const firstUserMessage = messages.find(m => m.role === 'user')
        if (!firstUserMessage) return

        const title = generateChatTitle(firstUserMessage.content.summary)
        const lastMessage = messages[messages.length - 1]?.content.summary || ''
        const timestamp = new Date()

        if (currentSessionId) {
            // Update existing session
            const updatedSessions = chatSessions.map(session =>
                session.id === currentSessionId
                    ? { ...session, messages, lastMessage, timestamp }
                    : session
            )
            set({ chatSessions: updatedSessions })
        } else {
            // Create new session
            const newSession: ChatSession = {
                id: Date.now().toString(),
                title,
                lastMessage,
                timestamp,
                messages: [...messages]
            }

            set({
                chatSessions: [newSession, ...chatSessions],
                currentSessionId: newSession.id
            })
        }
    }
}))

// Selector hooks for better performance
export const useChatMessages = () => useChatStore(state => state.messages)
export const useChatLoading = () => useChatStore(state => state.isLoading)
export const useChatError = () => useChatStore(state => state.error)
export const useChatSessions = () => useChatStore(state => state.getChatSessions())

// Individual action hooks to prevent object recreation
export const useSendMessage = () => useChatStore(state => state.sendMessage)
export const useAddMessage = () => useChatStore(state => state.addMessage)
export const useClearMessages = () => useChatStore(state => state.clearMessages)
export const useSetError = () => useChatStore(state => state.setError)
export const useSetLoading = () => useChatStore(state => state.setLoading)
export const useCreateNewChat = () => useChatStore(state => state.createNewChat)
export const useLoadChatSession = () => useChatStore(state => state.loadChatSession)
export const useSaveChatSession = () => useChatStore(state => state.saveChatSession)