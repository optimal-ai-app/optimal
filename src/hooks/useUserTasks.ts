import { useEffect } from 'react'
import { useUserId } from '../stores/userStore'
import { useFetchUserTasks, useTaskLoading, useTaskError, useTasks } from '../stores/taskStore'

/**
 * Hook that automatically fetches tasks when a user ID exists
 * Returns loading and error states for the task fetching operation
 */
export const useUserTasks = () => {
    const userId = useUserId()
    const fetchUserTasks = useFetchUserTasks()
    const isLoading = useTaskLoading()
    const error = useTaskError()
    const tasks = useTasks()

    useEffect(() => {
        if (userId) {
            fetchUserTasks(userId)
        }
    }, [userId, fetchUserTasks])

    return {
        isLoading,
        error,
        hasUser: !!userId,
        tasks
    }
} 