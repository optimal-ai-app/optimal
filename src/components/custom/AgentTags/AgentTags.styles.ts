import { StyleSheet, ViewStyle, TextStyle, Platform } from 'react-native'
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
    width: '100%',
    backgroundColor: colors.background.container,
    borderWidth: 1,
    borderColor: colors.utility.divider,
    textAlign: 'center',
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
    alignItems: 'center',
    flex: 1,
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
    marginBottom: 6,
    flexDirection: 'row',

  } as TextStyle,

  taskInput: {
    backgroundColor: colors.background.card,
    borderRadius: 8,
    padding: 12,
    width: '100%',
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'transparent',
    gap: 8, marginRight: 10

  } as ViewStyle,


  dropdownOption: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: colors.background.container,
    borderWidth: 1,
    borderColor: colors.utility.divider,
    marginBottom: 8,
    width: '100%'
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

  taskDateText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    fontWeight: '500'
  } as TextStyle,

  taskRepeatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 12,
    alignSelf: 'center'
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
  } as TextStyle,

  // Goal Card Styles (matching GoalCard.styles.ts)
  goalPreview: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  } as ViewStyle,

  overdueGoal: {
    borderColor: 'rgba(239, 68, 68, 0.3)',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  } as ViewStyle,

  cardContent: {
    flex: 1,
  } as ViewStyle,

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  } as ViewStyle,

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  } as ViewStyle,

  titleIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  } as ViewStyle,

  titleIcon: {
    opacity: 0.9,
  } as ViewStyle,

  goalTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: '600',
    color: colors.text.primary,
    flex: 1,
  } as TextStyle,

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  } as ViewStyle,

  statusText: {
    fontSize: fonts.sizes.xs,
    fontWeight: '500',
    color: '#FFFFFF',
  } as TextStyle,

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  } as ViewStyle,

  progressContainer: {
    flex: 1,
    marginRight: 16,
  } as ViewStyle,

  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  } as ViewStyle,

  progressBar: {
    height: 6,
    backgroundColor: colors.utility.divider,
    borderRadius: 3,
    overflow: 'hidden',
    flexDirection: 'row',
  } as ViewStyle,

  progressFill: {
    height: '100%',
    borderRadius: 3,
  } as ViewStyle,

  progressText: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    fontWeight: '500',
    marginLeft: 6,
  } as TextStyle,

  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,

  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  } as ViewStyle,

  statText: {
    fontSize: fonts.sizes.sm,
    fontWeight: '600',
    color: '#F97316',
    marginLeft: 4,
  } as TextStyle,

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,

  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,

  dueDateText: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    fontWeight: '500',
    marginLeft: 6,
  } as TextStyle,

  overdueText: {
    color: colors.status?.error || '#EF4444',
  } as TextStyle,

  // Goal Action Button Styles
  goalActionButtons: {
    flexDirection: 'row',
    gap: 12,
  } as ViewStyle,

  reevaluateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.container,
    borderRadius: 12,
    padding: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.utility.divider,
    flex: 1,
  } as ViewStyle,

  reevaluateButtonText: {
    fontSize: fonts.sizes.md,
    fontWeight: '600',
    color: colors.text.secondary,
  } as TextStyle,

  addGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.button.primary,
    borderRadius: 12,
    padding: 14,
    gap: 8,
    flex: 1,
  } as ViewStyle,

  addGoalButtonDisabled: {
    backgroundColor: colors.background.container,
    opacity: 0.6,
  } as ViewStyle,

  addGoalButtonText: {
    fontSize: fonts.sizes.md,
    fontWeight: '600',
    color: colors.text.primary,
  } as TextStyle,

  addGoalButtonTextDisabled: {
    color: colors.text.muted,
  } as TextStyle,
})