import React from 'react'
import { ManualTaskForm } from '@/src/components/ManualTaskForm'

export default function CreateTaskScreen () {
  const handleTaskCreated = (task: {
    title: string
    description: string
    dueDate: Date
    dueTime: string
    goalId?: string
    isRepeating: boolean
    repeatCount?: number
    repeatDays?: string[]
  }) => {
    // In a real app, this would save the task to your data store
    console.log('Task created:', task)
  }

  return <ManualTaskForm onTaskCreated={handleTaskCreated} />
}
