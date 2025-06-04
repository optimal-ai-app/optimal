import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  // Base card styles
  card: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 8,
  },
  
  // Add padding when padded prop is true
  padded: {
    padding: 16,
  },
  
  // Add elevation shadow when elevated prop is true
  elevated: {
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    
    // Android shadow
    elevation: 4,
  },
});