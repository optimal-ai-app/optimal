export {
    useChatStore,
    useChatMessages,
    useChatLoading,
    useChatError,
    useSendMessage,
    useSendMessageAndCreateNewChat,
    useAddMessage,
    useClearMessages,
    useSetError,
    useSetLoading,
    useChatSessions,
    useCreateNewChat,
    useLoadChatSession,
    useSaveChatSession,
    type ChatMessage,
    type ChatSession
} from './chatStore'

export {
    useUserStore,
    useUserId,
    useUserName,
    useUserEmail,
    useUserLoading,
    useUserError,
    useSetUser,
    useClearUser
} from './userStore'

export {
    useGoalStore,
    useGoals,
    useGoalLoading,
    useGoalError,
    useAddGoal,
    useUpdateGoal,
    useDeleteGoal,
    useGetGoals,
    useGetGoal,
    useGoalName,
    useFetchUserGoals
} from './goalStore'

export {
    useTaskStore,
    useTasks,
    useTaskLoading,
    useTaskError,
    useAddTask,
    useUpdateTask,
    useDeleteTask,
    useGetTasks,
    useGetTask,
    useGetTasksByGoal,
    useFetchUserTasks
} from './taskStore'

// Export all types from the types file
export {
    type User,
    type Goal,
    type Task
} from './types'