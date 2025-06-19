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
  TextStyle,
  Animated as RNAnimated,
  Easing,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  FadeInUp,
  FadeInRight,
  FadeInLeft,
  withRepeat,
  withSequence,
  withTiming,
  useAnimatedStyle,
  useSharedValue
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
  type ChatMessage,
  useGoals,
  useFetchUserGoals,
  useUserId
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

const LoadingDots = () => {
  const dots = [useSharedValue(0.3), useSharedValue(0.3), useSharedValue(0.3)]

  useEffect(() => {
    dots.forEach((dot, index) => {
      const delay = index * 200 // Reduced delay for smoother flow

      setTimeout(() => {
        dot.value = withRepeat(
          withSequence(
            withTiming(1, {
              duration: 600,
              easing: Easing.out(Easing.cubic)
            }),
            withTiming(0.2, {
              duration: 600,
              easing: Easing.in(Easing.cubic)
            })
          ),
          -1,
          false
        )
      }, delay)
    })
  }, [])

  const dotStyles = dots.map(dot =>
    useAnimatedStyle(() => ({
      opacity: dot.value,
      transform: [
        {
          scale: 0.7 + dot.value * 0.3 // Subtle scale animation
        }
      ]
    }))
  )

  return (
    <View style={styles.loadingContainer}>
      {dotStyles.map((style, index) => (
        <Animated.View key={index} style={[styles.dot, style]} />
      ))}
    </View>
  )
}

// Helper to extract tags and content from agent message
function extractTagsAndContent (content: { summary: string; tags: string[] }): {
  text: string
  tags: string[]
} {
  try {
    // If content is already an object (not a string), use it directly
    const obj = typeof content === 'string' ? JSON.parse(content) : content
    return {
      text: obj.summary || '',
      tags: Array.isArray(obj.tags) ? obj.tags : []
    }
  } catch {
    // fallback for legacy/plaintext messages
    return { text: typeof content === 'string' ? content : '', tags: [] }
  }
}

// Component: Scrollable list of goal names
const GoalNamesScroller = ({
  onSelect
}: {
  onSelect: (goalName: string) => void
}) => {
  const goals = useGoals()
  if (!goals.length) return null
  return (
    <FlatList
      data={goals}
      horizontal
      keyExtractor={item => item.id}
      style={{ marginTop: 8, marginBottom: 4 }}
      contentContainerStyle={{ gap: 8, paddingHorizontal: 4 }}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            backgroundColor: colors.button.primary,
            borderRadius: 16,
            paddingVertical: 8,
            paddingHorizontal: 16,
            marginRight: 4
          }}
          onPress={() => onSelect(item.title)}
        >
          <Text style={{ color: colors.text.primary, fontWeight: '600' }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
    />
  )
}

// Component: Confirmation buttons for CONFIRM_TAG
const ConfirmationButtons = ({
  onConfirm
}: {
  onConfirm: (action: string) => void
}) => {
  return (
    <View style={styles.confirmationContainer}>
      <TouchableOpacity
        style={[styles.confirmButton, styles.proceedButton]}
        onPress={() => onConfirm('Yes')}
      >
        <Text style={styles.confirmButtonText}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.confirmButton, styles.tryElseButton]}
        onPress={() => onConfirm('Something Else')}
      >
        <Text style={styles.confirmButtonText}>Something Else</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function AgentScreen () {
  // Get params from navigation
  const params = useLocalSearchParams()
  const action = params.action as string | undefined
  const prompt = params.prompt as string | undefined

  // Refs
  const scrollViewRef = useRef<ScrollView>(null)

  // Store
  const sendMessage = useSendMessage()
  const addMessage = useAddMessage()
  const isLoading = useChatLoading()

  // State
  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [promptSent, setPromptSent] = useState(false)

  const messages = useChatMessages()
  const fetchUserGoals = useFetchUserGoals()
  const userId = useUserId()

  useEffect(() => {
    if (messages.length === 0) {
      let welcomeMessage = 'Welcome!'

      // Set welcome message based on action
      if (action === 'create-goal') {
        welcomeMessage =
          "I'd love to help you create a meaningful goal! What would you like to achieve?"
      } else if (action === 'generate-tasks') {
        welcomeMessage =
          "I'll help you break down your goal into actionable tasks. Let me know the details!"
      }

      addMessage({
        id: 'welcome',
        content: {
          summary: welcomeMessage,
          tags: []
        },
        role: 'agent',
        timestamp: new Date()
      })
    }

    // Auto-send prompt if provided, but only once
    if (prompt && !promptSent && messages.length <= 1) {
      setMessage(prompt)
      setPromptSent(true)
      setTimeout(() => {
        handleSendMessage(prompt)
      }, 500)
    }

    // Check if any agent message has the SHOW_USER_GOAL_NAMES tag
    const shouldShowGoalNames = messages.some(msg => {
      if (msg.role !== 'agent') return false
      try {
        return msg.content.tags.includes('SHOW_USER_GOAL_NAMES')
      } catch {
        return false
      }
    })
    if (shouldShowGoalNames && userId) {
      fetchUserGoals(userId)
    }
  }, [action, prompt, messages, userId, promptSent])

  // Handle send message
  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || message
    if (!textToSend.trim()) return

    setMessage('')

    // Determine context based on action
    let context: ChatMessage['context'] | undefined
    if (action === 'create-goal') {
      context = { type: 'goal_setting' }
    } else if (action === 'generate-tasks') {
      context = { type: 'goal_response' }
    }

    // Send message via store
    await sendMessage(textToSend, context, userId)
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
        content: {
          summary: 'Voice recording is not available on web.',
          tags: []
        },
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
          {messages.map((msg, index) => {
            if (msg.role === 'agent') {
              const { text, tags } = extractTagsAndContent(msg.content)
              // Only show tags on the latest agent message
              const isLatestAgentMessage =
                index === messages.length - 1 ||
                (index === messages.length - 2 && isLoading)
              const showGoalNames =
                isLatestAgentMessage && tags.includes('SHOW_USER_GOAL_NAMES')
              const showConfirmation =
                isLatestAgentMessage && tags.includes('CONFIRM_TAG')
              return (
                <Animated.View
                  key={msg.id}
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
                  <View
                    style={[styles.messageBubble, styles.agentMessageBubble]}
                  >
                    <Text style={styles.messageText}>{text}</Text>
                    {showGoalNames && (
                      <GoalNamesScroller
                        onSelect={goalName =>
                          handleSendMessage(`Selected Goal: "${goalName}"`)
                        }
                      />
                    )}
                    {showConfirmation && (
                      <ConfirmationButtons
                        onConfirm={action => handleSendMessage(action)}
                      />
                    )}
                    <Text style={styles.timestamp}>
                      {formatTime(msg.timestamp)}
                    </Text>
                  </View>
                </Animated.View>
              )
            }
            return (
              <Animated.View
                key={msg.id}
                entering={FadeInRight.duration(300).delay(100)}
                style={[styles.messageWrapper, styles.userMessageWrapper]}
              >
                <View style={[styles.messageBubble, styles.userMessageBubble]}>
                  <Text style={styles.messageText}>{msg.content.summary}</Text>
                  <Text style={styles.timestamp}>
                    {formatTime(msg.timestamp)}
                  </Text>
                </View>
              </Animated.View>
            )
          })}

          {isLoading && (
            <Animated.View
              entering={FadeInLeft.duration(300)}
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
                <LoadingDots />
              </View>
            </Animated.View>
          )}
        </ScrollView>

        <Animated.View
          entering={FadeInUp.duration(500)}
          style={styles.inputContainer}
        >
          <ChatInput
            message={message}
            onMessageChange={setMessage}
            onSendMessage={() => handleSendMessage()}
            onVoiceRecord={handleVoiceRecord}
            onHelpRequest={handleHelpRequest}
            isRecording={isRecording}
            carouselOptions={carouselOptions}
            placeholder={
              action === 'create-goal'
                ? 'Describe your goal...'
                : action === 'generate-tasks'
                ? 'Tell me about your goal...'
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
  } as ViewStyle,

  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    gap: 4
  } as ViewStyle,

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text.primary,
    margin: 2
  } as ViewStyle,

  confirmationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
    gap: 12
  } as ViewStyle,

  confirmButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  } as ViewStyle,

  proceedButton: {
    backgroundColor: colors.button.primary
  } as ViewStyle,

  tryElseButton: {
    backgroundColor: colors.background.container,
    borderWidth: 1,
    borderColor: colors.text.muted
  } as ViewStyle,

  confirmButtonText: {
    color: colors.text.primary,
    fontSize: fonts.sizes.sm,
    fontWeight: '600'
  } as TextStyle
})
