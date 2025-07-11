import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  TextStyle,
  TouchableOpacity
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  SlideInUp,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  interpolate
} from 'react-native-reanimated'
import { MessageSquare, History, Plus } from 'lucide-react-native'

import { Header } from '@/src/components/Header'
import { ChatInput } from '@/src/components/ChatInput'
import { AgentMessage } from '@/src/components/AgentMessage'
import { UserMessage } from '@/src/components/UserMessage'
import { LoadingDots } from '@/src/components/LoadingDots'
import { ChatHistoryModal } from '@/src/components/ChatHistoryModal'
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
  useUserId,
  useChatSessions,
  useCreateNewChat,
  useLoadChatSession
} from '@/src/stores'
import { globalStyles } from '@/src/constants/styles'

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
function extractTagsAndContent (content: {
  summary: string
  tags: string[]
  data?: any
}): {
  text: string
  tags: string[]
  data?: any
} {
  try {
    const obj = typeof content === 'string' ? JSON.parse(content) : content
    return {
      text: obj.summary || obj.content || '',
      tags: Array.isArray(obj.tags) ? obj.tags : [],
      data: obj.data
    }
  } catch (error) {
    return { text: typeof content === 'string' ? content : '', tags: [] }
  }
}

export default function AgentScreen () {
  const scrollViewRef = useRef<ScrollView>(null)
  const messagesLength = useSharedValue(0)

  const sendMessage = useSendMessage()
  const addMessage = useAddMessage()
  const isLoading = useChatLoading()
  const createNewChat = useCreateNewChat()
  const loadChatSession = useLoadChatSession()

  const [message, setMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [showChatHistory, setShowChatHistory] = useState(false)

  const messages = useChatMessages()
  const chatSessions = useChatSessions()
  const fetchUserGoals = useFetchUserGoals()
  const userId = useUserId()

  // Smooth scroll to bottom when new messages arrive
  const scrollToBottom = (animated: boolean = true) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated })
    }, 100)
  }

  // Enhanced auto-scroll when messages change
  useEffect(() => {
    if (messages.length > messagesLength.value) {
      messagesLength.value = withSpring(messages.length, {
        damping: 20,
        stiffness: 100
      })
      scrollToBottom(true)
    }
    messagesLength.value = messages.length
  }, [messages.length])

  useEffect(() => {
    // Add welcome message if chat is empty
    if (messages.length === 0) {
      addMessage({
        id: 'welcome',
        content: {
          summary: 'Welcome! How can I help you today?',
          tags: []
        },
        role: 'agent',
        timestamp: new Date()
      })
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
  }, [messages, userId, addMessage, fetchUserGoals])

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || message
    if (!textToSend.trim() || isLoading) return // Prevent sending while loading

    setMessage('')

    // Smooth scroll before sending
    scrollToBottom(true)

    await sendMessage(textToSend, undefined, userId)

    // Scroll again after message is added
    setTimeout(() => scrollToBottom(true), 200)
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

  const handleNewChat = () => {
    createNewChat()
    setShowChatHistory(false)
  }

  const handleSelectChat = (sessionId: string) => {
    loadChatSession(sessionId)
    setShowChatHistory(false)
  }

  return (
    <Animated.View
      entering={FadeInRight.duration(400).springify()}
      style={styles.container}
    >
      <View
        style={[
          {
            position: 'absolute',
            top: 64,
            right: 32,
            flexDirection: 'row',
            zIndex: 10
          }
        ]}
      >
        <TouchableOpacity
          style={[styles.headerButton, { marginRight: 12 }]}
          onPress={handleNewChat}
          accessibilityLabel='Start new chat'
          accessibilityRole='button'
        >
          <Plus size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setShowChatHistory(true)}
          accessibilityLabel='View chat history'
          accessibilityRole='button'
        >
          <History size={20} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

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
          onContentSizeChange={() => scrollToBottom(true)}
          onLayout={() => scrollToBottom(false)}
        >
          {messages.map((msg, index) => {
            if (msg.role === 'agent') {
              const { text, tags, data } = extractTagsAndContent(msg.content)
              const isLatestAgentMessage =
                index === messages.length - 1 ||
                (index === messages.length - 2 && isLoading)

              return (
                <AgentMessage
                  key={index}
                  id={msg.id}
                  text={text}
                  tags={tags}
                  timestamp={msg.timestamp}
                  isLatest={isLatestAgentMessage}
                  isLoading={isLoading && isLatestAgentMessage} // Pass loading state
                  onSendMessage={handleSendMessage}
                  data={data}
                />
              )
            }

            return (
              <UserMessage
                key={index}
                id={index.toString()}
                text={msg.content.summary}
                timestamp={msg.timestamp}
              />
            )
          })}

          {isLoading && (
            <Animated.View
              entering={FadeInLeft.duration(500).springify()}
              style={[styles.messageWrapper, styles.agentMessageWrapper]}
            >
              <View style={styles.agentAvatar}>
                <LinearGradient
                  colors={
                    colors.gradient.primary as readonly [
                      string,
                      string,
                      ...string[]
                    ]
                  }
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

        {/* Enhanced Input Section */}
        <Animated.View
          entering={SlideInUp.duration(600).springify()}
          style={styles.inputSection}
        >
          <ChatInput
            message={message}
            onMessageChange={setMessage}
            onSendMessage={() => handleSendMessage()}
            onVoiceRecord={handleVoiceRecord}
            onHelpRequest={handleHelpRequest}
            isRecording={isRecording}
            carouselOptions={carouselOptions}
            disabled={isLoading} // Disable input while loading
          />
        </Animated.View>
      </KeyboardAvoidingView>

      {/* Chat History Modal */}
      <ChatHistoryModal
        visible={showChatHistory}
        onClose={() => setShowChatHistory(false)}
        chatSessions={chatSessions}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container
  } as ViewStyle,

  headerActions: {
    flexDirection: 'row',
    gap: 8
  } as ViewStyle,

  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.button.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5
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

  inputSection: {
    backgroundColor: colors.background.primary,
    paddingBottom: 0
  } as ViewStyle
})
