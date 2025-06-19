import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import Animated, {
  FadeInRight,
  SlideInRight,
  BounceInRight,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  Easing
} from 'react-native-reanimated'
import { styles } from './UserMessage.styles'

interface UserMessageProps {
  id: string
  text: string
  timestamp: Date
}

export const UserMessage: React.FC<UserMessageProps> = ({
  id,
  text,
  timestamp
}) => {
  // Animation values
  const bubbleScale = useSharedValue(0)
  const textOpacity = useSharedValue(0)
  const shadowOpacity = useSharedValue(0)

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Entrance animations
  useEffect(() => {
    // Bubble scale with bounce
    bubbleScale.value = withDelay(
      100,
      withSpring(1, {
        damping: 12,
        stiffness: 200
      })
    )

    // Text fade in
    textOpacity.value = withDelay(
      200,
      withTiming(1, { duration: 400, easing: Easing.out(Easing.quad) })
    )

    // Shadow fade in
    shadowOpacity.value = withDelay(150, withTiming(0.1, { duration: 300 }))
  }, [])

  // Animated styles
  const bubbleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bubbleScale.value }],
    shadowOpacity: shadowOpacity.value,
    elevation: shadowOpacity.value * 20
  }))

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value
  }))

  return (
    <Animated.View
      key={id}
      entering={SlideInRight.duration(400).springify().damping(12)}
      style={[styles.messageWrapper, styles.userMessageWrapper]}
    >
      <Animated.View
        style={[
          styles.messageBubble,
          styles.userMessageBubble,
          bubbleAnimatedStyle
        ]}
      >
        <Animated.View style={textAnimatedStyle}>
          <Text style={styles.messageText}>{text}</Text>
          <Text style={styles.timestamp}>{formatTime(timestamp)}</Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  )
}
