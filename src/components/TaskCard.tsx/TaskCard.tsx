import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import Animated, {
  SlideInRight,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  Easing,
  interpolate,
  runOnJS
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

type Props = {
  task: Task
  isLast: boolean
  index?: number // Add index prop for staggered animation
}

export const TaskCard: React.FC<Props> = ({ task, isLast, index = 0 }) => {
  const router = useRouter()
  const goalName = useGoalName(task.goalId)
  const updateTask = useUpdateTask()

  // Animation values for interactions (not entrance)
  const checkboxScale = useSharedValue(1)
  const priorityBadgeScale = useSharedValue(1)

  // Checkbox animation on toggle
  const animateCheckbox = () => {
    checkboxScale.value = withSequence(
      withTiming(0.8, { duration: 100 }),
      withSpring(1.2, { damping: 10, stiffness: 300 }),
      withTiming(1, { duration: 150 })
    )
  }

  // Priority badge animation on mount
  useEffect(() => {
    priorityBadgeScale.value = withDelay(
      index * 100 + 300,
      withSpring(1.1, { damping: 8, stiffness: 200 }, () => {
        priorityBadgeScale.value = withTiming(1, { duration: 200 })
      })
    )
  }, [index])

  // Animated styles for interactions only
  const checkboxAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkboxScale.value }]
  }))

  const priorityAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: priorityBadgeScale.value }]
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
    animateCheckbox()

    const updatedTask = {
      ...task,
      status: (task.status === 'completed' ? 'todo' : 'completed') as any,
      completionDate: task.status === 'completed' ? new Date(0) : new Date(),
      updatedAt: new Date()
    }

    // Delay the update slightly to allow animation to start
    setTimeout(() => {
      updateTask(updatedTask)
    }, 100)
  }

  return (
    <Animated.View
      entering={SlideInRight.duration(500 + index * 50)
        .springify()
        .damping(15)
        .delay(index * 100)}
    >
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
            {goalName && (
              <Animated.View
                entering={FadeInDown.delay(index * 100 + 200).duration(400)}
                style={styles.goalBadge}
              >
                <Target size={12} color={colors.button.primary} />
                <Text style={styles.goalText} numberOfLines={1}>
                  {goalName}
                </Text>
              </Animated.View>
            )}
          </View>

          <View style={styles.metaRow}>
            <Animated.View
              style={[
                styles.priorityBadge,
                { borderColor: priorityConfig.color },
                priorityAnimatedStyle
              ]}
            >
              <Flag size={10} color={priorityConfig.color} />
              <Text
                style={[styles.priorityText, { color: priorityConfig.color }]}
              >
                {priorityConfig.label}
              </Text>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(index * 100 + 400).duration(400)}
              style={[styles.dueDateBadge, overdue && styles.overdueBadge]}
            >
              <AlertTriangle
                size={10}
                color={overdue ? '#EF4444' : '#9CA3AF'}
                style={overdue ? {} : { display: 'none' }}
              />
              <Calendar size={10} color={overdue ? '#EF4444' : '#9CA3AF'} />
              <Text style={[styles.dueDateText, overdue && styles.overdueText]}>
                {formatDate(task.dueDate)}
              </Text>
            </Animated.View>
          </View>
        </View>

        <Animated.View
          entering={FadeInDown.delay(index * 100 + 300).duration(300)}
        >
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
        </Animated.View>
      </Pressable>
    </Animated.View>
  )
}
