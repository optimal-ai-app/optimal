import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  PanResponder,
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
  runOnJS,
  Easing
} from 'react-native-reanimated'
import { Mic, MicOff, Lock, Unlock } from 'lucide-react-native'
import { styles } from './DailyLog.styles'
import { colors } from '@/src/constants/colors'

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
  const [isLocked, setIsLocked] = useState(false)
  const [transcript, setTranscript] = useState('')

  // Animation values
  const buttonScale = useSharedValue(1)
  const pulseScale = useSharedValue(1)
  const rippleScale = useSharedValue(0)
  const rippleOpacity = useSharedValue(0)
  const slideOffset = useSharedValue(0)
  const lockOpacity = useSharedValue(0)
  const micRotation = useSharedValue(0)
  const gradientOpacity = useSharedValue(0.8)

  // Recording state management
  const startRecording = () => {
    if (Platform.OS === 'web') {
      // Web fallback - show mock transcript
      setTranscript('Voice recording is not available on web. This is a demo transcript.')
      onVoiceInput?.('Voice recording is not available on web. This is a demo transcript.')
      return
    }

    setIsRecording(true)
    onRecordingStart?.()

    // Start pulse animation
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 800, easing: Easing.inOut(Easing.quad) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      false
    )

    // Rotate microphone
    micRotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    )

    // Enhance gradient
    gradientOpacity.value = withTiming(1, { duration: 300 })
  }

  const stopRecording = () => {
    setIsRecording(false)
    setIsLocked(false)
    onRecordingEnd?.()

    // Stop animations
    pulseScale.value = withSpring(1, { damping: 15, stiffness: 300 })
    micRotation.value = withTiming(0, { duration: 300 })
    lockOpacity.value = withTiming(0, { duration: 200 })
    slideOffset.value = withSpring(0, { damping: 20, stiffness: 300 })
    gradientOpacity.value = withTiming(0.8, { duration: 300 })

    // Mock transcript for demo
    setTimeout(() => {
      const mockTranscript = 'I completed my morning workout and feel energized for the day ahead!'
      setTranscript(mockTranscript)
      onVoiceInput?.(mockTranscript)
    }, 500)
  }

  const lockRecording = () => {
    setIsLocked(true)
    lockOpacity.value = withSpring(1, { damping: 12, stiffness: 200 })
    slideOffset.value = withSpring(-60, { damping: 15, stiffness: 300 })
  }

  // Pan responder for slide-to-lock gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        if (!isRecording) {
          // Trigger ripple effect
          rippleScale.value = 0
          rippleOpacity.value = 0.3
          rippleScale.value = withTiming(2, { duration: 600 })
          rippleOpacity.value = withTiming(0, { duration: 600 })

          // Scale button
          buttonScale.value = withSpring(0.95, { damping: 15, stiffness: 300 })
          
          runOnJS(startRecording)()
        }
      },

      onPanResponderMove: (_, gestureState) => {
        if (isRecording && !isLocked) {
          const slideDistance = Math.max(-80, Math.min(0, gestureState.dx))
          slideOffset.value = slideDistance

          // Show lock hint when sliding left
          if (slideDistance < -40) {
            lockOpacity.value = withTiming(0.7, { duration: 100 })
          } else {
            lockOpacity.value = withTiming(0, { duration: 100 })
          }

          // Lock when slid far enough
          if (slideDistance < -60 && !isLocked) {
            runOnJS(lockRecording)()
          }
        }
      },

      onPanResponderRelease: () => {
        buttonScale.value = withSpring(1, { damping: 15, stiffness: 300 })

        if (isRecording && !isLocked) {
          runOnJS(stopRecording)()
        }
      }
    })
  ).current

  // Animated styles
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: buttonScale.value },
      { translateX: slideOffset.value }
    ]
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

  const lockAnimatedStyle = useAnimatedStyle(() => ({
    opacity: lockOpacity.value,
    transform: [
      { scale: interpolate(lockOpacity.value, [0, 1], [0.8, 1]) }
    ]
  }))

  const gradientAnimatedStyle = useAnimatedStyle(() => ({
    opacity: gradientOpacity.value
  }))

  return (
    <Animated.View 
      entering={FadeInDown.duration(600).delay(400)}
      style={styles.container}
    >
      <View style={styles.card}>
        <Animated.View style={[styles.gradientBackground, gradientAnimatedStyle]}>
          <LinearGradient
            colors={[
              colors.gradient.primary[0],
              colors.gradient.primary[1],
              colors.gradient.secondary[1]
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          />
        </Animated.View>

        <View style={styles.header}>
          <Text style={styles.title}>Daily Log</Text>
          <Text style={styles.subtitle}>
            {isRecording 
              ? (isLocked ? 'Recording locked - tap to stop' : 'Hold and slide left to lock')
              : 'Press and hold to record your thoughts'
            }
          </Text>
        </View>

        <View style={styles.recordingArea}>
          {/* Pulse rings */}
          {isRecording && (
            <>
              <Animated.View style={[styles.pulseRing, styles.pulseRing1, pulseAnimatedStyle]} />
              <Animated.View style={[styles.pulseRing, styles.pulseRing2, pulseAnimatedStyle]} />
            </>
          )}

          {/* Ripple effect */}
          <Animated.View style={[styles.ripple, rippleAnimatedStyle]} />

          {/* Lock indicator */}
          <Animated.View style={[styles.lockIndicator, lockAnimatedStyle]}>
            <Lock size={20} color={colors.text.primary} />
            <Text style={styles.lockText}>Locked</Text>
          </Animated.View>

          {/* Main microphone button */}
          <Animated.View
            style={[styles.micButton, buttonAnimatedStyle]}
            {...panResponder.panHandlers}
          >
            <TouchableOpacity
              style={styles.micButtonInner}
              onPress={isLocked ? stopRecording : undefined}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={
                  isRecording
                    ? [colors.status.error, '#FF6B6B']
                    : [colors.button.primary, colors.button.accent]
                }
                style={styles.micButtonGradient}
              >
                <Animated.View style={micAnimatedStyle}>
                  {isRecording ? (
                    <MicOff size={32} color={colors.text.primary} strokeWidth={2.5} />
                  ) : (
                    <Mic size={32} color={colors.text.primary} strokeWidth={2.5} />
                  )}
                </Animated.View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Transcript display */}
        {transcript && (
          <Animated.View 
            entering={FadeInUp.duration(500).delay(200)}
            style={styles.transcriptContainer}
          >
            <Text style={styles.transcriptLabel}>Your Log Entry:</Text>
            <Text style={styles.transcriptText}>{transcript}</Text>
          </Animated.View>
        )}

        {/* Instructions */}
        <View style={styles.instructions}>
          <View style={styles.instructionItem}>
            <View style={styles.instructionDot} />
            <Text style={styles.instructionText}>Press and hold to start recording</Text>
          </View>
          <View style={styles.instructionItem}>
            <View style={styles.instructionDot} />
            <Text style={styles.instructionText}>Slide left while holding to lock</Text>
          </View>
          <View style={styles.instructionItem}>
            <View style={styles.instructionDot} />
            <Text style={styles.instructionText}>Tap locked button to stop</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  )
}