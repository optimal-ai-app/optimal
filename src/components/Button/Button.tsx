import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  ActivityIndicator,
  TouchableOpacityProps,
  StyleSheet 
} from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './Button.styles';
import { colors } from '../../constants/colors';

// Button variants for styling
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  isLoading = false,
  icon,
  disabled = false,
  fullWidth = false,
  style,
  ...rest
}) => {
  // Animation values
  const scale = useSharedValue(1);
  
  // Handle press animation
  const handlePressIn = () => {
    scale.value = withSpring(0.96);
  };
  
  const handlePressOut = () => {
    scale.value = withSpring(1);
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });
  
  // Determine which button style to use based on variant
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'ghost':
        return styles.ghostButton;
      default:
        return styles.primaryButton;
    }
  };
  
  // Determine which text style to use based on variant
  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'ghost':
        return styles.ghostText;
      default:
        return styles.primaryText;
    }
  };
  
  // Render primary button with gradient
  if (variant === 'primary' && !disabled) {
    return (
      <Animated.View 
        style={[
          animatedStyle, 
          styles.buttonContainer,
          fullWidth && styles.fullWidth,
          style
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || isLoading}
          style={[styles.button, getButtonStyle()]}
          accessibilityRole="button"
          accessibilityLabel={title}
          accessibilityState={{ disabled: disabled || isLoading }}
          {...rest}
        >
          <LinearGradient
            colors={[colors.gradient.start, colors.gradient.end]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              StyleSheet.absoluteFill,
              styles.gradient
            ]}
          />
          
          {isLoading ? (
            <ActivityIndicator size="small\" color={colors.text.primary} />
          ) : (
            <>
              {icon && <span style={styles.iconContainer}>{icon}</span>}
              <Text style={getTextStyle()}>{title}</Text>
            </>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  }
  
  // Render other button variants
  return (
    <Animated.View 
      style={[
        animatedStyle, 
        styles.buttonContainer,
        fullWidth && styles.fullWidth,
        style
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || isLoading}
        style={[
          styles.button, 
          getButtonStyle(),
          disabled && styles.disabledButton
        ]}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ disabled: disabled || isLoading }}
        {...rest}
      >
        {isLoading ? (
          <ActivityIndicator 
            size="small" 
            color={variant === 'ghost' ? colors.button.primary : colors.text.primary} 
          />
        ) : (
          <>
            {icon && <span style={styles.iconContainer}>{icon}</span>}
            <Text style={[
              getTextStyle(),
              disabled && styles.disabledText
            ]}>
              {title}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};