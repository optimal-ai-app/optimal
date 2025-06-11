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
  
  form: {
    gap: 20,
  },
  
  datePickerButton: {
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.utility.divider,
    borderRadius: 8,
    backgroundColor: colors.background.container,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  datePickerButtonFocused: {
    borderColor: colors.button.primary,
  },
  
  datePickerText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
  },
  
  datePickerPlaceholder: {
    color: colors.text.muted,
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
  },
  
  createButtonDisabled: {
    backgroundColor: colors.background.container,
    opacity: 0.5,
  },
  
  createButtonText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    fontWeight: fonts.weights.bold,
  },
  
  createButtonTextDisabled: {
    color: colors.text.muted,
  },
  
  generateTasksButton: {
    backgroundColor: colors.background.container,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.button.primary,
  },
  
  generateTasksButtonText: {
    fontSize: fonts.sizes.md,
    color: colors.button.primary,
    fontWeight: fonts.weights.medium,
  },
  
  successContainer: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginTop: 20,
  },
  
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.status.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  successTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 8,
  },
  
  successMessage: {
    fontSize: fonts.sizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  
  successActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  
  successButton: {
    flex: 1,
    backgroundColor: colors.button.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  
  successButtonSecondary: {
    backgroundColor: colors.background.container,
    borderWidth: 1,
    borderColor: colors.button.primary,
  },
  
  successButtonText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    fontWeight: fonts.weights.medium,
  },
  
  successButtonTextSecondary: {
    color: colors.button.primary,
  },
});