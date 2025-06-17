import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },

  scrollView: {
    flex: 1,
  } as ViewStyle,

  content: {
    padding: 20,
    paddingBottom: 40,
  } as ViewStyle,

  header: {
    marginBottom: 32,
    alignItems: 'center',
  } as ViewStyle,
  inputLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted,
    marginBottom: 8,
    marginLeft: 4,
    fontWeight: fonts.weights.medium,
  } as TextStyle,

  title: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  } as TextStyle,

  subtitle: {
    fontSize: fonts.sizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  } as TextStyle,

  form: {
    gap: 24,
  } as ViewStyle,

  // Date and time picker fields
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
  } as ViewStyle,

  dateTimeField: {
    flex: 1,
  } as ViewStyle,

  fieldContainer: {
    marginBottom: 16,
  } as ViewStyle,

  fieldLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted,
    marginBottom: 8,
    marginLeft: 4,
    fontWeight: fonts.weights.medium,
  } as TextStyle,

  pickerButton: {
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.utility.divider,
    borderRadius: 8,
    backgroundColor: colors.background.container,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,

  pickerButtonFocused: {
    borderColor: colors.button.primary,
    backgroundColor: colors.background.card,
  } as ViewStyle,

  pickerText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    fontWeight: fonts.weights.medium,
  } as TextStyle,

  pickerPlaceholder: {
    color: colors.text.muted,
    fontWeight: fonts.weights.regular,
  } as TextStyle,

  // Dropdown styles
  dropdown: {
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.utility.divider,
    borderRadius: 12,
    backgroundColor: colors.background.container,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,

  dropdownFocused: {
    borderColor: colors.button.primary,
    backgroundColor: colors.background.card,
  } as ViewStyle,

  dropdownText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    fontWeight: fonts.weights.medium,
  } as TextStyle,

  dropdownPlaceholder: {
    color: colors.text.muted,
    fontWeight: fonts.weights.regular,
  } as TextStyle,

  // Dropdown modal
  dropdownModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  } as ViewStyle,

  dropdownContent: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 300,
    maxHeight: 400,
  } as ViewStyle,

  dropdownTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  } as TextStyle,

  dropdownOption: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  dropdownOptionSelected: {
    backgroundColor: colors.button.primary,
  } as ViewStyle,

  dropdownOptionText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    textAlign: 'center',
  } as TextStyle,

  dropdownOptionTextSelected: {
    color: colors.text.primary,
    fontWeight: fonts.weights.bold,
  } as TextStyle,

  dropdownActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  } as ViewStyle,

  dropdownButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  } as ViewStyle,

  dropdownButtonCancel: {
    backgroundColor: colors.background.container,
  } as ViewStyle,

  dropdownButtonConfirm: {
    backgroundColor: colors.button.primary,
  } as ViewStyle,

  dropdownButtonText: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.medium,
  } as TextStyle,

  dropdownButtonTextCancel: {
    color: colors.text.secondary,
  } as TextStyle,

  dropdownButtonTextConfirm: {
    color: colors.text.primary,
  } as TextStyle,

  // Repeating section
  repeatSection: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  } as ViewStyle,

  repeatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  repeatTitle: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
  } as TextStyle,

  repeatToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,

  repeatOptions: {
    gap: 16,
  } as ViewStyle,

  repeatRow: {
    flexDirection: 'row',
    gap: 12,
  } as ViewStyle,

  repeatField: {
    flex: 1,
  } as ViewStyle,

  // Days of week selector
  daysContainer: {
    marginTop: 8,
  } as ViewStyle,

  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  } as ViewStyle,

  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.container,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.utility.divider,
  } as ViewStyle,

  dayButtonSelected: {
    backgroundColor: colors.button.primary,
    borderColor: colors.button.primary,
  } as ViewStyle,

  dayButtonText: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    fontWeight: fonts.weights.medium,
  } as TextStyle,

  dayButtonTextSelected: {
    color: colors.text.primary,
    fontWeight: fonts.weights.bold,
  } as TextStyle,

  // Text area styling
  textAreaContainer: {
    minHeight: 120,
  } as ViewStyle,

  actionButtons: {
    marginTop: 32,
    gap: 16,
  } as ViewStyle,

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
  } as ViewStyle,

  createButtonDisabled: {
    backgroundColor: colors.background.container,
    opacity: 0.5,
    shadowOpacity: 0,
    elevation: 0,
  } as ViewStyle,

  createButtonText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    fontWeight: fonts.weights.bold,
  } as TextStyle,

  createButtonTextDisabled: {
    color: colors.text.muted,
  } as TextStyle,

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
  } as ViewStyle,

  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.status.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  } as ViewStyle,

  successTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 12,
    textAlign: 'center',
  } as TextStyle,

  successMessage: {
    fontSize: fonts.sizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 8,
  } as TextStyle,

  successActions: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  } as ViewStyle,

  successButton: {
    flex: 1,
    backgroundColor: colors.button.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  } as ViewStyle,

  successButtonSecondary: {
    backgroundColor: colors.background.container,
    borderWidth: 2,
    borderColor: colors.button.primary,
  } as ViewStyle,

  successButtonText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    fontWeight: fonts.weights.bold,
  } as TextStyle,

  successButtonTextSecondary: {
    color: colors.button.primary,
    fontWeight: fonts.weights.bold,
  } as TextStyle,

  // Web input styles
  webInput: {
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.utility.divider,
    borderRadius: 12,
    backgroundColor: colors.background.container,
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    fontFamily: 'system',
  } as TextStyle,

  webInputFocused: {
    borderColor: colors.button.primary,
    backgroundColor: colors.background.card,
    outline: 'none',
  } as TextStyle,
});