import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView
} from 'react-native'
import { useRouter } from 'expo-router'
import { Plus } from 'lucide-react-native'
import { Header } from '@/src/components/Header'
import { Card } from '@/src/components/Card'
import { TaskCard } from '@/src/components/TaskCard.tsx/TaskCard'
import { TaskFilter } from '@/src/components/TaskFilter'
import { colors } from '@/src/constants/colors'
import { fonts } from '@/src/constants/fonts'
import {
  useTasks,
  useSendMessageAndCreateNewChat,
  useUserId
} from '@/src/stores'
import { useUserTasks } from '@/src/hooks/useUserTasks'
import { useState, useMemo } from 'react'
import { TaskFilterType, TaskSortType } from '@/src/components/TaskFilter'
import { TaskCreationModal } from '@/src/components/TaskCreationModal'
import { globalStyles } from '@/src/constants/styles'

export default function TasksScreen () {
  const router = useRouter()
  const { isLoading, error, hasUser, tasks } = useUserTasks()
  const sendMessageAndCreateNewChat = useSendMessageAndCreateNewChat()
  const userId = useUserId()
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [activeFilters, setActiveFilters] = useState<TaskFilterType[]>(['all'])
  const [activeSort, setActiveSort] = useState<TaskSortType>('dueDate')

  const handleFilterChange = (
    filters: TaskFilterType[],
    sortBy: TaskSortType
  ) => {
    setActiveFilters(filters)
    setActiveSort(sortBy)
  }

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      if (activeFilters.includes('all')) return true

      const taskDate = new Date(task.dueDate)
      taskDate.setHours(0, 0, 0, 0)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const isToday = taskDate.getTime() === today.getTime()
      const isCompletedToday =
        task.status === 'completed' &&
        new Date(task?.completionDate ?? '').setHours(0, 0, 0, 0) ===
          today.getTime()
      const isOverdue =
        task.dueDate.getTime() + 24 * 60 * 60 * 1000 < new Date().getTime() &&
        task.status !== 'completed'
      const isTodo = task.status !== 'completed'
      const isCompleted = task.status === 'completed'

      return (
        (activeFilters.includes('today') && (isToday || isCompletedToday)) ||
        (activeFilters.includes('todo') && isTodo) ||
        (activeFilters.includes('overdue') && isOverdue) ||
        (activeFilters.includes('completed') && isCompleted)
      )
    })

    // Sort tasks
    return filtered.sort((a, b) => {
      switch (activeSort) {
        case 'alphabetical':
          return a.title.localeCompare(b.title)
        case 'priority':
          const priorityOrder = { '!!!': 3, '!!': 2, '!': 1 }
          return (
            (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
          )
        case 'dueDate':
        default:
          return a.dueDate.getTime() - b.dueDate.getTime()
      }
    })
  }, [tasks, activeFilters, activeSort])

  const handleNewTaskWithAgent = async () => {
    router.navigate('/(tabs)/agent')

    await sendMessageAndCreateNewChat(
      'Help me create a task',
      { type: 'help_request' },
      userId
    )
  }
  return (
    <SafeAreaView style={globalStyles.container}>
      <Header title='Tasks' showBackButton />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tasksCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>All Tasks</Text>
            </View>
            <View style={styles.sectionActions}>
              <TaskFilter onFilterChange={handleFilterChange} />
              <TouchableOpacity
                onPress={() => setShowTaskModal(true)}
                style={styles.addTaskButton}
                accessibilityLabel='Add new task'
                accessibilityRole='button'
              >
                <Plus size={20} color={colors.text.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size='large' color={colors.button.primary} />
              <Text style={styles.loadingText}>Loading tasks...</Text>
            </View>
          )}

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Error loading tasks: {error}</Text>
            </View>
          )}

          {!isLoading &&
            !error &&
            filteredAndSortedTasks.map((task, index, filteredTasks) => (
              <TaskCard
                key={task.id}
                task={task}
                isLast={index === filteredTasks.length - 1}
                index={index}
              />
            ))}

          {!isLoading && !error && filteredAndSortedTasks.length === 0 && (
            <Text style={styles.emptyText}>
              {tasks.length === 0
                ? 'No tasks yet. Create your first task to get started!'
                : 'No tasks match the current filters.'}
            </Text>
          )}
        </View>
      </ScrollView>

      <TaskCreationModal
        visible={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onCreateWithAgent={handleNewTaskWithAgent}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  content: {
    padding: 16,
    paddingBottom: 32
  },
  tasksCard: {
    padding: 16
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
    fontWeight: '700',
    color: colors.text.primary
  },
  sectionActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  addTaskButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.button.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  loadingText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    marginLeft: 8
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  errorText: {
    fontSize: fonts.sizes.md,
    color: colors.status?.error,
    marginLeft: 8
  },
  emptyText: {
    fontSize: fonts.sizes.md,
    color: colors.text.muted,
    textAlign: 'center',
    marginTop: 8
  }
})
