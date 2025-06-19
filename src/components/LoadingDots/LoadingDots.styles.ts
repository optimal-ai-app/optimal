import { StyleSheet, ViewStyle } from 'react-native'
import { colors } from '@/src/constants/colors'

export const styles = StyleSheet.create({
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    gap: 4
  } as ViewStyle,

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text.primary,
    margin: 2
  } as ViewStyle
})