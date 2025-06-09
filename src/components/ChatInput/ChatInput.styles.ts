import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },

    carouselContainer: {
        position: 'absolute',
        bottom: 85, // Increased from 80 to 85 for slightly more spacing
        left: 0,
        right: 0,
        zIndex: 10,
        overflow: 'hidden',
    },

    helpButtonContainer: {
        position: 'absolute',
        bottom: 95, // Base position above input
        right: 16,
        zIndex: 20,
    },

    helpButtonContainerWithCarousel: {
        bottom: 160, // Reduced from 175 to 160 for less spacing
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 12, // Reduced from 16 to 12
        paddingVertical: 8, // Reduced from 12 to 8
        paddingBottom: 12, // Reduced from 16 to 12
        backgroundColor: colors.background.container,
        borderTopWidth: 1,
        borderTopColor: 'rgba(177, 181, 201, 0.1)',
    },

    toggleButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.background.card,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        alignSelf: 'flex-end',
        marginBottom: 2,
    },

    toggleButtonActive: {
        backgroundColor: colors.button.primary,
    },

    helpButton: {
        width: 42, // Reduced from 48 to 42
        height: 42, // Reduced from 48 to 42
        borderRadius: 21, // Adjusted for new size
        backgroundColor: '#F9A826', // Gold color
        justifyContent: 'center',
        alignItems: 'center',
        // Add prominent shadow for floating effect
        shadowColor: '#F9A826',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
    },

    inputWrapper: {
        flex: 1,
        backgroundColor: colors.background.card,
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginRight: 8,
        minHeight: 48,
        maxHeight: 120,
        justifyContent: 'center',
    },

    textInput: {
        color: colors.text.primary,
        fontSize: fonts.sizes.md,
        lineHeight: 20,
        textAlignVertical: 'center',
    },

    sendButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.button.primary,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginBottom: 2,
    },

    sendButtonDisabled: {
        backgroundColor: colors.background.card,
    },

    micButton: {
        backgroundColor: colors.background.card,
    },

    micButtonRecording: {
        backgroundColor: colors.status.error,
    },
});