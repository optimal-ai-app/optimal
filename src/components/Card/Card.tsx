import React from 'react'
import { TouchableOpacity, ViewStyle, StyleProp } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { styles } from './Card.styles'

interface CardProps {
  children: React.ReactNode
  onPress?: () => void
  animateOnMount?: boolean
  style?: StyleProp<ViewStyle>
  testID?: string
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  animateOnMount = false,
  onPress,
  testID
}) => {
  // Animation values
  const opacity = useSharedValue(animateOnMount ? 0 : 1)
  const translateY = useSharedValue(animateOnMount ? 20 : 0)

  React.useEffect(() => {
    if (animateOnMount) {
      opacity.value = withTiming(1, { duration: 500 })
      translateY.value = withTiming(0, { duration: 600 })
    }
  }, [animateOnMount, opacity, translateY])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }]
  }))

  // Build style array more carefully
  const cardStyles = [styles.card, animatedStyle, style].filter(Boolean) // Remove undefined values

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} testID={testID}>
        <Animated.View style={cardStyles}>{children}</Animated.View>
      </TouchableOpacity>
    )
  }

  return (
    <Animated.View style={cardStyles} testID={testID}>
      {children}
    </Animated.View>
  )
}
