import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  // Base header container
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.utility.divider,
    zIndex: 10,
  },
  
  // Transparent header variant
  headerTransparent: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  
  // Left side container (for back button)
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  
  // Right side container (for actions)
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  
  // Back button styling
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  
  // Title text
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
  },
  
  // Placeholder to ensure proper centering
  placeholder: {
    width: 24,
    height: 24,
  },
});