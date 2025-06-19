import React, { useState, useMemo, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ViewStyle,
  TextStyle,
  Image
} from 'react-native'
import { Link, useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { 
  FadeInDown, 
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  interpolate
} from 'react-native-reanimated'
import {
  Target,
  Flag,
  ChevronRight,
  MessageSquare,
  Plus,
  Sparkles,
  TrendingUp,
  Calendar
} from 'lucide-react-native'

import { Header } from '@/src/components/Header'
import { Card } from '@/src/components/Card'
import { Button } from '@/src/components/Button'
import { GoalCreationModal } from '@/src/components/GoalCreationModal'
import { TaskCreationModal } from '@/src/components/TaskCreationModal'
import { FloatingActionButton, GlassCard, PulseAnimation } from '@/src/components/PremiumFeatures'
import { colors } from '@/src/constants/colors'
import { fonts } from '@/src/constants/fonts'
import { useAuthContext } from '@/src/context/AuthContext'
import {
  Goal,
  useGoals,
  useTasks,
  useTaskLoading,
  useTaskError,
  useFetchUserTasks,
  useFetchUserGoals,
  useGoalLoading,
  useGoalError
} from '@/src/stores'
import { useUserId } from '@/src/stores/userStore'
import { TaskCard } from '@/src/components/TaskCard.tsx/TaskCard'
import { GoalCard } from '@/src/components/GoalCard/GoalCard'
import {
  TaskFilter,
  TaskFilterType,
  TaskSortType
} from '@/src/components/TaskFilter'

export default function HomeScreen () {
  const router = useRouter()

  // All hooks must be called at the top, before any conditional logic
  const userId = useUserId()
  const tasks = useTasks()
  const isLoading = useTaskLoading()
  const error = useTaskError()
  const fetchUserTasks = useFetchUserTasks()
  const goals = useGoals()
  const isGoalLoading = useGoalLoading()
  const goalError = useGoalError()
  const fetchUserGoals = useFetchUserGoals()

  const [showGoalModal, setShowGoalModal] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [activeFilters, setActiveFilters] = useState<TaskFilterType[]>(['all'])
  const [activeSort, setActiveSort] = useState<TaskSortType>('dueDate')

  // Animation values for premium effects
  const headerOpacity = useSharedValue(0)
  const contentOffset = useSharedValue(50)

  // Fetch tasks when user ID changes
  useEffect(() => {
    if (userId) {
      fetchUserTasks(userId)
    }
  }, [userId, fetchUserTasks])

  useEffect(() => {
    if (userId) {
      fetchUserGoals(userId)
    }
  }, [userId, fetchUserGoals])

  // Entrance animations
  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 800 })
    contentOffset.value = withSpring(0, { damping: 15, stiffness: 100 })
  }, [])

  // All useMemo hooks must also be called unconditionally
  const { todaysTasks, upcomingTasks } = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayTasks = tasks.filter(task => {
      const taskDate = new Date(task.dueDate)
      taskDate.setHours(0, 0, 0, 0)
      const isCompletedToday =
        task.status === 'completed' &&
        task.completionDate &&
        new Date(task.completionDate).setHours(0, 0, 0, 0) === today.getTime()

      return taskDate.getTime() === today.getTime() || isCompletedToday
    })

    const upcoming = tasks
      .filter(task => {
        const taskDate = new Date(task.dueDate)
        taskDate.setHours(0, 0, 0, 0)
        return (
          taskDate.getTime() > today.getTime() && task.status !== 'completed'
        )
      })
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
      .slice(0, 3)

    return {
      todaysTasks: todayTasks,
      upcomingTasks: upcoming
    }
  }, [tasks])

  const hasUser = !!userId
  const displayedTasks = todaysTasks.length > 0 ? todaysTasks : upcomingTasks
  const sectionTitle =
    todaysTasks.length > 0 ? "Today's Tasks" : 'Upcoming Tasks'

  // Animated styles
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
    }
  })

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: contentOffset.value }],
      opacity: interpolate(contentOffset.value, [50, 0], [0, 1])
    }
  })

  // Show loading state if tasks are being fetched
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Animated.View style={headerAnimatedStyle}>
          <Header title='Home' />
        </Animated.View>
        <View style={styles.loadingContainer}>
          <PulseAnimation>
            <Sparkles size={48} color={colors.button.primary} />
          </PulseAnimation>
          <Text style={styles.loadingText}>Loading your productivity dashboard...</Text>
        </View>
      </View>
    )
  }

  // Show error state if there's an error
  if (error) {
    return (
      <View style={styles.container}>
        <Header title='Home' />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading tasks: {error}</Text>
        </View>
      </View>
    )
  }

  // Show login prompt if no user
  if (!hasUser) {
    return (
      <View style={styles.container}>
        <Header title='Home' />
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Please log in to view your tasks</Text>
        </View>
      </View>
    )
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const handleFilterChange = (
    filters: TaskFilterType[],
    sortBy: TaskSortType
  ) => {
    setActiveFilters(filters)
    setActiveSort(sortBy)
  }

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

  return (
    <View style={styles.container}>
      <Animated.View style={headerAnimatedStyle}>
        <Header title='Home' />
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section with Premium Styling */}
        <Animated.View 
          entering={FadeInDown.duration(800).delay(200)}
          style={styles.heroSection}
        >
          <LinearGradient
            colors={colors.gradient.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Welcome Back!</Text>
              <Text style={styles.heroSubtitle}>
                Ready to achieve your goals today?
              </Text>
              <View style={styles.heroStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{goals.length}</Text>
                  <Text style={styles.statLabel}>Active Goals</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{tasks.filter(t => t.status === 'completed').length}</Text>
                  <Text style={styles.statLabel}>Completed</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{todaysTasks.length}</Text>
                  <Text style={styles.statLabel}>Today</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Quick Actions with Enhanced Styling */}
        <Animated.View entering={FadeInDown.duration(600).delay(400)}>
          <GlassCard style={styles.quickActionsCard}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity
                style={styles.quickActionButton}
                onPress={() => setShowGoalModal(true)}
                accessibilityLabel='Set New Goal'
                accessibilityRole='button'
              >
                <LinearGradient
                  colors={colors.gradient.primary}
                  style={styles.quickActionGradient}
                >
                  <Target size={28} color={colors.text.primary} strokeWidth={2.5} />
                </LinearGradient>
                <Text style={styles.quickActionText}>Set New Goal</Text>
                <Text style={styles.quickActionSubtext}>Define your next achievement</Text>
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
                  <LinearGradient
                    colors={colors.gradient.secondary}
                    style={styles.quickActionGradient}
                  >
                    <MessageSquare size={28} color={colors.text.primary} strokeWidth={2.5} />
                  </LinearGradient>
                  <Text style={styles.quickActionText}>Log Progress</Text>
                  <Text style={styles.quickActionSubtext}>Share your achievements</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </GlassCard>
        </Animated.View>

        {/* Tasks Section with Premium Design */}
        <Animated.View entering={FadeInDown.duration(600).delay(600)}>
          <GlassCard style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <View style={styles.sectionIconContainer}>
                  <Calendar size={24} color={colors.button.primary} />
                </View>
                <View>
                  <Text style={styles.sectionTitle}>{sectionTitle}</Text>
                  {todaysTasks.length === 0 && upcomingTasks.length > 0 && (
                    <Text style={styles.sectionSubtitle}>
                      Next 3 upcoming tasks
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.sectionActions}>
                <TouchableOpacity
                  onPress={() => router.push('/(tabs)/tasks')}
                  style={styles.viewAllButton}
                  accessibilityLabel='View all tasks'
                  accessibilityRole='button'
                >
                  <Text style={styles.viewAllText}>View All</Text>
                  <ChevronRight size={16} color={colors.button.primary} />
                </TouchableOpacity>
                <FloatingActionButton
                  onPress={() => setShowTaskModal(true)}
                  size="small"
                />
              </View>
            </View>

            {displayedTasks.map((task, index, filteredTasks) => (
              <TaskCard
                key={task.id}
                task={task}
                isLast={index === filteredTasks.length - 1}
              />
            ))}

            {displayedTasks.length === 0 && (
              <View style={styles.emptyStateContainer}>
                <TrendingUp size={48} color={colors.text.muted} />
                <Text style={styles.emptyText}>
                  {tasks.length === 0
                    ? 'No tasks yet. Create your first task to get started!'
                    : 'No tasks for today or upcoming.'}
                </Text>
                <Button
                  title="Create Task"
                  onPress={() => setShowTaskModal(true)}
                  variant="secondary"
                  style={styles.emptyActionButton}
                />
              </View>
            )}
          </GlassCard>
        </Animated.View>

        {/* Goals Preview with Enhanced Design */}
        <Animated.View entering={FadeInDown.duration(600).delay(800)}>
          <GlassCard style={styles.goalsCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <View style={styles.sectionIconContainer}>
                  <Flag size={24} color={colors.status.success} />
                </View>
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

            {goals
              .filter(goal => goal.status === 'active')
              .sort(() => Math.random() - 0.5)
              .slice(0, 2)
              .map(goal => (
                <GoalCard key={goal.id} goal={goal} />
              ))}

            {goals.length === 0 && (
              <View style={styles.emptyGoalsContainer}>
                <Sparkles size={48} color={colors.text.muted} />
                <Text style={styles.emptyText}>
                  No goals yet. Let's set your first goal!
                </Text>
                <Button
                  title='Set a Goal'
                  onPress={() => setShowGoalModal(true)}
                  gradient
                  style={styles.emptyGoalsButton}
                />
              </View>
            )}
          </GlassCard>
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
  } as ViewStyle,

  scrollView: {
    flex: 1
  } as ViewStyle,

  content: {
    paddingBottom: 32
  } as ViewStyle,

  // Hero Section Styles
  heroSection: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.button.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  } as ViewStyle,

  heroGradient: {
    padding: 24,
  } as ViewStyle,

  heroContent: {
    alignItems: 'center',
  } as ViewStyle,

  heroTitle: {
    fontSize: fonts.sizes.xxxl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  } as TextStyle,

  heroSubtitle: {
    fontSize: fonts.sizes.lg,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.9,
  } as TextStyle,

  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  statItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
  } as ViewStyle,

  statNumber: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
  } as TextStyle,

  statLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    marginTop: 4,
    opacity: 0.8,
  } as TextStyle,

  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  } as ViewStyle,

  // Quick Actions Enhanced Styles
  quickActionsCard: {
    margin: 16,
    padding: 24,
  } as ViewStyle,

  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  } as ViewStyle,

  quickActionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  } as ViewStyle,

  quickActionGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: colors.utility.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  } as ViewStyle,

  quickActionText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    fontWeight: fonts.weights.semibold,
    textAlign: 'center',
    marginBottom: 4,
  } as TextStyle,

  quickActionSubtext: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    opacity: 0.8,
  } as TextStyle,

  // Section Styles
  sectionCard: {
    margin: 16,
    padding: 20,
  } as ViewStyle,

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  } as ViewStyle,

  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  } as ViewStyle,

  sectionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  } as ViewStyle,

  sectionTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
  } as TextStyle,

  sectionSubtitle: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted,
    marginTop: 2,
  } as TextStyle,

  sectionActions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  } as ViewStyle,

  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 59, 149, 0.1)',
  } as ViewStyle,

  viewAllText: {
    fontSize: fonts.sizes.sm,
    color: colors.button.primary,
    marginRight: 4,
    fontWeight: fonts.weights.medium,
  } as TextStyle,

  // Empty States
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  } as ViewStyle,

  emptyText: {
    fontSize: fonts.sizes.md,
    color: colors.text.muted,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 20,
    lineHeight: 24,
  } as TextStyle,

  emptyActionButton: {
    marginTop: 8,
  } as ViewStyle,

  goalsCard: {
    margin: 16,
    padding: 20,
  } as ViewStyle,

  emptyGoalsContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  } as ViewStyle,

  emptyGoalsButton: {
    marginTop: 16,
  } as ViewStyle,

  // Loading and Error States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  } as ViewStyle,

  loadingText: {
    fontSize: fonts.sizes.lg,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 24,
  } as TextStyle,

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  } as ViewStyle,

  errorText: {
    fontSize: fonts.sizes.lg,
    color: colors.status.error,
    textAlign: 'center',
  } as TextStyle,

  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  } as ViewStyle,

  loginText: {
    fontSize: fonts.sizes.lg,
    color: colors.text.muted,
    textAlign: 'center',
  } as TextStyle,
})