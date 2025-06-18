import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

  scrollView: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 32,
    alignItems: 'center',
  },

  title: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold as 'bold',
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: fonts.sizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  form: {
    gap: 24,
  },

  // Date picker field container
  dateFieldContainer: {
    marginBottom: 16,
  },

  dateLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted,
    marginBottom: 8,
    marginLeft: 4,
    fontWeight: fonts.weights.medium as '500',
  },

  datePickerButton: {
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.utility.divider,
    borderRadius: 12,
    backgroundColor: colors.background.container,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  datePickerButtonFocused: {
    borderColor: colors.button.primary,
    backgroundColor: colors.background.card,
  },

  datePickerText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    fontWeight: fonts.weights.medium as '500',
  },

  datePickerPlaceholder: {
    color: colors.text.muted,
    fontWeight: fonts.weights.regular as '400',
  },

  // Text area styling
  textAreaContainer: {
    minHeight: 120,
  },

  actionButtons: {
    marginTop: 32,
    gap: 16,
  },

  createButton: {
    backgroundColor: colors.button.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: colors.button.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  createButtonDisabled: {
    backgroundColor: colors.background.container,
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  },

  createButtonText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    fontWeight: fonts.weights.bold as 'bold',
  },

  createButtonTextDisabled: {
    color: colors.text.muted,
  },

  // Success screen styles
  successContainer: {
    backgroundColor: colors.background.card,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },

  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.status.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  successTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold as 'bold',
    color: colors.text.primary,
    marginBottom: 12,
    textAlign: 'center',
  },

  successMessage: {
    fontSize: fonts.sizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 8,
  },

  successActions: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },

  successButton: {
    flex: 1,
    backgroundColor: colors.button.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },

  successButtonSecondary: {
    backgroundColor: colors.background.container,
    borderWidth: 2,
    borderColor: colors.button.primary,
  },

  successButtonText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    fontWeight: fonts.weights.bold as 'bold',
  },

  successButtonTextSecondary: {
    color: colors.button.primary,
    fontWeight: fonts.weights.bold as 'bold',
  },

  // Web date input styles
  webDateInput: {
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.utility.divider,
    borderRadius: 12,
    backgroundColor: colors.background.container,
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    fontFamily: 'system',
  },

  webDateInputFocused: {
    borderColor: colors.button.primary,
    backgroundColor: colors.background.card,
  },
});