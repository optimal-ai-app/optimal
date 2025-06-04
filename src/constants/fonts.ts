/**
 * Font definitions for the application
 * Consistent typography across the entire app
 */

export const fonts = {
  // Font weights
  weights: {
    regular: '400',
    medium: '500',
    bold: '600'
  },
  
  // Font sizes
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32
  },
  
  // Line heights
  lineHeights: {
    tight: 1.2,   // For headings (120%)
    normal: 1.5,  // For body text (150%)
    loose: 1.8    // For improved readability (180%)
  },
  
  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5
  },
  
  // Text variants
  variants: {
    heading1: {
      fontSize: 32,
      fontWeight: '600',
      lineHeight: 38.4
    },
    heading2: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 28.8
    },
    heading3: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 24
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24
    },
    bodyBold: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24
    },
    caption: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 21
    },
    button: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24
    }
  }
};