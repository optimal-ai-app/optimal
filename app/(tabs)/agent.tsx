import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  TextStyle
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeInUp, FadeInLeft } from 'react-native-reanimated'

import { Header } from '@/src/components/Header'
import { ChatInput } from '@/src/components/ChatInput'
import { AgentMessage } from '@/src/components/AgentMessage'
import { UserMessage } from '@/src/components/UserMessage'
import { LoadingDots } from '@/src/components/LoadingDots'
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

// Helper to extract tags and content from agent message
function extractTagsAndContent(content: { summary: string; tags: string[] }): {
  text: string
  tags: string[]
} {
  try {
    const obj = typeof content === 'string' ? JSON.parse(content) : content
    return {
      text: obj.summary || '',
      tags: Array.isArray(obj.tags) ? obj.tags : []
    }
  } catch {
    return { text: typeof content === 'string' ? content : '', tags: [] }
  }
}

export default function AgentScreen() {
  const params = useLocalSearchParams()
  const action = params.action as string | undefined
  const prompt = params.prompt as string | undefined

  const scrollViewRef = useRef<ScrollView>(null)

  const sendMessage = useSendMessage()
  const addMessage = useAddMessage()
  const isLoading = useChatLoading()

  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [promptSent, setPromptSent] = useState(false)

  const messages = useChatMessages()
  const fetchUserGoals = useFetchUserGoals()
  const userId = useUserId()

  useEffect(() => {
    if (messages.length === 0) {
      let welcomeMessage = 'Welcome!'

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

    if (prompt && !promptSent && messages.length <= 1) {
      setMessage(prompt)
      setPromptSent(true)
      setTimeout(() => {
        handleSendMessage(prompt)
      }, 500)
    }

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

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || message
    if (!textToSend.trim()) return

    setMessage('')

    let context: ChatMessage['context'] | undefined
    if (action === 'create-goal') {
      context = { type: 'goal_setting' }
    } else if (action === 'generate-tasks') {
      context = { type: 'goal_response' }
    }

    await sendMessage(textToSend, context, userId)
    scrollToBottom()
  }

  const handleHelpRequest = () => {
    console.log('Help requested')
  }

  const handleVoiceRecord = () => {
    if (Platform.OS === 'web') {
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
      setTimeout(() => {
        setIsRecording(false)
        const transcribedText = 'I finished my workout today and feel great!'
        setMessage(transcribedText)
      }, 2000)
    }
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true })
    }, 100)
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
              const isLatestAgentMessage =
                index === messages.length - 1 ||
                (index === messages.length - 2 && isLoading)

              return (
                <AgentMessage
                  key={msg.id}
                  id={msg.id}
                  text={text}
                  tags={tags}
                  timestamp={msg.timestamp}
                  isLatest={isLatestAgentMessage}
                  onSendMessage={handleSendMessage}
                />
              )
            }
            
            return (
              <UserMessage
                key={msg.id}
                id={msg.id}
                text={msg.content.summary}
                timestamp={msg.timestamp}
              />
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

  agentMessageBubble: {
    backgroundColor: colors.background.container,
    borderBottomLeftRadius: 4
  } as ViewStyle,

  inputContainer: {
    backgroundColor: colors.background.primary,
    paddingBottom: 0
  } as ViewStyle
})