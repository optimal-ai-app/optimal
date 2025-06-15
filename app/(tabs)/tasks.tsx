import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { useRouter } from 'expo-router'
import { Plus } from 'lucide-react-native'
import { Header } from '@/src/components/Header'
import { Card } from '@/src/components/Card'
import { TaskCard } from '@/src/components/TaskCard.tsx/TaskCard'
import { TaskFilter } from '@/src/components/TaskFilter'
import { colors } from '@/src/constants/colors'
import { fonts } from '@/src/constants/fonts'
import { useUserTasks } from '@/src/stores'
import { useState, useMemo } from 'react'
import { TaskFilterType, TaskSortType } from '@/src/components/TaskFilter'
import { TaskCreationModal } from '@/src/components/TaskCreationModal'

export default function TasksScreen () {
  const router = useRouter()
  const tasks = useUserTasks()
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
      const isOverdue =
        task.dueDate.getTime() + 24 * 60 * 60 * 1000 < new Date().getTime() &&
        task.status !== 'completed'
      const isTodo = task.status !== 'completed'
      const isCompleted = task.status === 'completed'

      return (
        (activeFilters.includes('today') && isToday) ||
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

  const handleNewTaskWithAgent = () => {
    router.push({
      pathname: '/(tabs)/agent',
      params: {
        action: 'create-task',
        prompt: 'Help me create a task'
      }
    })
  }

  const handleNewTaskManually = () => {
    router.push('/home/create-task')
  }

  return (
    <View style={styles.container}>
      <Header title='Tasks' />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.tasksCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
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

          {filteredAndSortedTasks.map((task, index, filteredTasks) => (
            <TaskCard
              key={task.id}
              task={task}
              isLast={index === filteredTasks.length - 1}
            />
          ))}

          {filteredAndSortedTasks.length === 0 && (
            <Text style={styles.emptyText}>
              {tasks.length === 0
                ? 'No tasks yet. Create your first task to get started!'
                : 'No tasks match the current filters.'}
            </Text>
          )}
        </Card>
      </ScrollView>

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
  emptyText: {
    fontSize: fonts.sizes.md,
    color: colors.text.muted,
    textAlign: 'center',
    marginTop: 8
  }
})
