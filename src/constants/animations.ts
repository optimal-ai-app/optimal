import { Easing } from 'react-native-reanimated'
import { ViewStyle, TextStyle, ImageStyle } from 'react-native'

// Animation durations
export const animationDurations = {
    fast: 200,
    normal: 300,
    slow: 500,
    veryFast: 150,
    verySlow: 800
}

// Spring configurations
export const springConfigs = {
    gentle: {
        damping: 15,
        stiffness: 120,
    },
    bouncy: {
        damping: 8,
        stiffness: 200,
    },
    snappy: {
        damping: 20,
        stiffness: 300,
    },
    wobbly: {
        damping: 6,
        stiffness: 100,
    }
}

// Easing curves
export const easings = {
    easeOut: Easing.out(Easing.quad),
    easeIn: Easing.in(Easing.quad),
    easeInOut: Easing.inOut(Easing.quad),
    elastic: Easing.elastic(1.5),
    bounce: Easing.bounce,
    linear: Easing.linear
}

// Common animation presets for entering
export const enterAnimations = {
    slideInLeft: {
        duration: animationDurations.normal,
        springify: true,
        damping: springConfigs.gentle.damping
    },
    slideInRight: {
        duration: animationDurations.normal,
        springify: true,
        damping: springConfigs.gentle.damping
    },
    slideInUp: {
        duration: animationDurations.slow,
        springify: true,
        damping: springConfigs.bouncy.damping
    },
    fadeIn: {
        duration: animationDurations.normal,
        easing: easings.easeOut
    },
    scaleIn: {
        duration: animationDurations.fast,
        springify: true,
        damping: springConfigs.snappy.damping
    }
}

// Stagger delays for list animations
export const staggerDelays = {
    list: 100, // 100ms between each item
    grid: 150, // 150ms between each item
    fast: 50,  // 50ms between each item
    slow: 200  // 200ms between each item
}

// Helper function to calculate staggered delay
export const getStaggerDelay = (index: number, baseDelay: number = staggerDelays.list): number => {
    return index * baseDelay
}

// Helper function to create gradient color arrays that satisfy TypeScript
export const createGradient = (colors: string[]): readonly [string, string, ...string[]] => {
    if (colors.length < 2) {
        throw new Error('Gradient requires at least 2 colors')
    }
    return colors as unknown as readonly [string, string, ...string[]]
}

// Animation sequences for complex effects
export const animationSequences = {
    bounce: {
        scale: [1, 1.2, 0.9, 1],
        durations: [100, 150, 100]
    },
    pulse: {
        scale: [1, 1.1, 1],
        durations: [200, 200]
    },
    shake: {
        translateX: [0, -10, 10, -5, 5, 0],
        durations: [100, 100, 100, 100, 100]
    }
}

/**
 * Utility for safely combining styles with conditional logic
 * Filters out falsy values and ensures proper typing
 */
export const combineStyles = <T extends ViewStyle | TextStyle | ImageStyle>(
    ...styles: Array<T | undefined | false | null>
): T[] => {
    return styles.filter((style): style is T => Boolean(style))
}

/**
 * Type-safe style array builder
 * Use this instead of direct array filtering for better type safety
 */
export const styleArray = <T extends ViewStyle | TextStyle | ImageStyle>(
    baseStyles: T[],
    ...conditionalStyles: Array<T | undefined | false | null>
): T[] => {
    return [...baseStyles, ...combineStyles(...conditionalStyles)]
}

/**
 * Animation spring configurations
 * Optimized for 60fps performance
 */
export const animations = {
    // Spring configurations
    spring: {
        gentle: {
            damping: 20,
            stiffness: 300,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001
        },
        bouncy: {
            damping: 15,
            stiffness: 400,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001
        },
        snappy: {
            damping: 25,
            stiffness: 500,
            restSpeedThreshold: 0.001,
            restDisplacementThreshold: 0.001
        }
    },

    // Duration presets
    duration: {
        quick: 200,
        normal: 300,
        slow: 500,
        slower: 800
    },

    // Easing curves
    easing: {
        easeOut: Easing.out(Easing.cubic),
        easeIn: Easing.in(Easing.cubic),
        easeInOut: Easing.inOut(Easing.cubic),
        bounce: Easing.bounce,
        elastic: Easing.elastic(1.5)
    }
}

/**
 * Stagger delay calculation
 */
export const staggerDelay = (index: number, baseDelay: number = 100): number => {
    return index * baseDelay
}

/**
 * Predefined entrance animations
 */
export const entranceAnimations = {
    fadeIn: {
        opacity: [0, 1],
        duration: animations.duration.normal
    },
    slideInRight: {
        translateX: [50, 0],
        opacity: [0, 1],
        duration: animations.duration.normal
    },
    slideInLeft: {
        translateX: [-50, 0],
        opacity: [0, 1],
        duration: animations.duration.normal
    },
    slideInUp: {
        translateY: [50, 0],
        opacity: [0, 1],
        duration: animations.duration.normal
    },
    scaleIn: {
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: animations.duration.normal
    }
}

/**
 * Type-safe gradient color array builder
 */
export const gradientColors = (colors: string[]): readonly [string, string, ...string[]] => {
    if (colors.length < 2) {
        throw new Error('Gradient requires at least 2 colors')
    }
    return colors as unknown as readonly [string, string, ...string[]]
} 