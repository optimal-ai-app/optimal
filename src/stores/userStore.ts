import { create } from 'zustand'
import httpService from '../../services/httpService'
import { goals, tasks } from './data'

// Types
interface UserData {
    id: string
    userName: string
    email: string
}
export type User = UserData | null

export interface Goal {
    id: string
    title: string
    description: string
    createdAt: Date
    dueDate: Date
    status: 'active' | 'completed' | 'archived'
    tags: string[]
    progress: number
    updatedAt: Date
    streak: number
}

export interface Task {
    id: string
    title: string
    description: string
    createdAt: Date,
    completionDate: Date,
    priority: '!' | '!!' | '!!!',
    dueDate: Date,
    status: 'todo' | 'completed' | 'archived',
    updatedAt: Date,
    goalId?: string,
}

interface UserState {
    user: User
    goals: Goal[]
    tasks: Task[]
    error: string | null
    isLoading: boolean
}

interface UserActions {
    //add login and sign up later
    //add get userGoals and get userTasks later (connects to backend)
    addGoal: (goal: Goal) => void
    addTask: (task: Task) => void
    updateGoal: (goal: Goal) => void
    updateTask: (task: Task) => void
    deleteGoal: (goal: Goal) => void
    deleteTask: (task: Task) => void
    getGoals: () => Goal[]
    getTasks: () => Task[]
    getGoal: (id: string) => Goal
    getTask: (id: string) => Task
    setError: (error: string | null) => void
    setLoading: (loading: boolean) => void

}

type UserStore = UserActions & UserState
// Zustand store
export const useUserStore = create<UserStore>((set, get) => ({
    // Initial state
    user: null,
    goals: goals, //change this to get from backend
    tasks: tasks, //change this to get from backend
    isLoading: false,
    error: null,

    // Actions
    addGoal: (goal: Goal) => {
        set(state => ({
            goals: [...state.goals, goal]
        }))
    },

    addTask: (task: Task) => {
        set(state => ({
            tasks: [...state.tasks, task]
        }))
    },

    updateGoal: (goal: Goal) => {
        set(state => ({
            goals: state.goals.map(g => g.id === goal.id ? goal : g)
        }))
    },

    updateTask: (task: Task) => {
        set(state => ({
            tasks: state.tasks.map(t => t.id === task.id ? task : t)
        }))
    },

    deleteGoal: (goal: Goal) => {
        set(state => ({
            goals: state.goals.filter(g => g.id !== goal.id)
        }))
    },

    deleteTask: (task: Task) => {
        set(state => ({
            tasks: state.tasks.filter(t => t.id !== task.id)
        }))
    },

    getGoals: () => {
        return get().goals
    },

    getTasks: () => {
        return get().tasks
    },

    getGoal: (id: string) => {
        const goal = get().goals.find(g => g.id === id)
        if (!goal) throw new Error(`Goal with id ${id} not found`)
        return goal
    },

    getTask: (id: string) => {
        const task = get().tasks.find(t => t.id === id)
        if (!task) throw new Error(`Task with id ${id} not found`)
        return task
    },

    setError: (error: string | null) => {
        set({ error })
    },

    setLoading: (loading: boolean) => {
        set({ isLoading: loading })
    }
}))

// Selector hooks for better performance
export const useUserGoals = () => useUserStore(state => state.goals)
export const useUserTasks = () => useUserStore(state => state.tasks)
export const useUserLoading = () => useUserStore(state => state.isLoading)
export const useUserError = () => useUserStore(state => state.error)
export const useUserAddGoal = () => useUserStore(state => state.addGoal)
export const useUserAddTask = () => useUserStore(state => state.addTask)
export const useUserUpdateGoal = () => useUserStore(state => state.updateGoal)
export const useUserUpdateTask = () => useUserStore(state => state.updateTask)
export const useUserDeleteGoal = () => useUserStore(state => state.deleteGoal)
export const useUserDeleteTask = () => useUserStore(state => state.deleteTask)
export const useUserGetGoals = () => useUserStore(state => state.getGoals)
export const useUserGetTasks = () => useUserStore(state => state.getTasks)
