import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  // Premium header with glass morphism effect
  header: {
    height: 64, // Increased height for premium feel
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, // Increased padding
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.utility.divider,
    zIndex: 10,
    // Premium shadow
    shadowColor: colors.utility.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  
  // Glass morphism transparent header
  headerTransparent: {
    backgroundColor: 'rgba(10, 22, 40, 0.85)',
    borderBottomWidth: 0,
    backdropFilter: 'blur(20px)', // Glass effect (web only)
  },
  
  // Enhanced containers
  leftContainer: {
    width: 48,
    alignItems: 'flex-start',
  },
  
  rightContainer: {
    width: 48,
    alignItems: 'flex-end',
  },
  
  // Premium back button with hover effect
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    // Subtle shadow
    shadowColor: colors.utility.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  // Enhanced title typography
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    letterSpacing: fonts.letterSpacing.wide,
  },
  
  // Placeholder for proper centering
  placeholder: {
    width: 40,
    height: 40,
  },
});