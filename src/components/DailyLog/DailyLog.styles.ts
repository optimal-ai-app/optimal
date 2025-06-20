import { StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { colors } from '@/src/constants/colors'
import { fonts } from '@/src/constants/fonts'

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 24
  } as ViewStyle,

  card: {
    backgroundColor: colors.background.card,
    borderRadius: 20,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: colors.utility.shadow,
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)'
  } as ViewStyle,

  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0
  } as ViewStyle,

  gradient: {
    flex: 1,
    opacity: 0.1
  } as ViewStyle,

  header: {
    alignItems: 'center',
    marginBottom: 32,
    zIndex: 1
  } as ViewStyle,

  title: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: 'center'
  } as TextStyle,

  subtitle: {
    fontSize: fonts.sizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.9
  } as TextStyle,

  recordingArea: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    position: 'relative',
    zIndex: 1
  } as ViewStyle,

  pulseRing: {
    position: 'absolute',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.button.primary
  } as ViewStyle,

  pulseRing1: {
    width: 120,
    height: 120
  } as ViewStyle,

  pulseRing2: {
    width: 160,
    height: 160,
    borderWidth: 1
  } as ViewStyle,

  ripple: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.button.primary
  } as ViewStyle,

  lockIndicator: {
    position: 'absolute',
    left: -80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6
  } as ViewStyle,

  lockText: {
    color: colors.text.primary,
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.medium
  } as TextStyle,

  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    shadowColor: colors.button.primary,
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12
  } as ViewStyle,

  micButtonInner: {
    width: '100%',
    height: '100%',
    borderRadius: 40
  } as ViewStyle,

  micButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  } as ViewStyle,

  transcriptContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 1
  } as ViewStyle,

  transcriptLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    fontWeight: fonts.weights.medium,
    marginBottom: 8
  } as TextStyle,

  transcriptText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    lineHeight: 22,
    fontStyle: 'italic'
  } as TextStyle,

  instructions: {
    marginTop: 24,
    gap: 8,
    zIndex: 1
  } as ViewStyle,

  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  } as ViewStyle,

  instructionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.button.primary,
    opacity: 0.7
  } as ViewStyle,

  instructionText: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    opacity: 0.8
  } as TextStyle
})