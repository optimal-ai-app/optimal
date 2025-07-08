import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  interpolate,
  Easing
} from 'react-native-reanimated'
import { Mic, MicOff } from 'lucide-react-native'
import { styles } from './DailyLog.styles'
import { colors } from '@/src/constants/colors'
import { FadeInDown, FadeInUp } from 'react-native-reanimated'

const { width: screenWidth } = Dimensions.get('window')

interface DailyLogProps {
  onVoiceInput?: (transcript: string) => void
  onRecordingStart?: () => void
  onRecordingEnd?: () => void
}

export const DailyLog: React.FC<DailyLogProps> = ({
  onVoiceInput,
  onRecordingStart,
  onRecordingEnd
}) => {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')

  // Animation values
  const buttonScale = useSharedValue(1)
  const pulseScale = useSharedValue(1)
  const rippleScale = useSharedValue(0)
  const rippleOpacity = useSharedValue(0)
  const micRotation = useSharedValue(0)
  const gradientOpacity = useSharedValue(0.8)

  // Toggle recording function
  const toggleRecording = () => {
    // Add button press animation
    buttonScale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withSpring(1, { damping: 15, stiffness: 300 })
    )

    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  // Recording state management
  const startRecording = () => {
    setIsRecording(true)
    onRecordingStart?.()

    // Trigger ripple effect
    rippleScale.value = 0
    rippleOpacity.value = 0.3
    rippleScale.value = withTiming(2, { duration: 600 })
    rippleOpacity.value = withTiming(0, { duration: 600 })

    // Simple, smooth pulse animation
    pulseScale.value = withRepeat(
      withTiming(1.2, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease)
      }),
      -1,
      true
    )

    // Smooth microphone rotation
    micRotation.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear
      }),
      -1,
      false
    )

    // Enhanced gradient
    gradientOpacity.value = withTiming(1, { duration: 300 })
  }

  const stopRecording = () => {
    setIsRecording(false)
    onRecordingEnd?.()

    // Stop all animations smoothly
    pulseScale.value = withSpring(1, { damping: 15, stiffness: 300 })
    micRotation.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.back(1.5))
    })
    gradientOpacity.value = withTiming(0.8, { duration: 300 })

    // Mock transcript for demo
    setTimeout(() => {
      const mockTranscript =
        'I completed my morning workout and feel energized for the day ahead!'
      setTranscript(mockTranscript)
      onVoiceInput?.(mockTranscript)
    }, 500)
  }

  // Animated styles
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }]
  }))

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: interpolate(pulseScale.value, [1, 1.2], [0.3, 0.1])
  }))

  const rippleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: rippleScale.value }],
    opacity: rippleOpacity.value
  }))

  const micAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${micRotation.value}deg` }]
  }))

  const gradientAnimatedStyle = useAnimatedStyle(() => ({
    opacity: gradientOpacity.value
  }))

  return (
    <Animated.View
      entering={FadeInDown.duration(600).delay(400)}
      style={styles.container}
    >
      <LinearGradient
        colors={[
          'rgba(255, 255, 255, .8)',
          'rgba(161, 161, 161, 1)',
          'rgba(255, 255, 255, .7)'
        ]}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
        style={[
          styles.gradient,
          {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(15px)'
          }
        ]}
      >
        <View style={styles.card}>
          <Animated.View
            style={[styles.gradientBackground, gradientAnimatedStyle]}
          >
            <LinearGradient
              colors={[
                'rgba(255, 255, 255, 0.1)',
                'rgba(255, 255, 255, 0.05)',
                'rgba(255, 255, 255, 0.02)'
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            />
          </Animated.View>

          <View style={styles.header}>
            <Text style={styles.subtitle}>
              {isRecording ? 'Recording' : 'Press to record your thoughts'}
            </Text>
          </View>

          <View style={styles.recordingArea}>
            {/* Simple pulse rings */}
            {isRecording && (
              <>
                <Animated.View
                  style={[
                    styles.pulseRing,
                    styles.pulseRing1,
                    pulseAnimatedStyle
                  ]}
                />
                <Animated.View
                  style={[
                    styles.pulseRing,
                    styles.pulseRing2,
                    pulseAnimatedStyle
                  ]}
                />
                <Animated.View
                  style={[
                    styles.pulseRing,
                    styles.pulseRing3,
                    pulseAnimatedStyle
                  ]}
                />
              </>
            )}
            {/* Ripple effect */}
            <Animated.View style={[styles.ripple, rippleAnimatedStyle]} />
            {/* Main microphone button */}
            <Animated.View style={[styles.micButton, buttonAnimatedStyle]}>
              <TouchableOpacity
                style={styles.micButtonInner}
                onPress={toggleRecording}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={
                    isRecording
                      ? ['#c', '#F0B67F']
                      : [colors.background.primary, colors.background.primary]
                  }
                  style={styles.micButtonGradient}
                >
                  <Animated.View style={micAnimatedStyle}>
                    {isRecording ? (
                      <MicOff
                        size={50}
                        color={colors.text.primary}
                        strokeWidth={1.5}
                      />
                    ) : (
                      <Mic
                        size={50}
                        color={colors.text.primary}
                        strokeWidth={1.5}
                      />
                    )}
                  </Animated.View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Instructions */}
          <View style={styles.instructions}>
            <View style={styles.instructionItem}>
              <Text style={styles.instructionText}>
                Tap to start/stop recording
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  )
}
