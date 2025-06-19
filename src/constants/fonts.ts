/**
 * Premium typography system
 * Modern font hierarchy with clear visual distinction
 */

export const fonts = {
  // Font weights
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  },
  
  // Font sizes - Refined scale
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    hero: 40, // Large hero text
    display: 48 // Display headings
  },
  
  // Line heights - Optimized for readability
  lineHeights: {
    tight: 1.2,   // For headings (120%)
    normal: 1.5,  // For body text (150%)
    loose: 1.8    // For improved readability (180%)
  },
  
  // Letter spacing - Refined spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1
  },
  
  // Text variants - Complete typography system
  variants: {
    hero: {
      fontSize: 48,
      fontWeight: '800',
      lineHeight: 52,
      letterSpacing: -0.5
    },
    display: {
      fontSize: 40,
      fontWeight: '700',
      lineHeight: 44,
      letterSpacing: -0.5
    },
    heading1: {
      fontSize: 32,
      fontWeight: '700',
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
    heading4: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 22
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24
    },
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 27
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
    captionBold: {
      fontSize: 14,
      fontWeight: '600',
      lineHeight: 21
    },
    small: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 18
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
      letterSpacing: 0.5
    },
    buttonLarge: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 27,
      letterSpacing: 0.5
    }
  }
};