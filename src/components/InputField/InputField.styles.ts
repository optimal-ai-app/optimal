import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  // Overall container
  container: {
    marginBottom: 16,
  },
  
  // Input container with border
  inputContainer: {
    height: 56,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.utility.divider,
    borderRadius: 8,
    backgroundColor: colors.background.container,
    position: 'relative',
    justifyContent: 'center',
  },
  
  // Input label
  label: {
    position: 'absolute',
    left: 16,
    color: colors.text.muted,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  
  // Focused label style
  focusedLabel: {
    color: colors.button.primary,
  },
  
  // Error label style
  errorLabel: {
    color: colors.status.error,
  },
  
  // Input row for icon and text input
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  
  // Icon container
  iconContainer: {
    marginRight: 8,
  },
  
  // Text input
  input: {
    flex: 1,
    height: '100%',
    color: colors.text.primary,
    fontSize: fonts.sizes.md,
    paddingTop: 16,
  },
  
  // Password visibility toggle
  visibilityToggle: {
    padding: 8,
    marginRight: -8,
  },
  
  // Helper text below input
  helperText: {
    fontSize: fonts.sizes.xs,
    color: colors.text.muted,
    marginTop: 4,
    marginLeft: 16,
  },
  
  // Error message
  errorText: {
    color: colors.status.error,
  },
});