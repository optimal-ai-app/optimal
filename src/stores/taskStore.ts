import { create } from 'zustand';
import { Task } from './types';
import { tasks } from './data';
import httpService from '../../services/httpService';

interface TaskState {
  tasks: Task[];
  error: string | null;
  isLoading: boolean;
}

interface TaskActions {
  //add get userTasks later (connects to backend)
  addTask: (
    task: Task,
    userId: string,
    repeatEndDate?: Date,
    repeatDays?: string[],
  ) => void;
  updateTask: (task: Task) => void;
  deleteTaskInstance: (userId: string, taskId: string) => void;
  deleteAllRelatedTasks: (userId: string, sharedId: string) => void;
  deleteTaskAndAfter: (userId: string, taskId: string) => void;
  getTasks: () => Task[];
  getTask: (id: string) => Task;
  getTasksByGoal: (goalId: string) => Task[];
  fetchUserTasks: (userId: string) => Promise<void>;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

type TaskStore = TaskActions & TaskState;

// Zustand store
export const useTaskStore = create<TaskStore>((set, get) => ({
  // Initial state
  tasks: [],
  isLoading: false,
  error: null,

  // Actions
  addTask: async (
    task: Task,
    userId: string,
    repeatEndDate?: Date,
    repeatDays?: string[],
  ) => {
    const { setLoading, setError } = get();
    try {
      setLoading(true);
      setError(null);

      const requestData: any = {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate.toISOString(),
        priority: task.priority,
        goalId: task.goalId || null,
        userId: userId,
      };

      // Add repeat fields if provided
      if (repeatEndDate && repeatDays && repeatDays.length > 0) {
        // Convert repeatEndDate to end of day timestamp
        const endDate = new Date(repeatEndDate);
        endDate.setHours(23, 59, 59, 999);
        requestData.repeatEndDate = endDate.toISOString();
        requestData.repeatDays = repeatDays;
      }

      const response = await httpService.post('/api/tasks/create', requestData);
      get().fetchUserTasks(userId);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add task');
    } finally {
      setLoading(false);
    }
  },

  updateTask: async (task: Task) => {
    const { setLoading, setError } = get();
    try {
      setLoading(true);
      const response = await httpService.post(`/api/tasks/update`, {
        taskId: task.id,
        status: task.status,
        completionDate: task.completionDate
          ? task.completionDate.toISOString()
          : null,
        updatedAt: new Date().toISOString(),
      });
      console.log(response);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
      }));
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to update task',
      );
    } finally {
      setLoading(false);
    }
  },

  deleteTaskInstance: async (userId: string, taskId: string) => {
    const { setLoading, setError } = get();
    try {
      setLoading(true);
      setError(null);
      const response = await httpService.delete(`/api/tasks/${taskId}`);
      await get().fetchUserTasks(userId);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to delete task',
      );
    } finally {
      setLoading(false);
    }
  },

  deleteAllRelatedTasks: async (userId: string, sharedId: string) => {
    const { setLoading, setError } = get();
    try {
      setLoading(true);
      setError(null);
      const response = await httpService.delete(
        `/api/tasks/shared/${sharedId}`,
      );
      await get().fetchUserTasks(userId);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to delete task',
      );
    } finally {
      setLoading(false);
    }
  },

  deleteTaskAndAfter: async (userId: string, taskId: string) => {
    const { setLoading, setError } = get();
    try {
      setLoading(true);
      setError(null);
      const response = await httpService.delete(`/api/tasks/after/${taskId}`);
      await get().fetchUserTasks(userId);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to delete task',
      );
    } finally {
      setLoading(false);
    }
  },

  getTasks: () => {
    return get().tasks;
  },

  getTask: (id: string) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) throw new Error(`Task with id ${id} not found`);
    return task;
  },

  getTasksByGoal: (goalId: string) => {
    return get().tasks.filter((t) => t.goalId === goalId);
  },

  fetchUserTasks: async (userId: string) => {
    const { setLoading, setError } = get();
    try {
      setLoading(true);
      setError(null);

      const response = await httpService.get<any[]>(`api/tasks/user/${userId}`);

      // Transform backend task format to frontend format

      const transformedTasks: Task[] = response.map((task) => ({
        id: task.taskId,
        title: task.title,
        description: task.description,
        createdAt: new Date(task.createdDate),
        completionDate: task.completedDate
          ? new Date(task.completedDate)
          : null,
        priority: task.priority,
        dueDate: task.dueDate ? new Date(task.dueDate) : new Date(),
        status: task.status,
        goalId: task.goalId,
        sharedId: task.sharedId,
        milestone: task.milestone || false,
      }));

      set({ tasks: transformedTasks });
    } catch (error) {
      console.error('Failed to fetch user tasks:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to fetch tasks',
      );
      set((state) => ({
        tasks: tasks,
      }));
      setError(null);
    } finally {
      setLoading(false);
    }
  },

  setError: (error: string | null) => {
    set({ error });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));

// Selector hooks for better performance
export const useTasks = () => useTaskStore((state) => state.tasks);
export const useTaskLoading = () => useTaskStore((state) => state.isLoading);
export const useTaskError = () => useTaskStore((state) => state.error);
export const useAddTask = () => useTaskStore((state) => state.addTask);
export const useUpdateTask = () => useTaskStore((state) => state.updateTask);
export const useGetTasks = () => useTaskStore((state) => state.getTasks);
export const useGetTask = () => useTaskStore((state) => state.getTask);
export const useTasksByGoal = () =>
  useTaskStore((state) => state.getTasksByGoal);
export const useGetTasksByGoal = () =>
  useTaskStore((state) => state.getTasksByGoal);
export const useFetchUserTasks = () =>
  useTaskStore((state) => state.fetchUserTasks);
export const useDeleteTaskInstance = () =>
  useTaskStore((state) => state.deleteTaskInstance);
export const useDeleteAllRelatedTasks = () =>
  useTaskStore((state) => state.deleteAllRelatedTasks);
export const useDeleteTaskAndAfter = () =>
  useTaskStore((state) => state.deleteTaskAndAfter);
