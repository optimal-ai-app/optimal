/**
 * Consistent spacing system for the application
 * Based on 8px grid system for better design consistency
 */
export const spacing = {
    // Base spacing units (multiples of 8)
    xs: 4,    // 0.5x
    sm: 8,    // 1x
    md: 16,   // 2x  
    lg: 24,   // 3x
    xl: 32,   // 4x
    xxl: 40,  // 5x
    xxxl: 48, // 6x

    // Common use cases
    screen: {
        horizontal: 16,
        vertical: 16,
        bottom: 32
    },

    card: {
        padding: 16,
        margin: 16,
        gap: 12
    },

    section: {
        marginBottom: 24,
        paddingVertical: 16
    },

    button: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        gap: 8
    },

    hero: {
        padding: 24,
        marginBottom: 24
    }
} as const

export type SpacingKey = keyof typeof spacing 