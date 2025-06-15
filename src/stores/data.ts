import { Goal, Task } from './userStore'

export const goals: Goal[] = [
    {
        id: '1',
        title: 'Goal 1',
        description: 'Description 1',
        createdAt: new Date(),
        dueDate: new Date(),
        status: 'active',
        priority: 'low',
        tags: ['tag1', 'tag2'],
        progress: 50,
        updatedAt: new Date(),
        streak: 0
    },
    {
        id: '2',
        title: 'Goal 2',
        description: 'Description 2',
        createdAt: new Date(),
        dueDate: new Date(),
        status: 'active',
        // priority: 'medium',
        tags: ['tag3', 'tag4'],
        progress: 75,
        updatedAt: new Date(),
        streak: 0
    }
]

export const tasks: Task[] = [
    {
        id: '1',
        title: 'Task 1',
        description: 'Description 1',
        createdAt: new Date(),
        dueDate: new Date(Date.now() + 0 * 24 * 60 * 60 * 1000),
        status: 'todo',
        updatedAt: new Date(),
        completionDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        priority: '!'
    }
]   