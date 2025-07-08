import React from 'react'
import { TouchableOpacity, ViewStyle, StyleProp, View } from 'react-native'
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
  // Build style array more carefully
  const cardStyles = [styles.card, style].filter(Boolean) // Remove undefined values

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} testID={testID}>
        <Animated.View style={cardStyles}>{children}</Animated.View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={cardStyles} testID={testID}>
      {children}
    </View>
  )
}
