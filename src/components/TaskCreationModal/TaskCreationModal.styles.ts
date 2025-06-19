import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  // Enhanced modal overlay with backdrop blur
  overlay: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.utility.backdrop,
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)', // Glass effect (web only)
  },

  // Premium modal container with enhanced shadows
  modalContainer: {
    backgroundColor: colors.background.card,
    borderRadius: 24,
    padding: 24, // Increased padding
    width: '90%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: colors.utility.border,
    // Enhanced shadow system
    shadowColor: colors.utility.shadow,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 16,
  },

  // Enhanced header styling
  header: {
    alignItems: 'center',
    marginBottom: 32, // Increased spacing
  },

  title: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 12, // Increased spacing
    textAlign: 'center',
  },

  subtitle: {
    fontSize: fonts.sizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24, // Improved line height
    opacity: 0.9,
  },

  // Enhanced options container
  optionsContainer: {
    flexDirection: 'row',
    gap: 20, // Increased gap
    marginBottom: 32, // Increased spacing
  },

  // Premium option button styling
  optionButton: {
    flex: 1,
    backgroundColor: colors.background.container,
    borderRadius: 20, // Increased border radius
    padding: 24, // Increased padding
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    // Subtle shadow
    shadowColor: colors.utility.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  optionButtonActive: {
    backgroundColor: colors.button.primary,
    borderColor: colors.button.primary,
    // Enhanced shadow for active state
    shadowColor: colors.button.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },

  // Enhanced icon container
  optionIcon: {
    width: 56, // Increased size
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16, // Increased spacing
    // Subtle inner shadow effect
    shadowColor: colors.utility.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  optionIconActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  // Enhanced typography
  optionTitle: {
    fontSize: fonts.sizes.lg, // Increased font size
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 8, // Increased spacing
    textAlign: 'center',
  },

  optionDescription: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20, // Improved line height
    opacity: 0.8,
  },

  optionDescriptionActive: {
    color: colors.text.primary,
    opacity: 1,
  },

  // Enhanced action buttons
  actionButtons: {
    flexDirection: 'row',
    gap: 16, // Increased gap
  },

  cancelButton: {
    flex: 1,
    backgroundColor: colors.background.container,
    borderRadius: 16, // Increased border radius
    paddingVertical: 16, // Increased padding
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.utility.border,
  },

  cancelButtonText: {
    fontSize: fonts.sizes.md,
    color: colors.text.secondary,
    fontWeight: fonts.weights.medium,
  },

  continueButton: {
    flex: 1,
    backgroundColor: colors.button.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    // Enhanced shadow
    shadowColor: colors.button.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  continueButtonDisabled: {
    backgroundColor: colors.background.container,
    opacity: 0.6,
    shadowOpacity: 0,
    elevation: 0,
  },

  continueButtonText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    fontWeight: fonts.weights.bold,
  },

  continueButtonTextDisabled: {
    color: colors.text.muted,
  },
});