import { TextStyle, ViewStyle } from 'react-native';
import { colors } from './colors';
import { fonts } from './fonts';

export const globalStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    // paddingTop: 48,
    // paddingBottom: '20%'
  } as ViewStyle,

  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.button.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  } as ViewStyle,

  sectionTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 16,
  } as TextStyle,

  content: {
    padding: 16,
    paddingBottom: 32,
  } as ViewStyle,

  requiredField: {
    borderColor: 'red',
    borderWidth: 1,
  } as ViewStyle,
};

export const itemCardStyle = {
  flexDirection: 'row',
  flex: 1,
  alignItems: 'center',
  paddingVertical: 14,
  paddingHorizontal: 16,
  position: 'relative',
} as ViewStyle;
