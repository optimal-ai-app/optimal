import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  // Premium card with enhanced shadows and rounded corners
  card: {
    backgroundColor: colors.background.card,
    borderRadius: 16, // Increased border radius
    overflow: 'hidden',
    marginVertical: 8,
    // Premium border
    borderWidth: 1,
    borderColor: colors.utility.border,
  },
  
  // Enhanced padding
  padded: {
    padding: 20, // Increased padding for premium feel
  },
  
  // Premium elevation with multiple shadow layers
  elevated: {
    // Primary shadow
    shadowColor: colors.utility.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
    
    // Additional subtle border for definition
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },

  // Glass morphism variant
  glass: {
    backgroundColor: 'rgba(26, 35, 50, 0.8)',
    backdropFilter: 'blur(20px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },

  // Premium surface variant
  surface: {
    backgroundColor: colors.background.surface,
    shadowColor: 'rgba(0, 59, 149, 0.1)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  }
});