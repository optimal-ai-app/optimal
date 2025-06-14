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
  inputLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted,
    marginBottom: 8,
    marginLeft: 4,
    fontWeight: fonts.weights.medium,
  },

  title: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
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

  // Date and time picker fields
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 12,
  },

  dateTimeField: {
    flex: 1,
  },

  fieldContainer: {
    marginBottom: 16,
  },

  fieldLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted,
    marginBottom: 8,
    marginLeft: 4,
    fontWeight: fonts.weights.medium,
  },

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
  },

  pickerButtonFocused: {
    borderColor: colors.button.primary,
    backgroundColor: colors.background.card,
  },

  pickerText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    fontWeight: fonts.weights.medium,
  },

  pickerPlaceholder: {
    color: colors.text.muted,
    fontWeight: fonts.weights.regular,
  },

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
  },

  dropdownFocused: {
    borderColor: colors.button.primary,
    backgroundColor: colors.background.card,
  },

  dropdownText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    fontWeight: fonts.weights.medium,
  },

  dropdownPlaceholder: {
    color: colors.text.muted,
    fontWeight: fonts.weights.regular,
  },

  // Dropdown modal
  dropdownModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  dropdownContent: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 300,
    maxHeight: 400,
  },

  dropdownTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },

  dropdownOption: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  dropdownOptionSelected: {
    backgroundColor: colors.button.primary,
  },

  dropdownOptionText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    textAlign: 'center',
  },

  dropdownOptionTextSelected: {
    color: colors.text.primary,
    fontWeight: fonts.weights.bold,
  },

  dropdownActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },

  dropdownButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  dropdownButtonCancel: {
    backgroundColor: colors.background.container,
  },

  dropdownButtonConfirm: {
    backgroundColor: colors.button.primary,
  },

  dropdownButtonText: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.medium,
  },

  dropdownButtonTextCancel: {
    color: colors.text.secondary,
  },

  dropdownButtonTextConfirm: {
    color: colors.text.primary,
  },

  // Repeating section
  repeatSection: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },

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
  },

  repeatToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  repeatOptions: {
    gap: 16,
  },

  repeatRow: {
    flexDirection: 'row',
    gap: 12,
  },

  repeatField: {
    flex: 1,
  },

  // Days of week selector
  daysContainer: {
    marginTop: 8,
  },

  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.container,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.utility.divider,
  },

  dayButtonSelected: {
    backgroundColor: colors.button.primary,
    borderColor: colors.button.primary,
  },

  dayButtonText: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    fontWeight: fonts.weights.medium,
  },

  dayButtonTextSelected: {
    color: colors.text.primary,
    fontWeight: fonts.weights.bold,
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
    fontWeight: fonts.weights.bold,
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
    fontWeight: fonts.weights.bold,
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
    fontWeight: fonts.weights.bold,
  },

  successButtonTextSecondary: {
    color: colors.button.primary,
    fontWeight: fonts.weights.bold,
  },

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
  },

  webInputFocused: {
    borderColor: colors.button.primary,
    backgroundColor: colors.background.card,
    outline: 'none',
  },
});