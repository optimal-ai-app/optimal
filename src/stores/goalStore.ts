import { create } from 'zustand'
import { Goal } from './types'
import { goals } from './data'
import httpService from '@/services/httpService'
import { useUserId } from './userStore'

interface GoalState {
    goals: Goal[]
    error: string | null
    isLoading: boolean
    goalMap: Map<string, Goal>
    selectedGoal: Goal | null
}

interface GoalActions {
    //add get userGoals later (connects to backend)
    addGoal: (goal: Goal, userId: string, tags?: string[]) => void
    updateGoal: (goal: Goal) => void
    deleteGoal: (goal: Goal) => void
    getGoals: () => Goal[]
    getGoal: (id: string) => Goal | null
    getGoalName: (goalId?: string) => string | null
    setError: (error: string | null) => void
    setLoading: (loading: boolean) => void
    fetchUserGoals: (userId: string) => Promise<void>
}

type GoalStore = GoalActions & GoalState

// Zustand store
export const useGoalStore = create<GoalStore>((set, get) => ({
    // Initial state
    goals: [],
    isLoading: false,
    error: null,
    goalMap: new Map(goals.map(goal => [goal.id, goal])),
    selectedGoal: null,
    // Actions
    addGoal: async (goal: Goal, userId: string, tags?: string[]) => {
        const { setLoading, setError } = get()
        try {
            setLoading(true)
            setError(null)
            set(state => ({
                goals: [...state.goals, goal]
            }))
            const requestBody = {
                userId: userId,
                title: goal.title,
                description: goal.description,
                dueDate: goal.dueDate,
                tags: tags || goal.tags
            }
            console.log('POST /api/goals/create →', JSON.stringify(requestBody, null, 2))

            const response = await httpService.post('/api/goals/create', requestBody)
            console.log(response)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to add goal')
        } finally {
            setLoading(false)
        }
    },

    updateGoal: (goal: Goal) => {
        set(state => ({
            goals: state.goals.map(g => g.id === goal.id ? goal : g),
            goalMap: new Map(state.goalMap).set(goal.id, goal)
        }))
    },

    deleteGoal: async (goal: Goal) => {
        const { setLoading, setError } = get()
        try {
            setLoading(true)
            setError(null)

            // Call backend to delete goal
            await httpService.delete(`/api/goals/${goal.id}`)

            // Remove from local state
            set(state => {
                const newMap = new Map(state.goalMap)
                newMap.delete(goal.id)
                return {
                    goals: state.goals.filter(g => g.id !== goal.id),
                    goalMap: newMap
                }
            })
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to delete goal')
        } finally {
            setLoading(false)
        }
    },

    getGoals: () => {
        return get().goals
    },

    fetchUserGoals: async (userId: string) => {
        const { setLoading, setError } = get()
        try {
            setLoading(true)
            setError(null)
            const response = await httpService.get<any[]>(`api/goals/user/${userId}`)
            // Transform backend task format to frontend format
            const transformedGoals: Goal[] = response.map(goal => ({
                id: goal.id,
                userId: goal.userId,
                title: goal.title,
                description: goal.description,
                progress: goal.progress,
                streak: goal.streak,
                createdAt: new Date(goal.createdDate),
                dueDate: goal.dueDate ? new Date(goal.dueDate) : new Date(),
                status: goal.status,
                tags: goal.tags,
                updatedAt: new Date(goal.updatedDate)
            }))
            set(state => ({
                goalMap: new Map(transformedGoals.map(goal => [goal.id, goal]))
            }))
            set({ goals: transformedGoals })
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to fetch goals')
            set({ goals: goals })
            setError(null)
        } finally {
            setLoading(false)
        }
    },

    getGoal: (id: string) => {
        const goal = get().goals.find(g => g.id === id)
        if (!goal) return null
        return goal
    },

    getGoalName: (goalId?: string) => {
        if (!goalId) return null
        const goal = get().goalMap.get(goalId)
        return goal ? goal.title : null
    },

    setError: (error: string | null) => {
        set({ error })
    },

    setLoading: (loading: boolean) => {
        set({ isLoading: loading })
    },

    setSelectedGoal: (goal: Goal) => {
        set({ selectedGoal: goal })
    },

    getSelectedGoal: () => {
        return get().selectedGoal
    }
}))

// Selector hooks for better performance
export const useGoals = () => useGoalStore(state => state.goals)
export const useGoalLoading = () => useGoalStore(state => state.isLoading)
export const useGoalError = () => useGoalStore(state => state.error)
export const useAddGoal = () => useGoalStore(state => state.addGoal)
export const useUpdateGoal = () => useGoalStore(state => state.updateGoal)
export const useDeleteGoal = () => useGoalStore(state => state.deleteGoal)
export const useGetGoals = () => useGoalStore(state => state.getGoals)
export const useGetGoal = (goalId: string) => useGoalStore(state => state.getGoal(goalId))
export const useGoalName = (goalId?: string) =>
    useGoalStore(state => state.getGoalName(goalId))
export const useFetchUserGoals = () => useGoalStore(state => state.fetchUserGoals)
export const useSelectedGoal = () => useGoalStore(state => state.selectedGoal)