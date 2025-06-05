import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Modal
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInUp, 
  FadeInRight, 
  FadeInLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { Send, Mic, X, Check, Target, Calendar, Brain, Flag } from 'lucide-react-native';

import { Header } from '@/src/components/Header';
import { Card } from '@/src/components/Card';
import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';

// Template type
interface Template {
  id: string;
  title: string;
  icon: React.ReactNode;
  prompt: string;
  context: string;
}

// Message type
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  context?: string;
}

// Templates data
const templates: Template[] = [
  {
    id: 'new-goal',
    title: 'Set New Goal',
    icon: <Target size={24} color={colors.button.primary} />,
    prompt: "I want to set a new goal. Here's what I want to achieve:",
    context: 'goal_setting'
  },
  {
    id: 'daily-plan',
    title: 'Plan My Day',
    icon: <Calendar size={24} color={colors.button.accent} />,
    prompt: "Help me plan my day. Here's what I need to accomplish:",
    context: 'daily_planning'
  },
  {
    id: 'brainstorm',
    title: 'Brainstorm Ideas',
    icon: <Brain size={24} color={colors.status.success} />,
    prompt: "I need help brainstorming ideas for:",
    context: 'brainstorming'
  },
  {
    id: 'progress',
    title: 'Track Progress',
    icon: <Flag size={24} color={colors.status.warning} />,
    prompt: "I want to update my progress on:",
    context: 'progress_tracking'
  }
];

export default function AgentScreen() {
  // Get params from navigation
  const params = useLocalSearchParams();
  const action = params.action as string | undefined;
  
  // Refs
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  
  // State
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [activeContext, setActiveContext] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm your AI accountability agent. How can I help you today?",
      sender: 'agent',
      timestamp: new Date(Date.now() - 5 * 60000),
    },
  ]);
  
  // Animation values
  const micScale = useSharedValue(1);
  const inputHeight = useSharedValue(50);
  
  // Handle template selection
  const handleTemplateSelect = (template: Template) => {
    setMessage(template.prompt);
    setActiveContext(template.context);
    setShowTemplates(false);
    inputRef.current?.focus();
  };
  
  // Handle send message
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
      context: activeContext
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Simulate agent typing
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAgentResponse(message, activeContext),
        sender: 'agent',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, agentResponse]);
      setActiveContext(null);
      
      // Scroll to bottom
      scrollToBottom();
    }, 1000);
    
    // Scroll to bottom
    scrollToBottom();
  };
  
  // Get agent response based on context
  const getAgentResponse = (userMessage: string, context: string | null) => {
    switch (context) {
      case 'goal_setting':
        return `I've noted your goal: "${userMessage.replace('I want to set a new goal. Here\'s what I want to achieve:', '').trim()}". Let's break this down into actionable steps. What's the first milestone you'd like to achieve?`;
      case 'daily_planning':
        return "I'll help you organize these tasks. Would you like me to prioritize them based on urgency or importance?";
      case 'brainstorming':
        return "Those are interesting ideas. Let's explore them further. Which aspect would you like to develop first?";
      case 'progress_tracking':
        return "Thanks for the update. Based on your progress, would you like to adjust your goals or keep the current trajectory?";
      default:
        return getDefaultResponse(userMessage);
    }
  };
  
  // Default response generator
  const getDefaultResponse = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('goal')) {
      return "Setting clear goals is important for accountability. Let's break down your goal into smaller, manageable tasks. What specific outcome are you looking for?";
    } else if (lowerCaseMessage.includes('stuck') || lowerCaseMessage.includes('procrastinating')) {
      return "It sounds like you're experiencing some resistance. This is normal. Let's identify what's blocking you and create a strategy to overcome it. What do you think is the main obstacle?";
    } else if (lowerCaseMessage.includes('progress') || lowerCaseMessage.includes('completed')) {
      return "Great job on your progress! Celebrating small wins is crucial for maintaining motivation. What has been working well for you so far?";
    } else {
      return "I understand. Let's focus on how I can help you stay accountable to your goals. Would you like me to check in with you regularly about this?";
    }
  };
  
  // Handle quick responses
  const handleQuickResponse = (response: 'yes' | 'no') => {
    const text = response === 'yes' ? "Yes, I did it!" : "No, not yet.";
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response === 'yes' 
          ? "Great job! Keep up the good work. What's next on your agenda?"
          : "That's okay. What's stopping you from completing this task? Let's figure out how to overcome those obstacles.",
        sender: 'agent',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, agentResponse]);
      scrollToBottom();
    }, 1000);
    
    scrollToBottom();
  };
  
  // Scroll to bottom helper
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };
  
  // Handle input focus
  const handleInputFocus = () => {
    inputHeight.value = withTiming(80, { duration: 200 });
  };
  
  // Handle input blur
  const handleInputBlur = () => {
    if (!message) {
      inputHeight.value = withTiming(50, { duration: 200 });
    }
  };
  
  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <View style={styles.container}>
      <Header 
        title="AI Agent" 
        rightAction={
          <TouchableOpacity 
            onPress={() => setShowTemplates(true)}
            style={styles.templateButton}
          >
            <Target size={20} color={colors.text.primary} />
          </TouchableOpacity>
        }
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, index) => (
            <Animated.View
              key={msg.id}
              entering={
                msg.sender === 'user'
                  ? FadeInRight.duration(300).delay(100)
                  : FadeInLeft.duration(300).delay(100)
              }
              style={[
                styles.messageWrapper,
                msg.sender === 'user'
                  ? styles.userMessageWrapper
                  : styles.agentMessageWrapper,
              ]}
            >
              {msg.sender === 'agent' && (
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
                  msg.sender === 'user'
                    ? styles.userMessageBubble
                    : styles.agentMessageBubble,
                ]}
              >
                <Text style={styles.messageText}>{msg.text}</Text>
                <Text style={styles.timestamp}>{formatTime(msg.timestamp)}</Text>
              </View>
            </Animated.View>
          ))}
        </ScrollView>
        
        <Animated.View
          entering={FadeInUp.duration(500)}
          style={styles.inputContainer}
        >
          <View style={styles.quickResponseContainer}>
            <TouchableOpacity
              style={styles.quickResponseButton}
              onPress={() => handleQuickResponse('yes')}
            >
              <Check size={16} color={colors.status.success} />
              <Text style={styles.quickResponseText}>Yes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickResponseButton}
              onPress={() => handleQuickResponse('no')}
            >
              <X size={16} color={colors.status.error} />
              <Text style={styles.quickResponseText}>No</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.inputRow}>
            <Animated.View style={[styles.textInputContainer, { height: inputHeight }]}>
              <TextInput
                ref={inputRef}
                style={styles.textInput}
                value={message}
                onChangeText={setMessage}
                placeholder={activeContext ? "Continue with your message..." : "Type your message..."}
                placeholderTextColor={colors.text.muted}
                multiline
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </Animated.View>
            
            {message ? (
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSendMessage}
                disabled={!message.trim()}
              >
                <Send size={20} color={colors.text.primary} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.templateButton}
                onPress={() => setShowTemplates(true)}
              >
                <Target size={20} color={colors.text.primary} />
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
      
      {/* Templates Modal */}
      <Modal
        visible={showTemplates}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTemplates(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            entering={FadeInUp.duration(300)}
            style={styles.modalContent}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose a Template</Text>
              <TouchableOpacity
                onPress={() => setShowTemplates(false)}
                style={styles.closeButton}
              >
                <X size={20} color={colors.text.muted} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.templateGrid}>
              {templates.map((template) => (
                <TouchableOpacity
                  key={template.id}
                  style={styles.templateItem}
                  onPress={() => handleTemplateSelect(template)}
                >
                  <View style={styles.templateIcon}>
                    {template.icon}
                  </View>
                  <Text style={styles.templateTitle}>{template.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  
  keyboardAvoidingView: {
    flex: 1,
  },
  
  messagesContainer: {
    flex: 1,
  },
  
  messagesContent: {
    padding: 16,
    paddingBottom: 16,
  },
  
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  
  userMessageWrapper: {
    alignSelf: 'flex-end',
  },
  
  agentMessageWrapper: {
    alignSelf: 'flex-start',
  },
  
  agentAvatar: {
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  
  avatarGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  avatarText: {
    color: colors.text.primary,
    fontSize: fonts.sizes.xs,
    fontWeight: fonts.weights.bold,
  },
  
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '100%',
  },
  
  userMessageBubble: {
    backgroundColor: colors.button.primary,
    borderBottomRightRadius: 4,
  },
  
  agentMessageBubble: {
    backgroundColor: colors.background.container,
    borderBottomLeftRadius: 4,
  },
  
  messageText: {
    color: colors.text.primary,
    fontSize: fonts.sizes.md,
  },
  
  timestamp: {
    fontSize: fonts.sizes.xs,
    color: colors.text.muted,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  
  inputContainer: {
    padding: 16,
    paddingTop: 8,
    backgroundColor: colors.background.container,
    borderTopWidth: 1,
    borderTopColor: 'rgba(177, 181, 201, 0.2)',
  },
  
  quickResponseContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  
  quickResponseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  
  quickResponseText: {
    color: colors.text.secondary,
    fontSize: fonts.sizes.sm,
    marginLeft: 4,
  },
  
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  
  textInputContainer: {
    flex: 1,
    backgroundColor: colors.background.card,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    marginRight: 8,
    minHeight: 50,
  },
  
  textInput: {
    color: colors.text.primary,
    fontSize: fonts.sizes.md,
    maxHeight: 120,
  },
  
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.button.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  templateButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.button.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  
  modalContent: {
    backgroundColor: colors.background.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '50%',
  },
  
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  modalTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
  },
  
  closeButton: {
    padding: 8,
  },
  
  templateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  templateItem: {
    width: '48%',
    backgroundColor: colors.background.container,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  
  templateIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(61, 74, 211, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  templateTitle: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    textAlign: 'center',
  },
});