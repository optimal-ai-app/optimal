import React, { useEffect } from 'react'
import { View, ViewProps } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../../../constants/colors'

interface ShimmerEffectProps extends ViewProps {
  width?: number
  height?: number
  borderRadius?: number
  duration?: number
}

export const ShimmerEffect: React.FC<ShimmerEffectProps> = ({
  width = 200,
  height = 20,
  borderRadius = 4,
  duration = 1500,
  style,
  ...rest
}) => {
  const translateX = useSharedValue(-width)

  useEffect(() => {
    translateX.value = withRepeat(withTiming(width, { duration }), -1, false)
  }, [width, duration])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }]
    }
  })

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: colors.background.container,
          overflow: 'hidden'
        },
        style
      ]}
      {...rest}
    >
      <Animated.View style={[{ width, height }, animatedStyle]}>
        <LinearGradient
          colors={[
            'transparent',
            'rgba(255, 255, 255, 0.1)',
            'rgba(255, 255, 255, 0.2)',
            'rgba(255, 255, 255, 0.1)',
            'transparent'
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width, height }}
        />
      </Animated.View>
    </View>
  )
}
