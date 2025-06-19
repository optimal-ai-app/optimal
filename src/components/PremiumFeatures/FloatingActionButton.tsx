import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
  interpolate
} from 'react-native-reanimated';
import { Plus } from 'lucide-react-native';
import { colors } from '../../constants/colors';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon,
  size = 'medium'
}) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const shadowOpacity = useSharedValue(0.3);

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return { width: 48, height: 48, borderRadius: 24 };
      case 'large':
        return { width: 72, height: 72, borderRadius: 36 };
      default:
        return { width: 56, height: 56, borderRadius: 28 };
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 20;
      case 'large':
        return 32;
      default:
        return 24;
    }
  };

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
    shadowOpacity.value = withTiming(0.5, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSequence(
      withSpring(1.1, { damping: 8 }),
      withSpring(1, { damping: 12 })
    );
    rotation.value = withSequence(
      withTiming(15, { duration: 100 }),
      withTiming(0, { duration: 200 })
    );
    shadowOpacity.value = withTiming(0.3, { duration: 150 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` }
      ],
      shadowOpacity: shadowOpacity.value,
    };
  });

  return (
    <Animated.View style={[styles.container, getSizeStyle(), animatedStyle]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.button, getSizeStyle()]}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={colors.gradient.primary}
          style={[StyleSheet.absoluteFill, getSizeStyle()]}
        />
        {icon || <Plus size={getIconSize()} color={colors.text.primary} strokeWidth={2.5} />}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: colors.button.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 16,
    elevation: 12,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});