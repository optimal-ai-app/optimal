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
import { GoalCard } from '@/src/components/GoalCard/GoalCard'
import { useUserGoals, Goal } from '@/src/stores'

export default function GoalsScreen () {
  const router = useRouter()
  const [showGoalModal, setShowGoalModal] = useState(false)
  const goals = useUserGoals() as unknown as Goal[]
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

          {goals.map(goal => (
            <GoalCard key={goal.id} goal={goal} />
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
