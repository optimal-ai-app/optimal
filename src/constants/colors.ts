/**
 * Premium color palette inspired by leading travel websites
 * Deep blues, crisp whites, and strategic accent colors for trust and professionalism
 */

export const colors = {
  // Main colors - Deep blue palette for trust and professionalism
  background: {
    primary: '#0A1628', // Deep navy for premium feel
    card: '#1A2332', // Elevated card background
    container: '#243142', // Container background
    surface: '#FFFFFF', // Pure white for contrast
    overlay: 'rgba(10, 22, 40, 0.95)' // Dark overlay with transparency
  },

  // Button colors - Vibrant blues for action
  button: {
    primary: '#003B95', // Deep Expedia-like blue
    primaryHover: '#0052CC', // Hover state
    accent: '#0066FF', // Bright accent blue
    accentHover: '#0052CC', // Accent hover
    secondary: '#F8F9FA', // Light secondary
    secondaryHover: '#E9ECEF' // Secondary hover
  },

  // Text colors - High contrast for readability
  text: {
    primary: '#FFFFFF', // Pure white for dark backgrounds
    secondary: '#B8C5D1', // Muted blue-gray
    muted: '#8A9BA8', // Subtle text
    inverse: '#1A2332', // Dark text for light backgrounds
    accent: '#003B95' // Accent text color
  },

  // Status colors - Clear feedback states
  status: {
    success: '#00C851', // Vibrant green
    warning: '#FF8800', // Orange warning
    error: '#FF4444', // Clear red error
    info: '#0066FF' // Information blue
  },

  // Gradient colors - Premium gradients
  gradient: {
    primary: ['#003B95', '#0066FF'] as const, // Primary blue gradient
    secondary: ['#667EEA', '#764BA2'] as const, // Purple-blue gradient
    accent: ['#FF6B6B', '#FF8E53'] as const, // Warm accent gradient
    surface: ['#FFFFFF', '#F8F9FA'] as const, // Subtle surface gradient
    // Legacy support for components expecting start/end properties
    start: '#003B95',
    end: '#0066FF'
  },

  // Utility colors
  utility: {
    divider: 'rgba(184, 197, 209, 0.2)', // Subtle dividers
    shadow: 'rgba(0, 0, 0, 0.15)', // Soft shadows
    border: 'rgba(184, 197, 209, 0.3)', // Border color
    backdrop: 'rgba(0, 0, 0, 0.6)' // Modal backdrop
  },

  // Premium accent colors
  premium: {
    gold: '#FFD700', // Premium gold
    silver: '#C0C0C0', // Silver accent
    bronze: '#CD7F32' // Bronze accent
  }
};