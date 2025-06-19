import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  // Enhanced container with proper spacing
  buttonContainer: {
    marginVertical: 8,
  },
  
  // Premium base button with enhanced styling
  button: {
    height: 52, // Increased height for better touch target
    borderRadius: 12, // Modern rounded corners
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    minWidth: 120,
    // Premium shadow
    shadowColor: colors.utility.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  
  // Full width variant
  fullWidth: {
    width: '100%',
  },
  
  // Primary button with gradient background
  primaryButton: {
    backgroundColor: colors.button.primary,
    overflow: 'hidden',
    // Enhanced shadow for primary actions
    shadowColor: colors.button.primary,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  
  // Secondary button with refined styling
  secondaryButton: {
    backgroundColor: colors.background.surface,
    borderWidth: 2,
    borderColor: colors.button.primary,
    shadowColor: colors.utility.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  // Ghost button with subtle styling
  ghostButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    height: 44,
    shadowOpacity: 0, // No shadow for ghost buttons
    elevation: 0,
  },
  
  // Large button variant
  largeButton: {
    height: 56,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  
  // Gradient background
  gradient: {
    borderRadius: 12,
  },
  
  // Enhanced text styles
  primaryText: {
    color: colors.text.primary,
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.semibold,
    letterSpacing: fonts.letterSpacing.wide,
  },
  
  secondaryText: {
    color: colors.button.primary,
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.semibold,
    letterSpacing: fonts.letterSpacing.wide,
  },
  
  ghostText: {
    color: colors.button.primary,
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.medium,
  },
  
  largeText: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.semibold,
    letterSpacing: fonts.letterSpacing.wide,
  },
  
  // Enhanced disabled state
  disabledButton: {
    backgroundColor: colors.utility.border,
    opacity: 0.6,
    borderColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  
  disabledText: {
    color: colors.text.muted,
  },
  
  // Icon container with proper spacing
  iconContainer: {
    marginRight: 8,
  },

  // Hover effects (web only)
  buttonHover: {
    transform: [{ scale: 1.02 }],
  },

  // Press effects
  buttonPressed: {
    transform: [{ scale: 0.98 }],
  }
});