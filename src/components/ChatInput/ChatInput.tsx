import React, { useState, useRef } from 'react'
import { View, TextInput, TouchableOpacity, Platform } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring
} from 'react-native-reanimated'
import {
  Send,
  Mic,
  ChevronUp,
  ChevronDown,
  CircleHelp as HelpCircle
} from 'lucide-react-native'

import { InputCarousel } from '../InputCarousel'
import { styles } from './ChatInput.styles'
import { colors } from '../../constants/colors'

interface CarouselOption {
  id: string
  text: string
  action?: () => void
}

interface ChatInputProps {
  message: string
  onMessageChange: (text: string) => void
  onSendMessage: () => void
  onVoiceRecord?: () => void
  onHelpRequest?: () => void
  isRecording?: boolean
  carouselOptions?: CarouselOption[]
  placeholder?: string
}

export const ChatInput: React.FC<ChatInputProps> = ({
  message,
  onMessageChange,
  onSendMessage,
  onVoiceRecord,
  onHelpRequest,
  isRecording = false,
  carouselOptions = [],
  placeholder = 'Type your message...'
}) => {
  const [showCarousel, setShowCarousel] = useState(true)
  const inputRef = useRef<TextInput>(null)

  // Animation values
  const carouselHeight = useSharedValue(showCarousel ? 68 : 0)
  const carouselOpacity = useSharedValue(showCarousel ? 1 : 0)
  const micScale = useSharedValue(1)
  const helpScale = useSharedValue(1)
  const helpButtonBottom = useSharedValue(showCarousel ? 160 : 95) // Updated to use new spacing

  // Toggle carousel visibility
  const toggleCarousel = () => {
    const newShowCarousel = !showCarousel
    setShowCarousel(newShowCarousel)

    carouselHeight.value = withTiming(newShowCarousel ? 68 : 0, {
      duration: 300
    })
    carouselOpacity.value = withTiming(newShowCarousel ? 1 : 0, {
      duration: 300
    })
    helpButtonBottom.value = withTiming(newShowCarousel ? 160 : 95, {
      duration: 300
    }) // Updated spacing
  }

  // Handle help button press
  const handleHelpPress = () => {
    // Add subtle animation
    helpScale.value = withSpring(0.9, { duration: 150 }, () => {
      helpScale.value = withSpring(1, { duration: 150 })
    })

    // Trigger help request callback
    onHelpRequest?.()
  }

  // Handle voice recording
  const handleVoiceRecord = () => {
    if (Platform.OS === 'web') {
      // Web fallback - could implement Web Speech API here
      return
    }

    micScale.value = withSpring(isRecording ? 1 : 1.2, { duration: 300 })
    onVoiceRecord?.()
  }

  // Handle carousel option selection
  const handleCarouselOption = (option: CarouselOption) => {
    onMessageChange(option.text)
    inputRef.current?.focus()
  }

  // Handle send message
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage()
    }
  }

  // Animated styles
  const carouselAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: carouselHeight.value,
      opacity: carouselOpacity.value
    }
  })

  const micAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: micScale.value }]
    }
  })

  const helpAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: helpScale.value }]
    }
  })

  const helpButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      bottom: helpButtonBottom.value
    }
  })

  const canSend = message.trim().length > 0

  return (
    <View style={styles.container}>
      {/* Floating Carousel */}
      {carouselOptions.length > 0 && (
        <Animated.View
          style={[styles.carouselContainer, carouselAnimatedStyle]}
        >
          <InputCarousel
            options={carouselOptions}
            onOptionSelect={handleCarouselOption}
          />
        </Animated.View>
      )}

      {/* Floating Help Button */}
      <Animated.View
        style={[styles.helpButtonContainer, helpButtonAnimatedStyle]}
      >
        <TouchableOpacity style={styles.helpButton} onPress={handleHelpPress}>
          <Animated.View style={helpAnimatedStyle}>
            <HelpCircle size={22} color='#FFFFFF' />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>

      {/* Input Row */}
      <View style={styles.inputContainer}>
        {/* Toggle Carousel Button */}
        {carouselOptions.length > 0 && (
          <TouchableOpacity
            style={[
              styles.toggleButton,
              showCarousel && styles.toggleButtonActive
            ]}
            onPress={toggleCarousel}
          >
            {showCarousel ? (
              <ChevronDown size={20} color={colors.text.primary} />
            ) : (
              <ChevronUp size={20} color={colors.text.muted} />
            )}
          </TouchableOpacity>
        )}

        {/* Text Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            ref={inputRef}
            style={styles.textInput}
            value={message}
            onChangeText={onMessageChange}
            placeholder={placeholder}
            placeholderTextColor={colors.text.muted}
            multiline
            maxLength={1000}
            returnKeyType='done'
            blurOnSubmit={true}
            onSubmitEditing={handleSend}
          />
        </View>

        {/* Send/Mic Button */}
        {canSend ? (
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Send size={18} color={colors.text.primary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.sendButton,
              styles.micButton,
              isRecording && styles.micButtonRecording
            ]}
            onPress={handleVoiceRecord}
          >
            <Animated.View style={micAnimatedStyle}>
              <Mic size={18} color={colors.text.primary} />
            </Animated.View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
