import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated'
import {
  Clock,
  Flag,
  MoreVertical,
  CheckCircle2,
  Circle,
  Calendar,
  AlertTriangle,
  Target
} from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { Task, useUpdateTask } from '@/src/stores'
import { colors } from '@/src/constants/colors'
import { styles } from './TaskCard.styles'
import { useGoalName } from '@/src/stores'
import { TaskCompletionModal } from './TaskCompletionModal'

type Props = {
  task: Task
  isLast: boolean
  index?: number
}

export const TaskCard: React.FC<Props> = ({ task, isLast, index = 0 }) => {
  const router = useRouter()
  const goalName = useGoalName(task.goalId)
  const updateTask = useUpdateTask()
  const [showCompletionModal, setShowCompletionModal] = useState(false)

  // Only keep minimal checkbox animation
  const checkboxScale = useSharedValue(1)

  // Simple checkbox animation on toggle
  const animateCheckbox = () => {
    checkboxScale.value = withTiming(0.9, { duration: 100 }, () => {
      checkboxScale.value = withTiming(1, { duration: 100 })
    })
  }

  // Animated styles - only checkbox
  const checkboxAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkboxScale.value }]
  }))

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
    // If task is completed, allow direct unchecking without modal
    if (task.status === 'completed') {
      animateCheckbox()
      const updatedTask = {
        ...task,
        status: 'todo' as any,
        completionDate: new Date(0),
        updatedAt: new Date()
      }

      setTimeout(() => {
        updateTask(updatedTask)
      }, 100)
      return
    }

    // If task is not completed, show confirmation modal
    setShowCompletionModal(true)
  }

  const handleConfirmCompletion = () => {
    animateCheckbox()

    const updatedTask = {
      ...task,
      status: 'completed' as any,
      completionDate: new Date(),
      updatedAt: new Date()
    }

    setTimeout(() => {
      updateTask(updatedTask)
    }, 100)

    setShowCompletionModal(false)
  }

  const handleCancelCompletion = () => {
    setShowCompletionModal(false)
  }

  return (
    <View>
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
        <Animated.View style={checkboxAnimatedStyle}>
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
        </Animated.View>

        <View style={styles.taskContent}>
          <View style={styles.titleContainer}>
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

              <View style={{ gap: 6 }}>
                <View>
                  <View
                    style={[styles.titleContainer, { alignSelf: 'flex-end' }]}
                  >
                    {goalName && (
                      <View style={[styles.goalBadge, { gap: 4 }]}>
                        <Target size={12} color='#0066FF' />
                        <Text style={{ color: '#0066FF' }} numberOfLines={1}>
                          {goalName}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <View
                  style={[styles.dueDateBadge, overdue && styles.overdueBadge]}
                >
                  <AlertTriangle
                    size={10}
                    color={overdue ? '#EF4444' : '#9CA3AF'}
                    style={overdue ? {} : { display: 'none' }}
                  />
                  <Calendar size={10} color={overdue ? '#EF4444' : '#9CA3AF'} />
                  <Text
                    style={[styles.dueDateText, overdue && styles.overdueText]}
                  >
                    {formatDate(task.dueDate)}
                  </Text>
                </View>
              </View>
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

      <TaskCompletionModal
        visible={showCompletionModal}
        taskTitle={task.title}
        onConfirm={handleConfirmCompletion}
        onCancel={handleCancelCompletion}
      />
    </View>
  )
}
