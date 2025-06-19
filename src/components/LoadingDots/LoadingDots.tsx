import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  interpolate,
  Easing,
  withSpring
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '@/src/constants/colors'
import { styles } from './LoadingDots.styles'

interface LoadingDotsProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({
  size = 'medium',
  color
}) => {
  // Animation values for each dot
  const dot1 = useSharedValue(0)
  const dot2 = useSharedValue(0)
  const dot3 = useSharedValue(0)

  // Scale animations for pulsing effect
  const scale1 = useSharedValue(1)
  const scale2 = useSharedValue(1)
  const scale3 = useSharedValue(1)

  // Rotation for extra flashy effect
  const rotation = useSharedValue(0)

  // Opacity for breathing effect
  const opacity = useSharedValue(0.5)

  useEffect(() => {
    // Staggered bounce animation
    const animateDot = (dotValue: any, delay: number) => {
      dotValue.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(-8, { duration: 400, easing: Easing.out(Easing.quad) }),
            withTiming(0, { duration: 400, easing: Easing.in(Easing.quad) })
          ),
          -1,
          false
        )
      )
    }

    // Scale pulsing animation
    const animateScale = (scaleValue: any, delay: number) => {
      scaleValue.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withSpring(1.3, { damping: 8, stiffness: 200 }),
            withSpring(1, { damping: 8, stiffness: 200 })
          ),
          -1,
          false
        )
      )
    }

    // Start animations with stagger
    animateDot(dot1, 0)
    animateDot(dot2, 200)
    animateDot(dot3, 400)

    animateScale(scale1, 100)
    animateScale(scale2, 300)
    animateScale(scale3, 500)

    // Rotation animation
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    )

    // Breathing opacity
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    )
  }, [])

  // Get dot size based on prop
  const getDotSize = () => {
    switch (size) {
      case 'small':
        return 6
      case 'large':
        return 12
      default:
        return 8
    }
  }

  const dotSize = getDotSize()

  // Animated styles for each dot
  const dot1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot1.value }, { scale: scale1.value }],
    opacity: opacity.value
  }))

  const dot2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot2.value }, { scale: scale2.value }],
    opacity: opacity.value
  }))

  const dot3Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot3.value }, { scale: scale3.value }],
    opacity: opacity.value
  }))

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }]
  }))

  const dotColor = color || colors.button.primary

  return (
    <Animated.View style={[styles.loadingContainer, containerStyle]}>
      <Animated.View
        style={[
          styles.dot,
          {
            width: dotSize,
            height: dotSize,
            marginHorizontal: dotSize * 0.5
          },
          dot1Style
        ]}
      >
        <LinearGradient
          colors={[dotColor, colors.gradient.primary[1]]}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: dotSize / 2
          }}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.dot,
          {
            width: dotSize,
            height: dotSize,
            marginHorizontal: dotSize * 0.5
          },
          dot2Style
        ]}
      >
        <LinearGradient
          colors={[colors.gradient.secondary[0], dotColor]}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: dotSize / 2
          }}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.dot,
          {
            width: dotSize,
            height: dotSize,
            marginHorizontal: dotSize * 0.5
          },
          dot3Style
        ]}
      >
        <LinearGradient
          colors={[colors.gradient.accent[0], colors.gradient.accent[1]]}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: dotSize / 2
          }}
        />
      </Animated.View>
    </Animated.View>
  )
}
