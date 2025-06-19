import React from 'react'
import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeInLeft } from 'react-native-reanimated'
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
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const showGoalNames = isLatest && tags.includes('SHOW_USER_GOAL_NAMES')
  const showConfirmation = isLatest && tags.includes('CONFIRM_TAG')
  const showDatePicker = isLatest && tags.includes('DATE_PICKER_TAG')
  const showTimePicker = isLatest && tags.includes('TIME_PICKER_TAG')
  const showDaySelector = isLatest && tags.includes('DAY_SELECTOR_TAG')

  return (
    <Animated.View
      key={id}
      entering={FadeInLeft.duration(300).delay(100)}
      style={[styles.messageWrapper, styles.agentMessageWrapper]}
    >
      <View style={styles.agentAvatar}>
        <LinearGradient
          colors={[colors.gradient.start, colors.gradient.end]}
          style={styles.avatarGradient}
        >
          <Text style={styles.avatarText}>AI</Text>
        </LinearGradient>
      </View>
      
      <View style={[styles.messageBubble, styles.agentMessageBubble]}>
        <Text style={styles.messageText}>{text}</Text>
        
        {showGoalNames && (
          <GoalNamesScroller
            onSelect={goalName =>
              onSendMessage(`Selected Goal: "${goalName}"`)
            }
          />
        )}
        
        {showConfirmation && (
          <ConfirmationTag onConfirm={onSendMessage} />
        )}
        
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
        
        <Text style={styles.timestamp}>
          {formatTime(timestamp)}
        </Text>
      </View>
    </Animated.View>
  )
}