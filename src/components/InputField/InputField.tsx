import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TextInputProps,
  TouchableOpacity 
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { styles } from './InputField.styles';
import { colors } from '../../constants/colors';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  helperText,
  icon,
  secureTextEntry,
  value,
  onFocus,
  onBlur,
  style,
  ...rest
}) => {
  // State for input focus and password visibility
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  // Animation values
  const labelPosition = useSharedValue(value ? -25 : 0);
  const labelSize = useSharedValue(value ? 12 : 16);
  const borderColor = useSharedValue(
    error ? colors.status.error : colors.utility.divider
  );
  
  // Handle input focus
  const handleFocus = (e: any) => {
    setIsFocused(true);
    
    // Animate label to the top
    labelPosition.value = withTiming(-25, { duration: 200 });
    labelSize.value = withTiming(12, { duration: 200 });
    
    // Change border color when focused (unless there's an error)
    if (!error) {
      borderColor.value = withTiming(colors.button.primary, { duration: 200 });
    }
    
    // Call the original onFocus handler if provided
    onFocus && onFocus(e);
  };
  
  // Handle input blur
  const handleBlur = (e: any) => {
    setIsFocused(false);
    
    // Only animate label back if there's no value
    if (!value) {
      labelPosition.value = withTiming(0, { duration: 200 });
      labelSize.value = withTiming(16, { duration: 200 });
    }
    
    // Reset border color (unless there's an error)
    if (!error) {
      borderColor.value = withTiming(colors.utility.divider, { duration: 200 });
    }
    
    // Call the original onBlur handler if provided
    onBlur && onBlur(e);
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };
  
  // Animated styles
  const animatedLabelStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: labelPosition.value }],
      fontSize: labelSize.value
    };
  });
  
  const animatedBorderStyle = useAnimatedStyle(() => {
    return {
      borderColor: borderColor.value
    };
  });
  
  return (
    <View style={[styles.container, style]}>
      <Animated.View 
        style={[
          styles.inputContainer,
          animatedBorderStyle
        ]}
      >
        <Animated.Text 
          style={[
            styles.label,
            isFocused && !error && styles.focusedLabel,
            error && styles.errorLabel,
            animatedLabelStyle
          ]}
        >
          {label}
        </Animated.Text>
        
        <View style={styles.inputRow}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          
          <TextInput
            style={styles.input}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            placeholderTextColor={colors.text.muted}
            selectionColor={colors.button.primary}
            {...rest}
          />
          
          {secureTextEntry && (
            <TouchableOpacity 
              onPress={togglePasswordVisibility}
              style={styles.visibilityToggle}
              accessibilityRole="button"
              accessibilityLabel={
                isPasswordVisible ? "Hide password" : "Show password"
              }
            >
              {isPasswordVisible ? (
                <EyeOff size={20} color={colors.text.muted} />
              ) : (
                <Eye size={20} color={colors.text.muted} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
      
      {(error || helperText) && (
        <Text 
          style={[
            styles.helperText,
            error && styles.errorText
          ]}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
};