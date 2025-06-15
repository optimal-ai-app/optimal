import React from 'react'
import { View, Text, TouchableOpacity, Pressable, Animated } from 'react-native'
import {
  Clock,
  Flag,
  MoreVertical,
  CheckCircle2,
  Circle,
  Calendar,
  AlertTriangle
} from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { Task } from '@/src/stores'
import { colors } from '@/src/constants/colors'
import { styles } from './TaskCard.styles'

type Props = {
  task: Task
  isLast: boolean
}

export const TaskCard: React.FC<Props> = ({ task, isLast }) => {
  const router = useRouter()

  const getPriorityConfig = (priority: '!' | '!!' | '!!!') => {
    switch (priority) {
      case '!':
        return {
          color: '#10B981',
          label: 'Low'
        }
      case '!!':
        return {
          color: '#F59E0B',
          label: 'Medium'
        }
      case '!!!':
        return {
          color: '#EF4444',
          label: 'High'
        }
      default:
        return {
          color: '#9CA3AF',
          label: 'Low'
        }
    }
  }
  const formatDate = (date: Date) => {
    const now = new Date()
    const isSameDay = now.toDateString() === date.toDateString()

    if (isSameDay) {
      return (
        'Today, ' +
        date.toLocaleTimeString(undefined, {
          hour: 'numeric',
          minute: '2-digit'
        })
      )
    }

    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  const isOverdue = () => {
    const now = new Date()
    return (
      task.dueDate.getTime() + 1 * 24 * 60 * 60 * 1000 < now.getTime() &&
      task.status !== 'completed'
    )
  }

  const priorityConfig = getPriorityConfig(task.priority)
  const overdue = isOverdue()

  const handleToggleComplete = () => {
    console.log('Toggle task completion:', task.id)
  }

  return (
    <Pressable
      style={[
        styles.taskItem,
        isLast && styles.lastTaskItem,
        overdue && styles.overdueTask
      ]}
      onLongPress={() =>
        router.push({
          pathname: '/(tabs)/agent',
          params: {
            action: 'edit-task',
            taskId: task.id
          }
        })
      }
      accessibilityLabel={`Task: ${task.title}`}
      accessibilityRole='button'
      accessibilityHint='Long press to edit task'
    >
      <TouchableOpacity
        style={styles.checkbox}
        onPress={handleToggleComplete}
        accessibilityLabel={
          task.status === 'completed'
            ? 'Mark as incomplete'
            : 'Mark as complete'
        }
        accessibilityRole='checkbox'
        accessibilityState={{ checked: task.status === 'completed' }}
      >
        {task.status === 'completed' ? (
          <CheckCircle2 size={24} color='#10B981' />
        ) : (
          <Circle size={24} color='#9CA3AF' strokeWidth={2} />
        )}
      </TouchableOpacity>

      <View style={styles.taskContent}>
        <Text
          style={[
            styles.taskTitle,
            task.status === 'completed' && styles.completedTitle
          ]}
          numberOfLines={1}
        >
          {task.title}
        </Text>

        <View style={styles.metaRow}>
          <View
            style={[
              styles.priorityBadge,
              { borderColor: priorityConfig.color }
            ]}
          >
            <Flag size={10} color={priorityConfig.color} />
            <Text
              style={[styles.priorityText, { color: priorityConfig.color }]}
            >
              {priorityConfig.label}
            </Text>
          </View>

          <View style={[styles.dueDateBadge, overdue && styles.overdueBadge]}>
            <AlertTriangle
              size={10}
              color={overdue ? '#EF4444' : '#9CA3AF'}
              style={overdue ? {} : { display: 'none' }}
            />
            <Calendar size={10} color={overdue ? '#EF4444' : '#9CA3AF'} />
            <Text style={[styles.dueDateText, overdue && styles.overdueText]}>
              {formatDate(task.dueDate)}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.moreButton}
        onPress={() =>
          router.push({
            pathname: '/(tabs)/agent',
            params: {
              action: 'task-options',
              taskId: task.id
            }
          })
        }
        accessibilityLabel='More options'
        accessibilityRole='button'
      >
        <MoreVertical size={16} color='#9CA3AF' />
      </TouchableOpacity>
    </Pressable>
  )
}
