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
  Keyboard
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInUp, 
  FadeInRight, 
  FadeInLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { Send, Mic, X, Check, Link as LinkIcon } from 'lucide-react-native';

import { Header } from '@/src/components/Header';
import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';

// Message type
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

export default function AgentScreen() {
  // Refs
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  
  // State
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi there! I\'m your AI accountability agent. How can I help you today?',
      sender: 'agent',
      timestamp: new Date(Date.now() - 5 * 60000),
    },
  ]);
  
  // Animation values
  const micScale = useSharedValue(1);
  const inputHeight = useSharedValue(50);
  
  // Handle send message
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Simulate agent typing
    setTimeout(() => {
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAgentResponse(message),
        sender: 'agent',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, agentResponse]);
      
      // Scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1000);
    
    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
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
    
    // Simulate agent typing
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
      
      // Scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1000);
    
    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };
  
  // Toggle voice recording
  const toggleRecording = () => {
    if (Platform.OS === 'web') {
      // Web doesn't support voice recording, show message
      const newMessage: Message = {
        id: Date.now().toString(),
        text: "Voice recording is not available on web.",
        sender: 'agent',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      // Scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
      
      return;
    }
    
    setIsRecording(!isRecording);
    micScale.value = withTiming(isRecording ? 1 : 1.2, { duration: 300 });
    
    if (!isRecording) {
      // Starting recording
      // In a real app, start the recording here
    } else {
      // Stopping recording
      // In a real app, stop recording and process the audio
      
      // Simulate a transcribed message
      setTimeout(() => {
        const transcribedText = "I finished my workout today.";
        
        const newMessage: Message = {
          id: Date.now().toString(),
          text: transcribedText,
          sender: 'user',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, newMessage]);
        
        // Simulate agent response
        setTimeout(() => {
          const agentResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: "That's awesome! How did your workout go? Did you meet your fitness goals for today?",
            sender: 'agent',
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, agentResponse]);
          
          // Scroll to bottom
          setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }, 100);
        }, 1000);
        
        // Scroll to bottom
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }, 1000);
    }
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
  
  // Simple agent response generator
  const getAgentResponse = (userMessage: string) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('goal')) {
      return "Setting clear goals is important for accountability. Let's break down your goal into smaller, manageable tasks. What specific outcome are you looking for?";
    } else if (lowerCaseMessage.includes('stuck') || lowerCaseMessage.includes('procrastinating')) {
      return "It sounds like you're experiencing some resistance. This is normal. Let's identify what's blocking you and create a strategy to overcome it. What do you think is the main obstacle?";
    } else if (lowerCaseMessage.includes('progress') || lowerCaseMessage.includes('completed')) {
      return "Great job on your progress! Celebrating small wins is crucial for maintaining motivation. What has been working well for you so far?";
    } else if (lowerCaseMessage.includes('tired') || lowerCaseMessage.includes('motivation')) {
      return "It's important to balance productivity with rest. Are you getting enough sleep and taking breaks? Sometimes a short reset can significantly improve your motivation and energy.";
    } else {
      return "I understand. Let's focus on how I can help you stay accountable to your goals. Would you like me to check in with you regularly about this?";
    }
  };
  
  // Animated styles
  const micAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: micScale.value }],
    };
  });
  
  const inputAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: inputHeight.value,
    };
  });
  
  return (
    <View style={styles.container}>
      <Header title="AI Agent" />
      
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
          {/* Quick response buttons */}
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
            <Animated.View style={[styles.textInputContainer, inputAnimatedStyle]}>
              <TextInput
                ref={inputRef}
                style={styles.textInput}
                value={message}
                onChangeText={setMessage}
                placeholder="Type your message..."
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
                style={[
                  styles.micButton,
                  isRecording && styles.micButtonRecording,
                ]}
                onPress={toggleRecording}
              >
                <Animated.View style={micAnimatedStyle}>
                  <Mic size={20} color={colors.text.primary} />
                </Animated.View>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
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
  
  micButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.button.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  micButtonRecording: {
    backgroundColor: colors.status.error,
  },
});