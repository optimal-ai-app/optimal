import { StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { colors } from '@/src/constants/colors'
import { fonts } from '@/src/constants/fonts'

export const styles = StyleSheet.create({
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%'
  } as ViewStyle,

  userMessageWrapper: {
    alignSelf: 'flex-end'
  } as ViewStyle,

  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '100%'
  } as ViewStyle,

  userMessageBubble: {
    backgroundColor: colors.button.primary,
    borderBottomRightRadius: 4
  } as ViewStyle,

  messageText: {
    color: colors.text.primary,
    fontSize: fonts.sizes.md,
    lineHeight: 20
  } as TextStyle,

  timestamp: {
    fontSize: fonts.sizes.xs,
    color: colors.text.muted,
    alignSelf: 'flex-end',
    marginTop: 4
  } as TextStyle
})