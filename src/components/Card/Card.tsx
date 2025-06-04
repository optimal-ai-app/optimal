import React from 'react';
import { View, ViewProps } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue,
  withTiming 
} from 'react-native-reanimated';

import { styles } from './Card.styles';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  padded?: boolean;
  elevated?: boolean;
  onPress?: () => void;
  animateOnMount?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  padded = true,
  elevated = true,
  style,
  animateOnMount = false,
  ...rest
}) => {
  // Animation values
  const opacity = useSharedValue(animateOnMount ? 0 : 1);
  const translateY = useSharedValue(animateOnMount ? 20 : 0);
  
  // Handle mount animation
  React.useEffect(() => {
    if (animateOnMount) {
      opacity.value = withTiming(1, { duration: 500 });
      translateY.value = withTiming(0, { duration: 600 });
    }
  }, [animateOnMount, opacity, translateY]);
  
  // Create animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }]
    };
  });
  
  return (
    <Animated.View
      style={[
        styles.card,
        padded && styles.padded,
        elevated && styles.elevated,
        animatedStyle,
        style
      ]}
      {...rest}
    >
      {children}
    </Animated.View>
  );
};