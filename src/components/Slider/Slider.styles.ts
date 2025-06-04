import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  // Overall container
  container: {
    marginVertical: 16,
  },
  
  // Label text
  label: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  
  // Container with end labels
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // End labels (left/right)
  endLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    width: 60,
    textAlign: 'center',
  },
  
  // Track container for positioning
  trackContainer: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    position: 'relative',
  },
  
  // Unfilled track
  track: {
    height: 4,
    backgroundColor: colors.background.container,
    borderRadius: 2,
  },
  
  // Filled track portion
  trackFill: {
    height: 4,
    backgroundColor: colors.button.primary,
    borderRadius: 2,
    position: 'absolute',
    left: 0,
    top: 18,
  },
  
  // Thumb/handle
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.button.primary,
    position: 'absolute',
    top: 10,
    marginLeft: -10,
    
    // Shadow for thumb
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  
  // Value text display
  valueText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    textAlign: 'center',
    marginTop: 8,
  },
});