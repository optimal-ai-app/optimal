import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ViewStyle,
  TextStyle
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  FadeInUp,
  FadeInRight,
  FadeInLeft
} from 'react-native-reanimated'

import { Header } from '@/src/components/Header'
import { ChatInput } from '@/src/components/ChatInput'
import { colors } from '@/src/constants/colors'
import { fonts } from '@/src/constants/fonts'
import {
  useChatMessages,
  useSendMessage,
  useAddMessage,
  useChatLoading,
  type ChatMessage
} from '@/src/stores'

// Use ChatMessage type from store

// Carousel options
const carouselOptions = [
  {
    id: '1',
    text: 'I completed my workout today',
    action: () => console.log('Workout completed')
  },
  {
    id: '2',
    text: 'I need help staying motivated',
    action: () => console.log('Motivation help')
  },
  {
    id: '3',
    text: 'Set a new goal for me',
    action: () => console.log('New goal')
  },
  {
    id: '4',
    text: "I'm feeling stuck on this task",
    action: () => console.log('Feeling stuck')
  },
  {
    id: '5',
    text: 'Show me my progress',
    action: () => console.log('Show progress')
  },
  {
    id: '6',
    text: 'I want to break down a big goal',
    action: () => console.log('Break down goal')
  }
]

export default function AgentScreen () {
  // Get params from navigation
  const params = useLocalSearchParams()
  const action = params.action as string | undefined

  // Refs
  const scrollViewRef = useRef<ScrollView>(null)

  // Store
  const sendMessage = useSendMessage()
  const addMessage = useAddMessage()
  const isLoading = useChatLoading()

  // State
  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  const messages = useChatMessages()

  useEffect(() => {
    if (messages.length === 0) {
      addMessage({
        id: 'welcome',
        content:
          params.action === 'new-goal' ? 'Let’s set a goal!' : 'Welcome!',
        role: 'agent',
        timestamp: new Date()
      })
    }
  }, []) // Remove dependencies to prevent infinite loop

  // Handle send message
  const handleSendMessage = async () => {
    if (!message.trim()) return

    const messageText = message
    setMessage('')

    // Determine context based on action
    const context =
      action === 'new-goal' ? { type: 'goal_setting' as const } : undefined

    // Send message via store
    await sendMessage(messageText, context)
    scrollToBottom()
  }

  // Handle help request - this doesn't add to messages, just shows help
  const handleHelpRequest = () => {
    // For now, we'll just log the help request
    // You could show a modal or navigate to a help screen instead
    console.log('Help requested')

    // Optional: Could send a help message to get AI response
    // sendMessage('I need help', { type: 'help_request' })
  }

  // Handle voice recording
  const handleVoiceRecord = () => {
    if (Platform.OS === 'web') {
      // For web, we'll show a message via the store
      addMessage({
        id: Date.now().toString(),
        content: 'Voice recording is not available on web.',
        role: 'agent',
        timestamp: new Date()
      })
      scrollToBottom()
      return
    }

    setIsRecording(!isRecording)

    if (!isRecording) {
      // Starting recording
      setTimeout(() => {
        setIsRecording(false)
        const transcribedText = 'I finished my workout today and feel great!'
        setMessage(transcribedText)
      }, 2000)
    }
  }

  // Scroll to bottom helper
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <View style={styles.container}>
      <Header title='AI Agent' />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={[
            styles.messagesContainer,
            { paddingBottom: 24, marginBottom: 24 }
          ]}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
        >
          {messages.map((msg, index) => (
            <Animated.View
              key={msg.id}
              entering={
                msg.role === 'user'
                  ? FadeInRight.duration(300).delay(100)
                  : FadeInLeft.duration(300).delay(100)
              }
              style={[
                styles.messageWrapper,
                msg.role === 'user'
                  ? styles.userMessageWrapper
                  : styles.agentMessageWrapper
              ]}
            >
              {msg.role === 'agent' && (
                <View style={styles.agentAvatar}>
                  <LinearGradient
                    colors={[colors.gradient.start, colors.gradient.end]}
                    style={styles.avatarGradient}
                  >
                    <Text style={styles.avatarText}>AI</Text>
                  </LinearGradient>
                </View>
              )}

              <View
                style={[
                  styles.messageBubble,
                  msg.role === 'user'
                    ? styles.userMessageBubble
                    : styles.agentMessageBubble
                ]}
              >
                <Text style={styles.messageText}>{msg.content}</Text>
                <Text style={styles.timestamp}>
                  {formatTime(msg.timestamp)}
                </Text>
              </View>
            </Animated.View>
          ))}
        </ScrollView>

        <Animated.View
          entering={FadeInUp.duration(500)}
          style={styles.inputContainer}
        >
          <ChatInput
            message={message}
            onMessageChange={setMessage}
            onSendMessage={handleSendMessage}
            onVoiceRecord={handleVoiceRecord}
            onHelpRequest={handleHelpRequest}
            isRecording={isRecording}
            carouselOptions={carouselOptions}
            placeholder={
              action === 'new-goal'
                ? 'Enter your goal...'
                : 'Type your message...'
            }
          />
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary
  } as ViewStyle,

  keyboardAvoidingView: {
    flex: 1
  } as ViewStyle,

  messagesContainer: {
    flex: 1,
    paddingBottom: 24,
    marginBottom: 24,
    paddingTop: 24,
    marginTop: 24
  } as ViewStyle,

  messagesContent: {
    padding: 16,
    paddingTop: 24,
    paddingBottom: 16
  } as ViewStyle,

  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%'
  } as ViewStyle,

  userMessageWrapper: {
    alignSelf: 'flex-end'
  } as ViewStyle,

  agentMessageWrapper: {
    alignSelf: 'flex-start'
  } as ViewStyle,

  agentAvatar: {
    marginRight: 8,
    alignSelf: 'flex-end'
  } as ViewStyle,

  avatarGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  } as ViewStyle,

  avatarText: {
    color: colors.text.primary,
    fontSize: fonts.sizes.xs,
    fontWeight: '700'
  } as TextStyle,

  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '100%'
  } as ViewStyle,

  userMessageBubble: {
    backgroundColor: colors.button.primary,
    borderBottomRightRadius: 4
  } as ViewStyle,

  agentMessageBubble: {
    backgroundColor: colors.background.container,
    borderBottomLeftRadius: 4
  } as ViewStyle,

  messageText: {
    color: colors.text.primary,
    fontSize: fonts.sizes.md,
    lineHeight: 20
  } as TextStyle,

  timestamp: {
    fontSize: fonts.sizes.xs,
    color: colors.text.muted,
    alignSelf: 'flex-end',
    marginTop: 4
  } as TextStyle,

  inputContainer: {
    backgroundColor: colors.background.primary,
    paddingBottom: 0
  } as ViewStyle
})
