import { useEffect } from 'react'
import { useUserId } from '../stores/userStore'
import { useGoalError, useGoalLoading, useGoals } from '../stores/goalStore'
import { useFetchUserGoals } from '../stores/goalStore'

/**
 * Hook that automatically fetches goals when a user ID exists
 * Returns loading and error states for the goal fetching operation
 */
export const useUserGoals = () => {
    const userId = useUserId()
    const fetchUserGoals = useFetchUserGoals()
    const isLoading = useGoalLoading()
    const error = useGoalError()
    const goals = useGoals()

    useEffect(() => {
        if (userId) {
            fetchUserGoals(userId)
        }
    }, [userId, fetchUserGoals])

    return {
        isLoading,
        error,
        hasUser: !!userId,
        goals
    }
} 