import React from 'react'
import { View, ViewProps } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate
} from 'react-native-reanimated'
import { colors } from '../../constants/colors'

interface GlassCardProps extends ViewProps {
  children: React.ReactNode
  intensity?: number
  tintColor?: string
  borderRadius?: number
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  intensity = 0.8,
  tintColor = colors.background.card,
  borderRadius = 16,
  style,
  ...rest
}) => {
  const opacity = useSharedValue(0)

  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 })
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {
          translateY: interpolate(opacity.value, [0, 1], [20, 0])
        }
      ]
    }
  })

  return (
    <Animated.View
      style={[
        {
          // backgroundColor: `${tintColor}${Math.round(intensity * 255)
          //   .toString(16)
          //   .padStart(2, '0')}`,
          // borderRadius,
          // borderWidth: 1,
          // borderColor: 'rgba(255, 255, 255, 0.1)',
          // shadowColor: colors.utility.shadow,
          // shadowOffset: {
          //   width: 0,
          //   height: 8
          // },
          // shadowOpacity: 0.15,
          // shadowRadius: 24,
          // elevation: 12,
          // overflow: 'hidden'
        },
        animatedStyle,
        style
      ]}
      {...rest}
    >
      {children}
    </Animated.View>
  )
}
