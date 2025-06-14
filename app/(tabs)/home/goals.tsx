import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { Link, useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeInDown } from 'react-native-reanimated'
import {
  Flag,
  ChevronRight,
  Calendar,
  Target,
  Plus,
  ChevronLeft
} from 'lucide-react-native'

import { Header } from '@/src/components/Header'
import { Card } from '@/src/components/Card'
import { GoalCreationModal } from '@/src/components/GoalCreationModal'
import { colors } from '@/src/constants/colors'
import { fonts } from '@/src/constants/fonts'

// Mock data for goals
const goals = [
  {
    id: '1',
    title: 'Do 30 pushups',
    targetValue: 30,
    currentValue: 10,
    unit: 'pushups',
    createdAt: new Date(),
    streak: 5,
    completionRate: 85
  },
  {
    id: '2',
    title: 'Read for 30 minutes daily',
    targetValue: 30,
    currentValue: 20,
    unit: 'minutes',
    createdAt: new Date(),
    streak: 3,
    completionRate: 75
  },
  {
    id: '3',
    title: 'Meditate for 10 minutes',
    targetValue: 10,
    currentValue: 8,
    unit: 'minutes',
    createdAt: new Date(),
    streak: 7,
    completionRate: 90
  }
]

export default function GoalsScreen () {
  const router = useRouter()
  const [showGoalModal, setShowGoalModal] = useState(false)

  const handleCreateWithAgent = () => {
    router.push({
      pathname: '/(tabs)/agent',
      params: {
        action: 'create-goal',
        prompt: 'Help me create a goal'
      }
    })
  }

  const handleCreateManually = () => {
    router.push('/home/create-goal')
  }

  return (
    <View style={styles.container}>
      <Header
        title='Goals'
        showBackButton
        rightAction={
          <TouchableOpacity
            onPress={() => setShowGoalModal(true)}
            style={styles.addButton}
            accessibilityLabel='Add new goal'
            accessibilityRole='button'
          >
            <Plus size={24} color={colors.text.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Active Goals */}
        <Animated.View entering={FadeInDown.duration(500).delay(100)}>
          <Text style={styles.sectionTitle}>Active Goals</Text>

          {goals.map((goal, index) => (
            <Link
              key={goal.id}
              href={{
                pathname: '/home/goal-details',
                params: { id: goal.id }
              }}
              asChild
            >
              <TouchableOpacity>
                <Card style={styles.goalCard}>
                  <View style={styles.goalHeader}>
                    <LinearGradient
                      colors={[colors.gradient.start, colors.gradient.end]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.goalProgress}
                    >
                      <Text style={styles.goalProgressText}>
                        {Math.round(
                          (goal.currentValue / goal.targetValue) * 100
                        )}
                        %
                      </Text>
                    </LinearGradient>

                    <View style={styles.goalTitleContainer}>
                      <Text style={styles.goalTitle}>{goal.title}</Text>
                      <Text style={styles.goalSubtitle}>
                        {goal.currentValue} / {goal.targetValue} {goal.unit}
                      </Text>
                    </View>

                    <ChevronRight size={20} color={colors.text.muted} />
                  </View>

                  <View style={styles.goalStats}>
                    <View style={styles.goalStat}>
                      <Calendar size={16} color={colors.button.primary} />
                      <Text style={styles.goalStatLabel}>Streak</Text>
                      <Text style={styles.goalStatValue}>
                        {goal.streak} days
                      </Text>
                    </View>

                    <View style={styles.goalStat}>
                      <Target size={16} color={colors.button.accent} />
                      <Text style={styles.goalStatLabel}>Completion</Text>
                      <Text style={styles.goalStatValue}>
                        {goal.completionRate}%
                      </Text>
                    </View>

                    <View style={styles.goalStat}>
                      <Flag size={16} color={colors.status.success} />
                      <Text style={styles.goalStatLabel}>Created</Text>
                      <Text style={styles.goalStatValue}>
                        {goal.createdAt.toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            </Link>
          ))}
        </Animated.View>
      </ScrollView>

      <GoalCreationModal
        visible={showGoalModal}
        onClose={() => setShowGoalModal(false)}
        onCreateWithAgent={handleCreateWithAgent}
        onCreateManually={handleCreateManually}
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

  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.button.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },

  sectionTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 16
  },

  goalCard: {
    padding: 16,
    marginBottom: 16
  },

  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center'
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

  goalTitleContainer: {
    flex: 1
  },

  goalTitle: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 4
  },

  goalSubtitle: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted
  },

  goalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.utility.divider
  },

  goalStat: {
    alignItems: 'center'
  },

  goalStatLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted,
    marginTop: 4,
    marginBottom: 2
  },

  goalStatValue: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary
  }
})
