import React from 'react'
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native'
import { Link } from 'expo-router'
import { ChevronRight, Target, Flame } from 'lucide-react-native'
import { Goal } from '@/src/stores'
import { colors } from '@/src/constants/colors'
import { styles } from './GoalCard.styles'

type Props = {
  goal: Goal
}

export const GoalCard: React.FC<Props> = ({ goal }) => {
  const goalPreviewStyle = {
    ...styles.goalPreview
  } as ViewStyle

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return colors.status?.success || '#10B981'
    if (progress >= 50) return colors.status?.warning || '#F59E0B'
    return colors.status?.error || '#EF4444'
  }

  const formatDueDate = (date: Date) => {
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Completion day: today!'
    if (diffDays === 1) return 'Completion day: tomorrow!'
    if (diffDays > 0) return `Completion day in: ${diffDays} days`
    return 'Completion day: overdue!'
  }

  return (
    <Link
      href={{
        pathname: '/home/goal-details',
        params: { id: goal.id }
      }}
      asChild
    >
      <TouchableOpacity
        style={goalPreviewStyle}
        accessibilityLabel={`Goal: ${goal.title}`}
        accessibilityRole='button'
        accessibilityHint='View goal details'
      >
        <View style={styles.cardContent}>
          {/* Header with title and status */}
          <View style={styles.headerRow}>
            <View style={styles.titleContainer}>
              <Target
                size={16}
                color={colors.text.primary}
                style={styles.titleIcon}
              />
              <Text style={styles.goalTitle} numberOfLines={1}>
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
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${goal.progress}%`,
                      backgroundColor: getProgressColor(goal.progress)
                    }
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {Math.round(goal.progress)}% complete
              </Text>
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
            <Text style={styles.dueDateText}>
              {formatDueDate(goal.dueDate)}
            </Text>
            <ChevronRight size={20} color={colors.text.muted} />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  )
}
