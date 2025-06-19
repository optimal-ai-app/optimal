import React from 'react'
import { View, Text } from 'react-native'
import Animated, { FadeInRight } from 'react-native-reanimated'
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
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <Animated.View
      key={id}
      entering={FadeInRight.duration(300).delay(100)}
      style={[styles.messageWrapper, styles.userMessageWrapper]}
    >
      <View style={[styles.messageBubble, styles.userMessageBubble]}>
        <Text style={styles.messageText}>{text}</Text>
        <Text style={styles.timestamp}>
          {formatTime(timestamp)}
        </Text>
      </View>
    </Animated.View>
  )
}