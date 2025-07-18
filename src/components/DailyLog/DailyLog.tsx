import React, { useState } from 'react'
import {
  View,
  Text,
  Pressable,
  Dimensions,
  StyleSheet,
  TextInput,
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
import { BlurView } from 'expo-blur'

const { width: screenWidth } = Dimensions.get('window')

export const DailyLog: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')

  const scale = useSharedValue(1)
  const pulse = useSharedValue(1)
  const rotation = useSharedValue(0)

  const toggle = () => {
    scale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withSpring(1, { damping: 12, stiffness: 200 })
    )
    if (isRecording) stop()
    else start()
  }

  const start = () => {
    setIsRecording(true)
    pulse.value = withRepeat(
      withTiming(1.3, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    )
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    )
  }

  const stop = () => {
    setIsRecording(false)
    pulse.value = withSpring(1, { damping: 12, stiffness: 200 })
    rotation.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.ease)
    })
  }

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: interpolate(pulse.value, [1, 1.3], [0.4, 0])
  }))

  const iconRotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }]
  }))

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={50} style={styles.background} />
      <LinearGradient colors={['#2d7d67', '#4a9b8a']} style={styles.container}>
        <View style={styles.buttonContainer}>
          {isRecording && (
            <>
              <Animated.View style={[styles.pulseRing, pulseStyle]} />
              <Animated.View style={[styles.pulseRingMedium, pulseStyle]} />
              <Animated.View style={[styles.pulseRingSmall, pulseStyle]} />
            </>
          )}
          <Animated.View style={[styles.buttonWrapper, buttonStyle]}>
            <Pressable onPress={toggle} style={styles.buttonPress}>
              <LinearGradient
                colors={
                  isRecording ? ['#ffffff', '#ffffff'] : ['#fff', '#f8f0ff']
                }
                style={[
                  styles.buttonBg,
                  isRecording && {
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.5,
                    shadowRadius: 10,
                    elevation: 8
                  }
                ]}
              >
                {isRecording ? (
                  <Animated.View style={iconRotationStyle}>
                    <MicOff size={40} color='#2d7d67' strokeWidth={2} />
                  </Animated.View>
                ) : (
                  <Mic size={40} color='#4a9b8a' strokeWidth={2} />
                )}
              </LinearGradient>
            </Pressable>
          </Animated.View>
        </View>
        <Text style={[styles.subtitle, { alignSelf: 'flex-start' }]}>
          {isRecording ? 'Recording…' : 'Tap to record your thoughts'}
        </Text>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  background: {
    ...StyleSheet.absoluteFillObject
  },
  container: {
    width: screenWidth * 0.9,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700'
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 8
  },
  buttonContainer: {
    marginVertical: 32,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pulseRing: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)'
  },
  pulseRingMedium: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)'
  },
  pulseRingSmall: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)'
  },
  buttonWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden'
  },
  buttonPress: {
    flex: 1
  },
  buttonBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  transcript: {
    width: '100%',
    minHeight: 80,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    marginTop: 8,
    ...Platform.select({
      android: { textAlignVertical: 'top' }
    })
  }
})
