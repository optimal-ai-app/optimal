import { StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { colors } from '@/src/constants/colors'
import { fonts } from '@/src/constants/fonts'

export const styles = StyleSheet.create({
  // Confirmation Styles
  confirmationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
    gap: 12
  } as ViewStyle,

  confirmButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  } as ViewStyle,

  proceedButton: {
    backgroundColor: colors.button.primary
  } as ViewStyle,

  tryElseButton: {
    backgroundColor: colors.background.container,
    borderWidth: 1,
    borderColor: colors.text.muted
  } as ViewStyle,

  confirmButtonText: {
    color: colors.text.primary,
    fontSize: fonts.sizes.sm,
    fontWeight: '600'
  } as TextStyle,

  // Date Picker Styles
  datePickerContainer: {
    marginTop: 12,
    marginBottom: 8
  } as ViewStyle,

  datePickerButton: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.utility.divider
  } as ViewStyle,

  datePickerText: {
    color: colors.text.primary,
    fontSize: fonts.sizes.md,
    fontWeight: '500',
    textAlign: 'center'
  } as TextStyle,

  // Time Picker Styles
  timePickerContainer: {
    marginTop: 12,
    marginBottom: 8
  } as ViewStyle,

  timePickerButton: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.utility.divider
  } as ViewStyle,

  timePickerText: {
    color: colors.text.primary,
    fontSize: fonts.sizes.md,
    fontWeight: '500',
    textAlign: 'center'
  } as TextStyle,

  // Day Selector Styles
  daySelectorContainer: {
    marginTop: 12,
    marginBottom: 8
  } as ViewStyle,

  daySelectorTitle: {
    color: colors.text.primary,
    fontSize: fonts.sizes.md,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center'
  } as TextStyle,

  daysGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8
  } as ViewStyle,

  dayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background.container,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.utility.divider
  } as ViewStyle,

  dayButtonSelected: {
    backgroundColor: colors.button.primary,
    borderColor: colors.button.primary
  } as ViewStyle,

  dayButtonText: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    fontWeight: '500'
  } as TextStyle,

  dayButtonTextSelected: {
    color: colors.text.primary,
    fontWeight: '700'
  } as TextStyle
})