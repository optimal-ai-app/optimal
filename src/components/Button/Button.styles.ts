import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  // Container with proper margins
  buttonContainer: {
    marginVertical: 8,
  },
  
  // Base button styles
  button: {
    height: 48,
    borderRadius: 24,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    minWidth: 120,
  },
  
  // Style for full width buttons
  fullWidth: {
    width: '100%',
  },
  
  // Primary button (gradient background)
  primaryButton: {
    backgroundColor: colors.button.primary,
    overflow: 'hidden',
  },
  
  // Secondary button (outline)
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.button.primary,
  },
  
  // Ghost button (text only)
  ghostButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    height: 40,
  },
  
  // Gradient background
  gradient: {
    borderRadius: 24,
  },
  
  // Text styles for each button variant
  primaryText: {
    color: colors.text.primary,
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.medium,
  },
  
  secondaryText: {
    color: colors.button.primary,
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.medium,
  },
  
  ghostText: {
    color: colors.button.primary,
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.medium,
  },
  
  // Disabled state
  disabledButton: {
    backgroundColor: colors.background.container,
    opacity: 0.5,
    borderColor: 'transparent',
  },
  
  disabledText: {
    color: colors.text.muted,
  },
  
  // Icon container
  iconContainer: {
    marginRight: 8,
  },
});