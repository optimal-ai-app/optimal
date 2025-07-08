import { StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { colors } from '@/src/constants/colors'
import { fonts } from '@/src/constants/fonts'

export const styles = StyleSheet.create({
  // Confirmation Styles
  confirmationContainer: {
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
    justifyContent: 'center',
    width: '100%'
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
    width: '100%',
    alignItems: 'center'
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
    marginBottom: 8,
    justifyContent: 'center',


  } as ViewStyle,

  timePickerButton: {
    width: '100%',
    alignItems: 'center'
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
  } as TextStyle,

  // Task Card Styles
  taskCardContainer: {
    backgroundColor: colors.background.container,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 8,
    minWidth: '100%',
    minHeight: 400,
    borderWidth: 1,
    borderColor: colors.utility.divider
  } as ViewStyle,

  taskCardHeader: {
    marginBottom: 16,
    alignItems: 'center'
  } as ViewStyle,

  taskCardTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: '700',
    color: colors.text.primary
  } as TextStyle,

  taskCardContent: {
    flex: 1,
    marginBottom: 16,
    minHeight: 300,
    minWidth: '100%',

  } as ViewStyle,

  taskField: {
    marginBottom: 12,
    alignItems: 'center'
  } as ViewStyle,

  taskFieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  } as ViewStyle,

  taskFieldLabel: {
    fontSize: fonts.sizes.sm,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: 6
  } as TextStyle,

  taskInput: {
    backgroundColor: colors.background.card,
    borderRadius: 8,
    padding: 12,
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.utility.divider
  } as TextStyle,

  taskInputMultiline: {
    height: 80,
    textAlignVertical: 'top'
  } as TextStyle,

  priorityContainer: {
    flexDirection: 'row',
    gap: 8
  } as ViewStyle,

  priorityButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.utility.divider,
    alignItems: 'center'
  } as ViewStyle,

  priorityButtonText: {
    fontSize: fonts.sizes.sm,
    fontWeight: '600',
    color: colors.text.secondary
  } as TextStyle,

  taskDateView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
    gap: 8
  } as ViewStyle,

  taskDateText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    fontWeight: '500'
  } as TextStyle,

  taskRepeatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  } as ViewStyle,

  taskRepeatToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'flex-end'
  } as ViewStyle,

  taskRepeatOptions: {
    paddingLeft: 8,
    paddingTop: 8
  } as ViewStyle,

  taskCardFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.utility.divider,
    paddingTop: 16
  } as ViewStyle,

  taskSubmitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.button.primary,
    borderRadius: 12,
    padding: 14,
    gap: 8
  } as ViewStyle,

  taskSubmitButtonDisabled: {
    backgroundColor: colors.background.container,
    opacity: 0.6
  } as ViewStyle,

  taskSubmitButtonText: {
    fontSize: fonts.sizes.md,
    fontWeight: '600',
    color: colors.text.primary
  } as TextStyle,

  // Date/Time Picker Container Styles
  pickerContainer: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.utility.divider,
    alignItems: 'center'
  } as ViewStyle,

  pickerCloseButton: {
    backgroundColor: colors.button.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12
  } as ViewStyle,

  pickerCloseText: {
    color: colors.text.primary,
    fontSize: fonts.sizes.sm,
    fontWeight: '600'
  } as TextStyle
})