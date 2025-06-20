import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },

    containerDisabled: {
        opacity: 0.6,
    },

    carouselContainer: {
        position: 'absolute',
        bottom: 85,
        left: 0,
        right: 0,
        zIndex: 10,
        overflow: 'hidden',
    },

    helpButtonContainer: {
        position: 'absolute',
        bottom: 95,
        right: 16,
        zIndex: 20,
    },

    helpButtonContainerWithCarousel: {
        bottom: 160,
    },

    helpButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#F9A826',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#F9A826',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
    },

    helpButtonDisabled: {
        backgroundColor: colors.background.container,
        shadowOpacity: 0,
        elevation: 0,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 12,
        paddingVertical: 8,
        paddingBottom: 12,
        backgroundColor: colors.background.container,
        borderTopWidth: 1,
        borderTopColor: 'rgba(177, 181, 201, 0.1)',
    },

    inputContainerDisabled: {
        backgroundColor: colors.background.primary,
        borderTopColor: 'rgba(177, 181, 201, 0.05)',
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

    toggleButtonDisabled: {
        backgroundColor: colors.background.container,
        opacity: 0.5,
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

    inputWrapperDisabled: {
        backgroundColor: colors.background.container,
    },

    textInput: {
        color: colors.text.primary,
        fontSize: fonts.sizes.md,
        lineHeight: 20,
        textAlignVertical: 'center',
    },

    textInputDisabled: {
        color: colors.text.muted,
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
        backgroundColor: colors.background.container,
        opacity: 0.5,
    },

    micButton: {
        backgroundColor: colors.background.card,
    },

    micButtonRecording: {
        backgroundColor: colors.status.error,
    },
});