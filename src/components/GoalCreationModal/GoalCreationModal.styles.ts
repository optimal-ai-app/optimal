import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  // Modal overlay
  overlay: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Modal container
  modalContainer: {
    backgroundColor: colors.background.card,
    borderRadius: 24,
    padding: 12,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: fonts.sizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Options container
  optionsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },

  // Option button
  optionButton: {
    flex: 1,
    backgroundColor: colors.background.container,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },

  optionButtonActive: {
    backgroundColor: colors.button.primary,
    borderColor: colors.button.primary,
  },

  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  optionIconActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },

  optionTitle: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 4,
    textAlign: 'center',
  },

  optionDescription: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 18,
  },

  optionDescriptionActive: {
    color: colors.text.primary,
  },

  // Action buttons
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: colors.background.container,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  cancelButtonText: {
    fontSize: fonts.sizes.md,
    color: colors.text.secondary,
    fontWeight: fonts.weights.medium,
  },

  continueButton: {
    flex: 1,
    backgroundColor: colors.button.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },

  continueButtonDisabled: {
    backgroundColor: colors.background.container,
    opacity: 0.5,
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