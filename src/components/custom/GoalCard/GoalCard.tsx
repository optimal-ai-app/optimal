import React from 'react'
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native'
import { Link } from 'expo-router'
import {
  ChevronRight,
  Target,
  Flame,
  Calendar,
  Clock,
  Trophy,
  TrendingUp,
  AlertCircle
} from 'lucide-react-native'
import { Goal } from '@/src/stores'
import { colors } from '@/src/constants/colors'
import { styles } from './GoalCard.styles'
import { Card } from '../../default/Card'
import { itemCardStyle } from '@/src/constants/styles'

type Props = {
  goal: Goal
}

export const GoalCard: React.FC<Props> = ({ goal }) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return colors.status?.success || '#10B981'
    if (progress >= 50) return colors.status?.warning || '#F59E0B'
    return colors.status?.error || '#EF4444'
  }

  const getProgressIcon = (progress: number) => {
    if (progress >= 80)
      return <Trophy size={16} color={colors.status?.success || '#10B981'} />
    if (progress >= 50)
      return (
        <TrendingUp size={16} color={colors.status?.warning || '#F59E0B'} />
      )
    return <AlertCircle size={16} color={colors.status?.error || '#EF4444'} />
  }

  const formatDueDate = (date: Date) => {
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    if (diffDays > 0) return `${diffDays} days left`
    return 'Overdue'
  }

  const isOverdue =
    goal.dueDate.getTime() + 1 * 24 * 60 * 60 * 1000 < new Date().getTime() &&
    goal.status === 'active'

  const progressWidth = Math.max(0, Math.min(100, goal.progress))

  const combinedStyle: ViewStyle = {
    ...itemCardStyle,
    ...(isOverdue ? styles.overdueGoal : {})
  }

  return (
    <Card>
      <Link
        href={{
          pathname: '/home/goal-details',
          params: { id: goal.id }
        }}
        asChild
      >
        <TouchableOpacity
          style={combinedStyle}
          accessibilityLabel={`Goal: ${goal.title}`}
          accessibilityRole='button'
          accessibilityHint='View goal details'
        >
          <View style={styles.cardContent}>
            {/* Header with title and status */}
            <View style={styles.headerRow}>
              <View style={styles.titleContainer}>
                <View style={styles.titleIconContainer}>
                  <Target
                    size={16}
                    color={colors.text.primary}
                    style={styles.titleIcon}
                  />
                </View>
                <Text style={styles.goalTitle} numberOfLines={2}>
                  {goal.title}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      goal.status === 'active'
                        ? colors.status?.success || '#10B981'
                        : colors.utility.divider
                  }
                ]}
              >
                <Text style={styles.statusText}>
                  {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                </Text>
              </View>
            </View>

            {/* Progress and stats row */}
            <View style={styles.statsRow}>
              <View style={styles.progressContainer}>
                <View style={styles.progressHeader}>
                  {getProgressIcon(goal.progress)}
                  <Text style={styles.progressText}>
                    {Math.round(goal.progress)}% complete
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        flex: progressWidth,
                        backgroundColor: getProgressColor(goal.progress)
                      }
                    ]}
                  />
                  <View style={{ flex: 100 - progressWidth }} />
                </View>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Flame size={16} color={'#F97316'} strokeWidth={3} />
                  <Text style={styles.statText}>{goal.streak}</Text>
                </View>
              </View>
            </View>

            {/* Due date */}
            <View style={styles.footerRow}>
              <View style={styles.dueDateContainer}>
                <Calendar
                  size={14}
                  color={
                    isOverdue ? colors.status?.error : colors.text.secondary
                  }
                />
                <Text
                  style={[styles.dueDateText, isOverdue && styles.overdueText]}
                >
                  {formatDueDate(goal.dueDate)}
                </Text>
              </View>
              <ChevronRight size={20} color={colors.text.muted} />
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    </Card>
  )
}
