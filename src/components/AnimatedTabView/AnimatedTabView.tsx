import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
  SlideInLeft,
  SlideOutRight,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS
} from 'react-native-reanimated'
import { animationDurations, springConfigs } from '@/src/constants/animations'

interface AnimatedTabViewProps {
  children: React.ReactNode
  isActive?: boolean
  direction?: 'left' | 'right' | 'none'
  style?: any
}

export const AnimatedTabView: React.FC<AnimatedTabViewProps> = ({
  children,
  isActive = true,
  direction = 'none',
  style
}) => {
  const opacity = useSharedValue(isActive ? 1 : 0)
  const translateX = useSharedValue(0)
  const scale = useSharedValue(isActive ? 1 : 0.95)

  useEffect(() => {
    if (isActive) {
      // Animate in
      opacity.value = withTiming(1, { duration: animationDurations.normal })
      translateX.value = withSpring(0, springConfigs.gentle)
      scale.value = withSpring(1, springConfigs.gentle)
    } else {
      // Animate out
      opacity.value = withTiming(0, { duration: animationDurations.fast })
      scale.value = withTiming(0.95, { duration: animationDurations.fast })
    }
  }, [isActive])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }, { scale: scale.value }]
  }))

  // Choose the appropriate entering/exiting animation based on direction
  const getEnteringAnimation = () => {
    switch (direction) {
      case 'left':
        return SlideInLeft.duration(animationDurations.normal).springify()
      case 'right':
        return SlideInRight.duration(animationDurations.normal).springify()
      default:
        return FadeIn.duration(animationDurations.normal)
    }
  }

  const getExitingAnimation = () => {
    switch (direction) {
      case 'left':
        return SlideOutRight.duration(animationDurations.fast)
      case 'right':
        return SlideOutLeft.duration(animationDurations.fast)
      default:
        return FadeOut.duration(animationDurations.fast)
    }
  }

  if (!isActive) return null

  return (
    <Animated.View
      entering={getEnteringAnimation()}
      exiting={getExitingAnimation()}
      style={[
        {
          flex: 1,
          width: '100%',
          height: '100%'
        },
        animatedStyle,
        style
      ]}
    >
      {children}
    </Animated.View>
  )
}
