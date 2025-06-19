import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate
} from 'react-native-reanimated';
import { colors } from '../../constants/colors';

interface PulseAnimationProps {
  children: React.ReactNode;
  color?: string;
  size?: number;
  duration?: number;
  intensity?: number;
}

export const PulseAnimation: React.FC<PulseAnimationProps> = ({
  children,
  color = colors.button.primary,
  size = 100,
  duration = 2000,
  intensity = 0.3
}) => {
  const pulse = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration }),
      -1,
      false
    );
  }, [duration]);

  const pulseStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulse.value, [0, 1], [1, 1.5]);
    const opacity = interpolate(pulse.value, [0, 0.5, 1], [intensity, intensity * 0.5, 0]);

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View
        style={[
          styles.pulse,
          {
            backgroundColor: color,
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          pulseStyle
        ]}
      />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  pulse: {
    position: 'absolute',
  },
  content: {
    zIndex: 1,
  },
});