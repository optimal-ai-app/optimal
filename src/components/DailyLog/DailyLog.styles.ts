import { StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { colors } from '@/src/constants/colors'
import { fonts } from '@/src/constants/fonts'
import { LinearGradient } from 'react-native-svg'

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 24
  } as ViewStyle,

  card: {
    backgroundColor: 'transparent',
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
    borderColor: 'rgba(255, 255, 255, 0.25)'
  } as ViewStyle,

  gradientBackground: {
    position: 'relative',

  } as ViewStyle,

  gradient: {
    flex: 1,
    opacity: 1,
    borderRadius: 20,
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
    fontWeight: fonts.weights.bold,
    fontSize: fonts.sizes.md,
    color: colors.background.card,
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
    borderRadius: 300,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)'
  } as ViewStyle,

  pulseRing1: {
    width: 150,
    height: 150
  } as ViewStyle,

  pulseRing2: {
    width: 170,
    height: 170,
    borderWidth: 1

  } as ViewStyle,

  pulseRing3: {
    width: 200,
    height: 200,
    borderWidth: 3
  } as ViewStyle,

  ripple: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  } as ViewStyle,

  micButton: {
    borderRadius: 100,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
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
    borderRadius: 100
  } as ViewStyle,

  micButtonGradient: {
    height: 120,
    width: 120,

    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  } as ViewStyle,

  transcriptContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 100,
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    opacity: 0.7
  } as ViewStyle,

  instructionText: {
    fontSize: fonts.sizes.sm,
    color: colors.background.card,
    opacity: 0.8
  } as TextStyle,

  // New animation styles
  floatingParticle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.6)'
  } as ViewStyle,

  waveRing: {
    position: 'absolute',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)'
  } as ViewStyle,

  wave1: {
    width: 140,
    height: 140
  } as ViewStyle,

  wave2: {
    width: 180,
    height: 180,
    borderWidth: 1.5
  } as ViewStyle,

  wave3: {
    width: 220,
    height: 220,
    borderWidth: 1
  } as ViewStyle,

  breathingBackground: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 0.05
  } as ViewStyle,

  micGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    opacity: 0.2,
    shadowColor: 'rgba(255, 255, 255, 0.5)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20
  } as ViewStyle,

  recordingIndicator: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.status.error,
    borderWidth: 2,
    borderColor: colors.background.card,
    shadowColor: colors.status.error,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10
  } as ViewStyle
})

