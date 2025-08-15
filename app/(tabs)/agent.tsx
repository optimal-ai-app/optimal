import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeInLeft,
  FadeInRight,
  SlideInUp,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { History, Plus } from 'lucide-react-native';
import { styles as agentMessageStyles } from '@/src/components/custom/Message/AgentMessage/AgentMessage.styles';
import { ChatInput } from '@/src/components/custom/ChatInput';
import { AgentMessage } from '@/src/components/custom/Message/AgentMessage';
import { UserMessage } from '@/src/components/custom/Message/UserMessage';
import { LoadingDots } from '@/src/components/default/LoadingDots';
import { ChatHistoryModal } from '@/src/components/custom/ChatHistoryModal';
import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';
import {
  useChatMessages,
  useSendMessage,
  useAddMessage,
  useChatLoading,
  useFetchUserGoals,
  useUserId,
  useChatSessions,
  useCreateNewChat,
  useLoadChatSession,
} from '@/src/stores';
import { globalStyles } from '@/src/constants/styles';

// Carousel options
const carouselOptions = [
  {
    id: '1',
    text: 'Help me set a goal',
  },
  {
    id: '2',
    text: 'Help me create a task for my goal',
  },
];

// Helper to extract tags and content from agent message
function extractTagsAndContent(content: {
  summary: string;
  tags: string[];
  data?: any;
}): {
  text: string;
  tags: string[];
  data?: any;
} {
  try {
    const obj = typeof content === 'string' ? JSON.parse(content) : content;
    return {
      text: obj.summary || obj.content || '',
      tags: Array.isArray(obj.tags) ? obj.tags : [],
      data: obj.data,
    };
  } catch (error) {
    return { text: typeof content === 'string' ? content : '', tags: [] };
  }
}

export default function AgentScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const messagesLength = useSharedValue(0);

  const sendMessage = useSendMessage();
  const addMessage = useAddMessage();
  const isLoading = useChatLoading();
  const createNewChat = useCreateNewChat();
  const loadChatSession = useLoadChatSession();

  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showChatHistory, setShowChatHistory] = useState(false);

  const messages = useChatMessages();
  const chatSessions = useChatSessions();
  const fetchUserGoals = useFetchUserGoals();
  const userId = useUserId();

  // Smooth scroll to bottom when new messages arrive
  const scrollToBottom = (animated: boolean = true) => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated });
    }, 100);
  };

  // Enhanced auto-scroll when messages change
  useEffect(() => {
    if (messages.length > messagesLength.value) {
      messagesLength.value = withSpring(messages.length, {
        damping: 20,
        stiffness: 100,
      });
      scrollToBottom(true);
    }
    messagesLength.value = messages.length;
  }, [messages.length]);

  useEffect(() => {
    // Add welcome message if chat is empty
    if (messages.length === 0) {
      addMessage({
        id: 'welcome',
        content: {
          summary: 'Welcome! How can I help you today?',
          tags: [],
        },
        role: 'agent',
        timestamp: new Date(),
      });
    }

    const shouldShowGoalNames = messages.some((msg) => {
      if (msg.role !== 'agent') return false;
      try {
        return msg.content.tags.includes('SHOW_USER_GOAL_NAMES');
      } catch {
        return false;
      }
    });
    if (shouldShowGoalNames && userId) {
      fetchUserGoals(userId);
    }
  }, [messages, userId, addMessage, fetchUserGoals]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || message;
    if (!textToSend.trim() || isLoading) return; // Prevent sending while loading

    setMessage('');

    // Smooth scroll before sending
    scrollToBottom(true);

    await sendMessage(textToSend, undefined, userId);

    // Scroll again after message is added
    setTimeout(() => scrollToBottom(true), 200);
  };

  const handleHelpRequest = () => {
    console.log('Help requested');
  };

  const handleVoiceRecord = () => {
    if (Platform.OS === 'web') {
      addMessage({
        id: Date.now().toString(),
        content: {
          summary: 'Voice recording is not available on web.',
          tags: [],
        },
        role: 'agent',
        timestamp: new Date(),
      });
      scrollToBottom();
      return;
    }

    setIsRecording(!isRecording);

    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        const transcribedText = 'I finished my workout today and feel great!';
        setMessage(transcribedText);
      }, 2000);
    }
  };

  const handleNewChat = () => {
    createNewChat();
    setShowChatHistory(false);
  };

  const handleSelectChat = (sessionId: string) => {
    loadChatSession(sessionId);
    setShowChatHistory(false);
  };

  return (
    <Animated.View
      entering={FadeInRight.duration(400).springify()}
      style={globalStyles.container}
    >
      <View
        style={[
          {
            position: 'absolute',
            top: 64,
            right: 32,
            flexDirection: 'row',
            zIndex: 10,
          },
        ]}
      >
        <TouchableOpacity
          style={[globalStyles.circleButton, { marginRight: 12 }]}
          onPress={handleNewChat}
          accessibilityLabel="Start new chat"
          accessibilityRole="button"
        >
          <Plus size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.circleButton}
          onPress={() => setShowChatHistory(true)}
          accessibilityLabel="View chat history"
          accessibilityRole="button"
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
            { paddingBottom: 24, marginBottom: 24 },
          ]}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => scrollToBottom(true)}
          onLayout={() => scrollToBottom(false)}
        >
          {messages.map((msg, index) => {
            if (msg.role === 'agent') {
              const { text, tags, data } = extractTagsAndContent(msg.content);
              const isLatestAgentMessage =
                index === messages.length - 1 ||
                (index === messages.length - 2 && isLoading);

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
              );
            }

            return (
              <UserMessage
                key={index}
                id={index.toString()}
                text={msg.content.summary}
                timestamp={msg.timestamp}
              />
            );
          })}

          {isLoading && (
            <Animated.View
              entering={FadeInLeft.duration(500).springify()}
              style={[
                agentMessageStyles.messageWrapper,
                agentMessageStyles.agentMessageWrapper,
              ]}
            >
              <View style={agentMessageStyles.agentAvatar}>
                <LinearGradient
                  colors={
                    colors.gradient.primary as readonly [
                      string,
                      string,
                      ...string[],
                    ]
                  }
                  style={agentMessageStyles.avatarGradient}
                >
                  <Text style={agentMessageStyles.avatarText}>AI</Text>
                </LinearGradient>
              </View>
              <View
                style={[
                  agentMessageStyles.messageBubble,
                  agentMessageStyles.agentMessageBubble,
                ]}
              >
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
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  } as ViewStyle,

  messagesContainer: {
    flex: 1,
    paddingBottom: 24,
    marginBottom: 24,
    paddingTop: 24,
    marginTop: 24,
  } as ViewStyle,

  messagesContent: {
    paddingTop: 24,
    ...globalStyles.content,
  } as ViewStyle,

  inputSection: {
    backgroundColor: colors.background.primary,
    paddingBottom: 0,
  } as ViewStyle,
});
