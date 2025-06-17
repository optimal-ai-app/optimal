import { Goal, Task } from './types'

export const goals: Goal[] = [
    {
        id: '1',
        title: 'Goal 1',
        description: 'Description 1',
        createdAt: new Date(),
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        status: 'active',
        tags: ['tag1', 'tag2'],
        progress: 50,
        updatedAt: new Date(),
        streak: 0
    },
    {
        id: '2',
        title: 'Goal 2',
        description: 'Description 2',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        status: 'active',
        tags: ['tag3', 'tag4'],
        progress: 75,
        updatedAt: new Date(),
        streak: 3
    },
    {
        id: '3',
        title: 'Finish React Native tutorial',
        description: 'Complete all the lessons in the React Native course',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        status: 'active',
        tags: ['react', 'mobile', 'learning'],
        progress: 30,
        updatedAt: new Date(),
        streak: 2
    },
    {
        id: '4',
        title: 'Read 10 books',
        description: 'Finish reading 10 personal development books',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        status: 'active',
        tags: ['reading', 'personal-development'],
        progress: 60,
        updatedAt: new Date(),
        streak: 5
    },
    {
        id: '5',
        title: 'Run a marathon',
        description: 'Train and complete a full marathon',
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // overdue by 1 day
        status: 'completed',
        tags: ['fitness'],
        progress: 100,
        updatedAt: new Date(),
        streak: 30
    },
    {
        id: '6',
        title: 'Backup personal data',
        description: 'Ensure all photos and documents are backed up to the cloud',
        createdAt: new Date(),
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: 'completed',
        tags: ['maintenance', 'backup'],
        progress: 100,
        updatedAt: new Date(),
        streak: 0
    }
]

export const tasks: Task[] = [
    {
        id: '1',
        goalId: '1', // Goal 1
        title: 'Morning standup meeting',
        description: 'Daily team sync to discuss progress and blockers',
        createdAt: new Date(),
        dueDate: new Date(new Date().setHours(9, 30, 0, 0)), // Today 9:30 AM
        status: 'completed',
        completionDate: new Date(new Date().setHours(10, 0, 0, 0)),
        priority: '!!'
    },
    {
        id: '2',
        goalId: '3', // React Native Tutorial
        title: 'Complete React Navigation module',
        description: 'Work through navigation setup and configuration',
        createdAt: new Date(),
        dueDate: new Date(new Date().setHours(12, 0, 0, 0)), // Today 12:00 PM
        status: 'todo',
        completionDate: new Date(new Date().setHours(12, 0, 0, 0)),
        priority: '!!'
    },
    {
        id: '3',
        goalId: '4', // Read 10 books
        title: 'Lunchtime reading session',
        description: 'Read chapter 3 of current book during lunch break',
        createdAt: new Date(),
        dueDate: new Date(new Date().setHours(13, 0, 0, 0)), // Today 1:00 PM
        status: 'todo',
        completionDate: new Date(new Date().setHours(13, 0, 0, 0)),
        priority: '!'
    },
    {
        id: '4',
        goalId: '2',
        title: 'Project planning meeting',
        description: 'Review Q3 milestones with stakeholders',
        createdAt: new Date(),
        dueDate: new Date(new Date().setHours(14, 30, 0, 0)), // Today 2:30 PM
        status: 'todo',

        completionDate: new Date(new Date().setHours(15, 30, 0, 0)),
        priority: '!!!'
    },
    {
        id: '5',
        goalId: '3', // React Native Tutorial
        title: 'Code review session',
        description: 'Review PR feedback and make requested changes',
        createdAt: new Date(),
        dueDate: new Date(new Date().setHours(16, 0, 0, 0)), // Today 4:00 PM
        status: 'todo',
        completionDate: new Date(new Date().setHours(17, 0, 0, 0)),
        priority: '!!'
    },
    {
        id: '6',
        goalId: '5',
        title: 'Evening workout',
        description: 'Complete 5k training run',
        createdAt: new Date(),
        dueDate: new Date(new Date().setHours(18, 30, 0, 0)), // Today 6:30 PM
        status: 'todo',
        completionDate: new Date(new Date().setHours(19, 30, 0, 0)),
        priority: '!!'
    },
    {
        id: '7',
        goalId: '6',
        title: 'Daily backup check',
        description: 'Verify automated backups completed successfully',
        createdAt: new Date(),
        dueDate: new Date(new Date().setHours(22, 0, 0, 0)), // Today 10:00 PM
        status: 'todo',

        completionDate: new Date(new Date().setHours(22, 30, 0, 0)),
        priority: '!'
    }
]
