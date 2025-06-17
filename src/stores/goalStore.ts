import { create } from 'zustand'
import { Goal } from './types'
import { goals } from './data'

interface GoalState {
    goals: Goal[]
    error: string | null
    isLoading: boolean
    goalMap: Map<string, Goal>
}

interface GoalActions {
    //add get userGoals later (connects to backend)
    addGoal: (goal: Goal) => void
    updateGoal: (goal: Goal) => void
    deleteGoal: (goal: Goal) => void
    getGoals: () => Goal[]
    getGoal: (id: string) => Goal
    getGoalName: (goalId?: string) => string | null
    setError: (error: string | null) => void
    setLoading: (loading: boolean) => void
}

type GoalStore = GoalActions & GoalState

// Zustand store
export const useGoalStore = create<GoalStore>((set, get) => ({
    // Initial state
    goals: goals, //change this to get from backend
    isLoading: false,
    error: null,
    goalMap: new Map(goals.map(goal => [goal.id, goal])),

    // Actions
    addGoal: (goal: Goal) => {
        set(state => ({
            goals: [...state.goals, goal],
            goalMap: new Map(state.goalMap).set(goal.id, goal)
        }))
    },

    updateGoal: (goal: Goal) => {
        set(state => ({
            goals: state.goals.map(g => g.id === goal.id ? goal : g),
            goalMap: new Map(state.goalMap).set(goal.id, goal)
        }))
    },

    deleteGoal: (goal: Goal) => {
        set(state => {
            const newMap = new Map(state.goalMap)
            newMap.delete(goal.id)
            return {
                goals: state.goals.filter(g => g.id !== goal.id),
                goalMap: newMap
            }
        })
    },

    getGoals: () => {
        return get().goals
    },

    getGoal: (id: string) => {
        const goal = get().goals.find(g => g.id === id)
        if (!goal) throw new Error(`Goal with id ${id} not found`)
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
}))

// Selector hooks for better performance
export const useGoals = () => useGoalStore(state => state.goals)
export const useGoalLoading = () => useGoalStore(state => state.isLoading)
export const useGoalError = () => useGoalStore(state => state.error)
export const useAddGoal = () => useGoalStore(state => state.addGoal)
export const useUpdateGoal = () => useGoalStore(state => state.updateGoal)
export const useDeleteGoal = () => useGoalStore(state => state.deleteGoal)
export const useGetGoals = () => useGoalStore(state => state.getGoals)
export const useGetGoal = () => useGoalStore(state => state.getGoal)
export const useGoalName = (goalId?: string) =>
    useGoalStore(state => state.getGoalName(goalId)) 