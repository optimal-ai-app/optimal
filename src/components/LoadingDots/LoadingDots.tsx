import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing
} from 'react-native-reanimated'
import { styles } from './LoadingDots.styles'

export const LoadingDots: React.FC = () => {
  const dots = [useSharedValue(0.3), useSharedValue(0.3), useSharedValue(0.3)]

  useEffect(() => {
    dots.forEach((dot, index) => {
      const delay = index * 200

      setTimeout(() => {
        dot.value = withRepeat(
          withSequence(
            withTiming(1, {
              duration: 600,
              easing: Easing.out(Easing.cubic)
            }),
            withTiming(0.2, {
              duration: 600,
              easing: Easing.in(Easing.cubic)
            })
          ),
          -1,
          false
        )
      }, delay)
    })
  }, [])

  const dotStyles = dots.map(dot =>
    useAnimatedStyle(() => ({
      opacity: dot.value,
      transform: [
        {
          scale: 0.7 + dot.value * 0.3
        }
      ]
    }))
  )

  return (
    <View style={styles.loadingContainer}>
      {dotStyles.map((style, index) => (
        <Animated.View key={index} style={[styles.dot, style]} />
      ))}
    </View>
  )
}