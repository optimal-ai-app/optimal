import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
  Easing,
  withSpring
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '@/src/constants/colors'
import {
  createGradient,
  springConfigs,
  animationDurations
} from '@/src/constants/animations'

interface PulseAnimationProps {
  size?: number
  color?: string
  intensity?: 'low' | 'medium' | 'high'
  speed?: 'slow' | 'normal' | 'fast'
  children?: React.ReactNode
  style?: any
}

export const PulseAnimation: React.FC<PulseAnimationProps> = ({
  size = 100,
  color = colors.button.primary,
  intensity = 'medium',
  speed = 'normal',
  children,
  style
}) => {
  // Animation values
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)
  const outerScale = useSharedValue(1)
  const outerOpacity = useSharedValue(0.7)
  const rotation = useSharedValue(0)

  // Get animation settings based on intensity
  const getIntensitySettings = () => {
    switch (intensity) {
      case 'low':
        return {
          scaleRange: [1, 1.1],
          opacityRange: [0.8, 1],
          outerScaleRange: [1, 1.2]
        }
      case 'high':
        return {
          scaleRange: [1, 1.3],
          opacityRange: [0.6, 1],
          outerScaleRange: [1, 1.6]
        }
      default:
        return {
          scaleRange: [1, 1.2],
          opacityRange: [0.7, 1],
          outerScaleRange: [1, 1.4]
        }
    }
  }

  // Get duration based on speed
  const getDuration = () => {
    switch (speed) {
      case 'slow':
        return animationDurations.verySlow
      case 'fast':
        return animationDurations.normal
      default:
        return animationDurations.slow
    }
  }

  const intensitySettings = getIntensitySettings()
  const duration = getDuration()

  useEffect(() => {
    // Main pulse animation
    scale.value = withRepeat(
      withSequence(
        withTiming(intensitySettings.scaleRange[1], {
          duration: duration / 2,
          easing: Easing.out(Easing.quad)
        }),
        withTiming(intensitySettings.scaleRange[0], {
          duration: duration / 2,
          easing: Easing.in(Easing.quad)
        })
      ),
      -1,
      false
    )

    // Opacity pulse
    opacity.value = withRepeat(
      withSequence(
        withTiming(intensitySettings.opacityRange[0], {
          duration: duration / 2,
          easing: Easing.out(Easing.quad)
        }),
        withTiming(intensitySettings.opacityRange[1], {
          duration: duration / 2,
          easing: Easing.in(Easing.quad)
        })
      ),
      -1,
      false
    )

    // Outer ring animation
    outerScale.value = withRepeat(
      withSequence(
        withTiming(intensitySettings.outerScaleRange[1], {
          duration: duration,
          easing: Easing.out(Easing.quad)
        }),
        withTiming(intensitySettings.outerScaleRange[0], { duration: 0 })
      ),
      -1,
      false
    )

    outerOpacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: duration / 3 }),
        withTiming(0, { duration: (duration * 2) / 3 })
      ),
      -1,
      false
    )

    // Gentle rotation for extra flair
    rotation.value = withRepeat(
      withTiming(360, {
        duration: duration * 4,
        easing: Easing.linear
      }),
      -1,
      false
    )
  }, [intensity, speed])

  // Animated styles
  const mainAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
    opacity: opacity.value
  }))

  const outerRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: outerScale.value }],
    opacity: outerOpacity.value
  }))

  const gradientColors = createGradient([
    color,
    colors.gradient.primary[1],
    color
  ])

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          justifyContent: 'center',
          alignItems: 'center'
        },
        style
      ]}
    >
      {/* Outer pulse ring */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2,
            borderColor: color
          },
          outerRingStyle
        ]}
      />

      {/* Main pulse element */}
      <Animated.View style={[mainAnimatedStyle]}>
        <LinearGradient
          colors={gradientColors}
          style={{
            width: size * 0.8,
            height: size * 0.8,
            borderRadius: (size * 0.8) / 2,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: color,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8
          }}
        >
          {children}
        </LinearGradient>
      </Animated.View>
    </View>
  )
}
