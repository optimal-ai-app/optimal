import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable
} from 'react-native'
import { Link, useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeInDown } from 'react-native-reanimated'
import {
  Target,
  Clock,
  Flag,
  ChevronRight,
  MoveVertical as MoreVertical,
  CircleCheck as CheckCircle2,
  MessageSquare,
  Plus
} from 'lucide-react-native'

import { Header } from '@/src/components/Header'
import { Card } from '@/src/components/Card'
import { Button } from '@/src/components/Button'
import { GoalCreationModal } from '@/src/components/GoalCreationModal'
import { TaskCreationModal } from '@/src/components/TaskCreationModal'
import { colors } from '@/src/constants/colors'
import { fonts } from '@/src/constants/fonts'
import { useAuthContext } from '@/src/context/AuthContext'

// Task type definition
interface Task {
  id: string
  title: string
  completionTime: string
  priority: '!' | '!!' | '!!!'
  description?: string
  completed?: boolean
}

// Goal type definition
interface Goal {
  id: string
  title: string
  targetValue: number
  currentValue: number
  unit: string
  createdAt: Date
  tasks: Task[]
}

export default function HomeScreen () {
  const router = useRouter()
  const { user } = useAuthContext()

  // State
  const [tasks, setTasks] = useState<Task[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)

  // Handle new goal via agent
  const handleNewGoalWithAgent = () => {
    router.push({
      pathname: '/(tabs)/agent',
      params: {
        action: 'create-goal',
        prompt: 'Help me create a goal'
      }
    })
  }

  // Handle manual goal creation
  const handleNewGoalManually = () => {
    router.push('/home/create-goal')
  }

  // Handle new task via agent
  const handleNewTaskWithAgent = () => {
    router.push({
      pathname: '/(tabs)/agent',
      params: {
        action: 'create-task',
        prompt: 'Help me create a task'
      }
    })
  }

  // Handle manual task creation
  const handleNewTaskManually = () => {
    router.push('/home/create-task')
  }

  // Handle task completion
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  // Get priority color
  const getPriorityColor = (priority: '!' | '!!' | '!!!') => {
    switch (priority) {
      case '!':
        return colors.status.success
      case '!!':
        return colors.status.warning
      case '!!!':
        return colors.status.error
      default:
        return colors.text.muted
    }
  }

  return (
    <View style={styles.container}>
      <Header title='Home' />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions */}
        <Animated.View entering={FadeInDown.duration(500).delay(100)}>
          <Card style={styles.quickActionsCard}>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity
                style={styles.quickActionButton}
                onPress={() => setShowGoalModal(true)}
                accessibilityLabel='Set New Goal'
                accessibilityRole='button'
              >
                <View
                  style={[
                    styles.quickActionIcon,
                    { backgroundColor: colors.button.primary }
                  ]}
                >
                  <Plus size={24} color={colors.text.primary} />
                </View>
                <Text style={styles.quickActionText}>Set New Goal</Text>
              </TouchableOpacity>

              <Link
                href={{
                  pathname: '/(tabs)/agent',
                  params: { action: 'log-progress' }
                }}
                asChild
              >
                <TouchableOpacity
                  style={styles.quickActionButton}
                  accessibilityLabel='Log Progress'
                  accessibilityRole='button'
                >
                  <View
                    style={[
                      styles.quickActionIcon,
                      { backgroundColor: colors.button.accent }
                    ]}
                  >
                    <MessageSquare size={24} color={colors.text.primary} />
                  </View>
                  <Text style={styles.quickActionText}>Log Progress</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </Card>
        </Animated.View>

        {/* Tasks Section */}
        <Animated.View entering={FadeInDown.duration(500).delay(200)}>
          <Card style={styles.tasksCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Target size={20} color={colors.button.primary} />
                <Text style={styles.sectionTitle}>Today's Tasks</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowTaskModal(true)}
                style={styles.addTaskButton}
                accessibilityLabel="Add new task"
                accessibilityRole="button"
              >
                <Plus size={20} color={colors.text.primary} />
              </TouchableOpacity>
            </View>

            {tasks.map((task, index) => (
              <Pressable
                key={task.id}
                style={[
                  styles.taskItem,
                  index === tasks.length - 1 && styles.lastTaskItem
                ]}
                onLongPress={() => {
                  router.push({
                    pathname: '/(tabs)/agent',
                    params: {
                      action: 'edit-task',
                      taskId: task.id
                    }
                  })
                }}
                accessibilityLabel={`Task: ${task.title}`}
                accessibilityRole='button'
                accessibilityHint='Long press to edit task'
              >
                <TouchableOpacity
                  style={styles.taskCheckbox}
                  onPress={() => toggleTaskCompletion(task.id)}
                  accessibilityLabel={
                    task.completed ? 'Mark as incomplete' : 'Mark as complete'
                  }
                  accessibilityRole='checkbox'
                  accessibilityState={{ checked: task.completed }}
                >
                  <CheckCircle2
                    size={24}
                    color={
                      task.completed ? colors.status.success : colors.text.muted
                    }
                  />
                </TouchableOpacity>

                <View style={styles.taskContent}>
                  <Text
                    style={[
                      styles.taskTitle,
                      task.completed && styles.taskTitleCompleted
                    ]}
                    numberOfLines={2}
                  >
                    {task.title}
                  </Text>

                  <View style={styles.taskMeta}>
                    <View style={styles.taskMetaItem}>
                      <Clock size={14} color={colors.text.muted} />
                      <Text style={styles.taskMetaText}>
                        {task.completionTime}
                      </Text>
                    </View>

                    <View style={styles.taskMetaItem}>
                      <Flag size={14} color={getPriorityColor(task.priority)} />
                      <Text
                        style={[
                          styles.taskMetaText,
                          { color: getPriorityColor(task.priority) }
                        ]}
                      >
                        {task.priority}
                      </Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.taskMoreButton}
                  onPress={() => {
                    router.push({
                      pathname: '/(tabs)/agent',
                      params: {
                        action: 'task-options',
                        taskId: task.id
                      }
                    })
                  }}
                  accessibilityLabel='More options'
                  accessibilityRole='button'
                >
                  <MoreVertical size={20} color={colors.text.muted} />
                </TouchableOpacity>
              </Pressable>
            ))}

            {tasks.length === 0 && (
              <Text style={styles.emptyText}>
                No tasks yet. Create your first task to get started!
              </Text>
            )}
          </Card>
        </Animated.View>

        {/* Goals Preview */}
        <Animated.View entering={FadeInDown.duration(500).delay(300)}>
          <Card style={styles.goalsCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Flag size={20} color={colors.button.accent} />
                <Text style={styles.sectionTitle}>Active Goals</Text>
              </View>
              <Link href='/home/goals' asChild>
                <TouchableOpacity
                  style={styles.viewAllButton}
                  accessibilityLabel='View all goals'
                  accessibilityRole='button'
                >
                  <Text style={styles.viewAllText}>View All</Text>
                  <ChevronRight size={16} color={colors.button.primary} />
                </TouchableOpacity>
              </Link>
            </View>

            {goals.slice(0, 2).map((goal, index) => (
              <Link
                key={goal.id}
                href={{
                  pathname: '/home/goal-details',
                  params: { id: goal.id }
                }}
                asChild
              >
                <TouchableOpacity
                  style={[
                    styles.goalPreview,
                    index === Math.min(goals.length - 1, 1) &&
                      (styles.lastGoalPreview as any)
                  ]}
                  accessibilityLabel={`Goal: ${goal.title}`}
                  accessibilityRole='button'
                  accessibilityHint='View goal details'
                >
                  <LinearGradient
                    colors={[colors.gradient.start, colors.gradient.end]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.goalProgress}
                  >
                    <Text style={styles.goalProgressText}>
                      {Math.round((goal.currentValue / goal.targetValue) * 100)}
                      %
                    </Text>
                  </LinearGradient>

                  <View style={styles.goalContent}>
                    <Text style={styles.goalTitle} numberOfLines={1}>
                      {goal.title}
                    </Text>
                    <Text style={styles.goalSubtitle}>
                      {goal.currentValue} / {goal.targetValue} {goal.unit}
                    </Text>
                  </View>

                  <ChevronRight size={20} color={colors.text.muted} />
                </TouchableOpacity>
              </Link>
            ))}

            {goals.length === 0 && (
              <View style={styles.emptyGoalsContainer}>
                <Text style={styles.emptyText}>
                  No goals yet. Let's set your first goal!
                </Text>
                <Button
                  title='Set a Goal'
                  onPress={() => setShowGoalModal(true)}
                  style={styles.emptyGoalsButton}
                />
              </View>
            )}
          </Card>
        </Animated.View>
      </ScrollView>

      {/* Goal Creation Modal */}
      <GoalCreationModal
        visible={showGoalModal}
        onClose={() => setShowGoalModal(false)}
        onCreateWithAgent={handleNewGoalWithAgent}
        onCreateManually={handleNewGoalManually}
      />

      {/* Task Creation Modal */}
      <TaskCreationModal
        visible={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onCreateWithAgent={handleNewTaskWithAgent}
        onCreateManually={handleNewTaskManually}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary
  },

  scrollView: {
    flex: 1
  },

  content: {
    padding: 16,
    paddingBottom: 32
  },

  quickActionsCard: {
    padding: 16
  },

  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  quickActionButton: {
    alignItems: 'center'
  },

  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },

  quickActionText: {
    fontSize: fonts.sizes.sm,
    color: colors.text.primary,
    fontWeight: fonts.weights.medium as any
  },

  tasksCard: {
    padding: 16,
    marginTop: 16
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },

  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  sectionTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginLeft: 8
  },

  addTaskButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.button.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.utility.divider
  },

  lastTaskItem: {
    borderBottomWidth: 0
  },

  taskCheckbox: {
    marginRight: 12
  },

  taskContent: {
    flex: 1
  },

  taskTitle: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    marginBottom: 4
  },

  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.text.muted
  },

  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  taskMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16
  },

  taskMetaText: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted,
    marginLeft: 4
  },

  taskMoreButton: {
    padding: 8,
    marginRight: -8
  },

  emptyText: {
    fontSize: fonts.sizes.md,
    color: colors.text.muted,
    textAlign: 'center',
    marginTop: 8
  },

  goalsCard: {
    padding: 16,
    marginTop: 16
  },

  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  viewAllText: {
    fontSize: fonts.sizes.sm,
    color: colors.button.primary,
    marginRight: 4
  },

  goalPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.utility.divider
  },

  lastGoalPreview: {
    borderBottomWidth: 0
  },

  goalProgress: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },

  goalProgressText: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary
  },

  goalContent: {
    flex: 1
  },

  goalTitle: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    marginBottom: 4
  },

  goalSubtitle: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted
  },

  emptyGoalsContainer: {
    alignItems: 'center',
    paddingVertical: 16
  },

  emptyGoalsButton: {
    marginTop: 16
  }
})