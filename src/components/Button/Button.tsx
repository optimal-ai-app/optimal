import React from 'react'
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
  StyleSheet
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { styles } from './Button.styles'
import { colors } from '../../constants/colors'

// Enhanced button variants
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'large'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: ButtonVariant
  isLoading?: boolean
  icon?: React.ReactNode
  disabled?: boolean
  fullWidth?: boolean
  gradient?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  isLoading = false,
  icon,
  disabled = false,
  fullWidth = false,
  gradient = false,
  style,
  ...rest
}) => {
  // Determine button style based on variant
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryButton
      case 'secondary':
        return styles.secondaryButton
      case 'ghost':
        return styles.ghostButton
      case 'large':
        return [styles.primaryButton, styles.largeButton]
      default:
        return styles.primaryButton
    }
  }

  // Determine text style based on variant
  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryText
      case 'secondary':
        return styles.secondaryText
      case 'ghost':
        return styles.ghostText
      case 'large':
        return [styles.primaryText, styles.largeText]
      default:
        return styles.primaryText
    }
  }

  // Render primary button with optional gradient
  if ((variant === 'primary' || variant === 'large') && !disabled) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled || isLoading}
        style={[
          styles.buttonContainer,
          styles.button,
          getButtonStyle(),
          fullWidth && styles.fullWidth,
          style
        ]}
        accessibilityRole='button'
        accessibilityLabel={title}
        accessibilityState={{ disabled: disabled || isLoading }}
        {...rest}
      >
        {gradient ? (
          <LinearGradient
            colors={colors.gradient.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              StyleSheet.absoluteFill,
              variant === 'large' ? { borderRadius: 16 } : styles.gradient
            ]}
          />
        ) : null}

        {isLoading ? (
          <ActivityIndicator size='small' color={colors.text.primary} />
        ) : (
          <>
            {icon && <span style={styles.iconContainer}>{icon}</span>}
            <Text style={getTextStyle()}>{title}</Text>
          </>
        )}
      </TouchableOpacity>
    )
  }

  // Render other button variants
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || isLoading}
      style={[
        styles.buttonContainer,
        styles.button,
        getButtonStyle(),
        fullWidth && styles.fullWidth,
        disabled && styles.disabledButton,
        style
      ]}
      accessibilityRole='button'
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || isLoading }}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator
          size='small'
          color={
            variant === 'ghost' ? colors.button.primary : colors.text.primary
          }
        />
      ) : (
        <>
          {icon && <span style={styles.iconContainer}>{icon}</span>}
          <Text style={[getTextStyle(), disabled && styles.disabledText]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  )
}
