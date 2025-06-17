export {
    useChatStore,
    useChatMessages,
    useChatLoading,
    useChatError,
    useSendMessage,
    useAddMessage,
    useClearMessages,
    useSetError,
    useSetLoading,
    type ChatMessage
} from './chatStore'

export {
    useUserStore,
    useUser,
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
    useGoalName
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