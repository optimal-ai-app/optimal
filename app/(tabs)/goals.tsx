import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
  TextStyle
} from 'react-native'
import { useRouter } from 'expo-router'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Plus } from 'lucide-react-native'

import { Header } from '@/src/components/Header'
import { GoalCreationModal } from '@/src/components/GoalCreationModal'
import { colors } from '@/src/constants/colors'
import { fonts } from '@/src/constants/fonts'
import { GoalCard } from '@/src/components/GoalCard/GoalCard'
import {
  useGoals,
  Goal,
  useSendMessageAndCreateNewChat,
  useUserId
} from '@/src/stores'

export default function GoalsScreen () {
  const router = useRouter()
  const [showGoalModal, setShowGoalModal] = useState(false)
  const goals = useGoals() as unknown as Goal[]
  const sendMessageAndCreateNewChat = useSendMessageAndCreateNewChat()
  const userId = useUserId()

  const handleCreateWithAgent = async () => {
    // Send message and create new chat directly through store
    await sendMessageAndCreateNewChat(
      'Help me create a goal',
      { type: 'goal_setting' },
      userId
    )

    // Navigate to agent page (no params needed since store is updated)
    router.push('/(tabs)/agent')
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
            <GoalCard key={index} goal={goal} />
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
  } as ViewStyle,

  scrollView: {
    flex: 1
  } as ViewStyle,

  content: {
    padding: 16,
    paddingBottom: 32
  } as ViewStyle,

  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.button.primary,
    justifyContent: 'center',
    alignItems: 'center'
  } as ViewStyle,

  sectionTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 16
  } as TextStyle,

  goalCard: {
    padding: 16,
    marginBottom: 16
  } as ViewStyle,

  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  } as ViewStyle,

  goalProgress: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  } as ViewStyle,

  goalProgressText: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary
  } as TextStyle,

  goalTitleContainer: {
    flex: 1
  } as ViewStyle,

  goalTitle: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 4
  } as TextStyle,

  goalSubtitle: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted
  } as TextStyle,

  goalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.utility.divider
  } as ViewStyle,

  goalStat: {
    alignItems: 'center'
  } as ViewStyle,

  goalStatLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted,
    marginTop: 4,
    marginBottom: 2
  } as TextStyle,

  goalStatValue: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary
  } as TextStyle
})
