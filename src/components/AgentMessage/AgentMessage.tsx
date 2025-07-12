import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  FadeInLeft,
  SlideInLeft,
  BounceIn,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  runOnJS,
  Easing
} from 'react-native-reanimated'
import {
  DatePickerTag,
  TimePickerTag,
  DaySelectorTag,
  ConfirmationTag,
  GoalNamesScroller,
  CreateTaskCardTag
} from '../AgentTags'
import { colors } from '@/src/constants/colors'
import { fonts } from '@/src/constants/fonts'
import { styles } from './AgentMessage.styles'
import { TaskData } from '../AgentTags/CreateTaskCardTag'

interface AgentMessageProps {
  id: string
  text: string
  tags: string[]
  timestamp: Date
  isLatest: boolean
  isLoading?: boolean // Add loading prop to control tag visibility
  data?: any // Optional task data from LLM
  onSendMessage: (message: string) => void
}

export const AgentMessage: React.FC<AgentMessageProps> = ({
  id,
  text,
  tags,
  timestamp,
  isLatest,
  isLoading = false, // Default to false
  data,
  onSendMessage
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [showTags, setShowTags] = useState(false)

  // Animation values
  const bubbleScale = useSharedValue(0)
  const avatarRotation = useSharedValue(0)
  const textOpacity = useSharedValue(0)
  const tagsOpacity = useSharedValue(0)

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Typewriter effect for latest message
  useEffect(() => {
    if (isLatest && text && !isLoading) {
      let currentIndex = 0
      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typeInterval)
          setShowTags(true)
        }
      }, 5) // Faster typewriter speed for quicker tag display

      return () => clearInterval(typeInterval)
    } else {
      setDisplayedText(text)
      // Only show tags if not loading
      setShowTags(!isLoading)
    }
  }, [text, isLatest, isLoading])

  // Hide tags when loading starts
  useEffect(() => {
    if (isLoading) {
      setShowTags(false)
      tagsOpacity.value = withTiming(0, { duration: 200 })
    }
  }, [isLoading])

  // Entrance animations
  useEffect(() => {
    // Avatar rotation
    avatarRotation.value = withSequence(
      withTiming(360, { duration: 600, easing: Easing.out(Easing.quad) }),
      withTiming(0, { duration: 0 })
    )

    // Bubble scale in
    bubbleScale.value = withDelay(
      200,
      withSpring(1, {
        damping: 15,
        stiffness: 150
      })
    )

    // Text fade in after bubble appears
    textOpacity.value = withDelay(400, withTiming(1, { duration: 300 }))
  }, [])

  // Tags animation when they become visible
  useEffect(() => {
    if (showTags && !isLoading) {
      tagsOpacity.value = withDelay(
        200,
        withSpring(1, { damping: 12, stiffness: 100 })
      )
    }
  }, [showTags, isLoading])

  // Animated styles
  const avatarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${avatarRotation.value}deg` }]
  }))

  const bubbleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bubbleScale.value }]
  }))

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value
  }))

  const tagsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: tagsOpacity.value
  }))

  // Only show tags if not loading and showTags is true
  const shouldShowTags = showTags && !isLoading
  const showGoalNames =
    shouldShowTags && isLatest && tags.includes('SHOW_USER_GOAL_NAMES_TAG')
  const showConfirmation =
    shouldShowTags && isLatest && tags.includes('CONFIRM_TAG')
  const showDatePicker =
    shouldShowTags && isLatest && tags.includes('DATE_PICKER_TAG')
  const showTimePicker =
    shouldShowTags && isLatest && tags.includes('TIME_PICKER_TAG')
  const showDaySelector =
    shouldShowTags && isLatest && tags.includes('DAY_SELECTOR_TAG')
  const showCreateTaskCard =
    shouldShowTags && isLatest && tags.includes('CREATE_TASK_CARD_TAG')

  return (
    <>
      <Animated.View
        // key={id}
        entering={SlideInLeft.duration(500).springify().damping(15)}
        style={[styles.messageWrapper, styles.agentMessageWrapper]}
      >
        <Animated.View style={[styles.agentAvatar, avatarAnimatedStyle]}>
          <LinearGradient
            colors={colors.gradient.primary}
            style={styles.avatarGradient}
          >
            <Text style={styles.avatarText}>AI</Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View
          style={[
            styles.messageBubble,
            styles.agentMessageBubble,
            bubbleAnimatedStyle
          ]}
        >
          <Animated.View style={textAnimatedStyle}>
            <Text style={styles.messageText}>
              {isLatest ? displayedText : text}
              {isLatest && displayedText.length < text.length && (
                <Text style={[styles.messageText, { opacity: 0.5 }]}>|</Text>
              )}
            </Text>
          </Animated.View>

          <Animated.View style={textAnimatedStyle}>
            <Text style={styles.timestamp}>{formatTime(timestamp)}</Text>
          </Animated.View>
        </Animated.View>
      </Animated.View>
      {shouldShowTags && (
        <Animated.View
          entering={FadeInLeft.delay(300).duration(400)}
          style={[styles.tagsWrapper, tagsAnimatedStyle]}
        >
          {showGoalNames && (
            <GoalNamesScroller
              onSelect={goalName =>
                onSendMessage(`Selected Goal: "${goalName}"`)
              }
            />
          )}

          {showConfirmation && (
            <ConfirmationTag onConfirm={onSendMessage} data={data} />
          )}

          {/* {showDatePicker && (
            <DatePickerTag
              onConfirm={date => onSendMessage(`Selected Date: ${date}`)}
            />
          )}

          {showTimePicker && (
            <TimePickerTag
              onConfirm={time => onSendMessage(`Selected Time: ${time}`)}
            />
          )}

          {showDaySelector && (
            <DaySelectorTag
              onConfirm={days => onSendMessage(`Selected Days: ${days}`)}
            />
          )} */}

          {showCreateTaskCard && (
            <CreateTaskCardTag
              taskData={data as TaskData}
              onConfirm={onSendMessage}
              showHeader
            />
          )}
        </Animated.View>
      )}
    </>
  )
}
