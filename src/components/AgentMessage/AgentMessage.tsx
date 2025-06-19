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
  GoalNamesScroller
} from '../AgentTags'
import { colors } from '@/src/constants/colors'
import { fonts } from '@/src/constants/fonts'
import { styles } from './AgentMessage.styles'

interface AgentMessageProps {
  id: string
  text: string
  tags: string[]
  timestamp: Date
  isLatest: boolean
  onSendMessage: (message: string) => void
}

export const AgentMessage: React.FC<AgentMessageProps> = ({
  id,
  text,
  tags,
  timestamp,
  isLatest,
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
    if (isLatest && text) {
      let currentIndex = 0
      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typeInterval)
          setShowTags(true)
        }
      }, 30) // Adjust speed here

      return () => clearInterval(typeInterval)
    } else {
      setDisplayedText(text)
      setShowTags(true)
    }
  }, [text, isLatest])

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
    if (showTags) {
      tagsOpacity.value = withDelay(
        200,
        withSpring(1, { damping: 12, stiffness: 100 })
      )
    }
  }, [showTags])

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

  const showGoalNames = isLatest && tags.includes('SHOW_USER_GOAL_NAMES')
  const showConfirmation = isLatest && tags.includes('CONFIRM_TAG')
  const showDatePicker = isLatest && tags.includes('DATE_PICKER_TAG')
  const showTimePicker = isLatest && tags.includes('TIME_PICKER_TAG')
  const showDaySelector = isLatest && tags.includes('DAY_SELECTOR_TAG')

  return (
    <Animated.View
      key={id}
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

        {showTags && (
          <Animated.View style={tagsAnimatedStyle}>
            {showGoalNames && (
              <GoalNamesScroller
                onSelect={goalName =>
                  onSendMessage(`Selected Goal: "${goalName}"`)
                }
              />
            )}

            {showConfirmation && <ConfirmationTag onConfirm={onSendMessage} />}

            {showDatePicker && (
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
            )}
          </Animated.View>
        )}

        <Animated.View style={textAnimatedStyle}>
          <Text style={styles.timestamp}>{formatTime(timestamp)}</Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  )
}
