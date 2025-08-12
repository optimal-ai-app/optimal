import { StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { colors } from '@/src/constants/colors'
import { fonts } from '@/src/constants/fonts'

export const styles = StyleSheet.create({
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 8,
    maxWidth: '80%'
  } as ViewStyle,

  agentMessageWrapper: {
    alignSelf: 'flex-start'
  } as ViewStyle,

  tagsWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    marginTop: 4
  } as ViewStyle,

  agentAvatar: {
    marginRight: 8,
    alignSelf: 'flex-end'
  } as ViewStyle,

  avatarGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  } as ViewStyle,

  avatarText: {
    color: colors.text.primary,
    fontSize: fonts.sizes.xs,
    fontWeight: '700'
  } as TextStyle,

  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '100%'
  } as ViewStyle,

  agentMessageBubble: {
    backgroundColor: colors.background.container,
    borderBottomLeftRadius: 4
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