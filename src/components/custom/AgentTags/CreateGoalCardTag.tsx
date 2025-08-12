import React, { useRef } from 'react'
import { View, Text, TouchableOpacity, Platform, TextInput } from 'react-native'
import { Target, Calendar, Tag, Send, RefreshCw } from 'lucide-react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

import { colors } from '@/src/constants/colors'
import { fonts } from '@/src/constants/fonts'
import { styles } from './AgentTags.styles'
import { useAddGoal } from '@/src/stores'
import { useUserId } from '@/src/stores/userStore'
import { Goal } from '@/src/stores/types'
import DateTimePicker from '@react-native-community/datetimepicker'

export interface GoalData {
  goalTitle?: string
  goalDescription?: string
  dueTime?: string
  tags?: string[]
}

interface CreateGoalCardTagProps {
  goalData?: GoalData
  onConfirm: (message: string) => void
  showHeader?: boolean
}

export const CreateGoalCardTag: React.FC<CreateGoalCardTagProps> = ({
  goalData,
  onConfirm,
  showHeader = false
}) => {
  const addGoal = useAddGoal()
  const userId = useUserId()
  const [isCreating, setIsCreating] = React.useState(false)

  // Suggested date coming from the agent (shown but NOT selected yet)
  const suggestedDueDate = React.useMemo(() => {
    if (goalData?.dueTime) {
      const parsed = new Date(goalData.dueTime)
      return isNaN(parsed.getTime()) ? undefined : parsed
    }
    return undefined
  }, [goalData?.dueTime])

  // Actual date user picked. Starts undefined, must be set via picker.
  const [dueDate, setDueDate] = React.useState<Date | undefined>(undefined)

  const [showDatePicker, setShowDatePicker] = React.useState(false)

  // Web-only hidden input to trigger native date picker dialog
  const webDateInputRef = useRef<TextInput>(null)

  const handleDatePress = () => {
    if (Platform.OS === 'web') {
      webDateInputRef.current?.focus()
    } else {
      setShowDatePicker(true)
    }
  }

  const handleWebDateChange = (dateString: string) => {
    if (dateString) {
      const selected = new Date(dateString)
      if (!isNaN(selected.getTime())) {
        setDueDate(selected)
      }
    }
  }

  // Cap description to 300 characters while still showing full text in UI
  const cappedDescription = React.useMemo(() => {
    if (goalData?.goalDescription) {
      return goalData.goalDescription.length > 300
        ? goalData.goalDescription.slice(0, 300)
        : goalData.goalDescription
    }
    return 'Goal description will appear here'
  }, [goalData?.goalDescription])

  const formatDueDate = (date: Date) => {
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    if (diffDays > 0) return `${diffDays} days left`
    return 'Select Due Date'
  }

  const isOverdue =
    (dueDate ?? suggestedDueDate) !== undefined &&
    (dueDate ?? suggestedDueDate)!.getTime() + 1 * 24 * 60 * 60 * 1000 <
      new Date().getTime()

  const handleDateChange = (event: any, selected?: Date) => {
    if (selected) {
      setDueDate(selected)
    }
    if (Platform.OS !== 'ios') {
      setShowDatePicker(false)
    }
  }

  const createGoalObject = (): Goal => {
    return {
      id: '',
      title: goalData?.goalTitle || 'New Goal',
      description: cappedDescription,
      createdAt: new Date(),
      dueDate: dueDate || new Date(), // Ensure a date is always present
      status: 'active',
      progress: 0,
      streak: 0,
      tags: goalData?.tags || [],
      updatedAt: new Date()
    }
  }

  const handleCreateGoal = async () => {
    if (!userId || !dueDate) return

    setIsCreating(true)
    try {
      const goalData = createGoalObject()

      await addGoal(goalData, userId, goalData?.tags)

      let successMessage = `Add Goal`

      onConfirm(successMessage)
    } catch (error) {
      console.error('Failed to create goal:', error)
      onConfirm('❌ Failed to create goal. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const handleReevaluateGoal = () => {
    onConfirm('Please suggest a different goal for me.')
  }

  const canCreateGoal = !!dueDate && !isCreating

  return (
    <Animated.View
      entering={FadeInDown.duration(400)}
      style={[styles.taskCardContainer]}
      onStartShouldSetResponder={() => false}
      onMoveShouldSetResponder={() => false}
    >
      {showHeader && (
        <View style={styles.taskCardHeader}>
          <Text style={styles.taskCardTitle}>Create Goal</Text>
        </View>
      )}

      <View style={styles.taskCardContent}>
        {/* Goal Card Display - matching GoalCard design */}
        <View style={styles.goalPreview}>
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
                  {goalData?.goalTitle || 'New Goal'}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: colors.status?.success || '#10B981'
                  }
                ]}
              >
                <Text style={styles.statusText}>Active</Text>
              </View>
            </View>

            {/* Description */}
            <View style={{ marginBottom: 12 }}>
              <Text style={styles.progressText}>{cappedDescription}</Text>
            </View>

            {/* Tags */}
            {goalData?.tags && goalData.tags.length > 0 && (
              <View style={{ marginBottom: 12 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 4
                  }}
                >
                  <Tag size={12} color={colors.text.secondary} />
                  <Text style={[styles.progressText, { marginLeft: 4 }]}>
                    Tags
                  </Text>
                </View>
                <View
                  style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}
                >
                  {goalData.tags.map((tag, index) => (
                    <View
                      key={index}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <Text
                        style={{
                          fontSize: fonts.sizes.xs,
                          color: colors.text.secondary
                        }}
                      >
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Due date */}
            <View style={[styles.footerRow, { justifyContent: 'center' }]}>
              <TouchableOpacity
                style={styles.dueDateContainer}
                onPress={handleDatePress}
              >
                {/* Hidden input for web platform to open date dialog */}
                {Platform.OS === 'web' && (
                  <TextInput
                    ref={webDateInputRef}
                    style={{ display: 'none' }}
                    onChange={e => handleWebDateChange(e.nativeEvent.text)}
                    // @ts-ignore - react-native-web supports type attribute
                    type='date'
                  />
                )}
                <Calendar
                  size={14}
                  color={
                    isOverdue ? colors.status?.error : colors.text.secondary
                  }
                />
                <Text
                  style={[styles.dueDateText, isOverdue && styles.overdueText]}
                >
                  {dueDate
                    ? formatDueDate(dueDate)
                    : suggestedDueDate
                    ? formatDueDate(suggestedDueDate)
                    : 'Select Due Date'}
                </Text>
              </TouchableOpacity>
            </View>

            {showDatePicker && Platform.OS !== 'web' && (
              <View style={styles.pickerContainer}>
                <DateTimePicker
                  value={dueDate || new Date()} // Ensure a date is always passed
                  mode='date'
                  display='default'
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
                {Platform.OS !== 'ios' && (
                  <TouchableOpacity
                    style={styles.pickerCloseButton}
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Text style={styles.pickerCloseText}>Done</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.taskCardFooter}>
        <View style={styles.goalActionButtons}>
          <TouchableOpacity
            style={[styles.reevaluateButton]}
            onPress={handleReevaluateGoal}
            disabled={isCreating}
          >
            <RefreshCw size={16} color={colors.text.secondary} />
            <Text style={styles.reevaluateButtonText}>Reevaluate Goal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.addGoalButton,
              (!canCreateGoal || isCreating) && styles.addGoalButtonDisabled
            ]}
            onPress={handleCreateGoal}
            disabled={!canCreateGoal}
          >
            <Send size={16} color={colors.text.primary} />
            <Text
              style={[
                styles.addGoalButtonText,
                (!canCreateGoal || isCreating) &&
                  styles.addGoalButtonTextDisabled
              ]}
            >
              {isCreating ? 'Creating...' : 'Add Goal'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  )
}
