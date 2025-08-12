import { StyleSheet } from 'react-native';
import { colors } from '../../../constants/colors';
import { fonts } from '../../../constants/fonts';

export const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        backgroundColor: 'transparent',
    },

    scrollView: {
        paddingHorizontal: 16,
    },

    carouselContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16,
    },

    optionButton: {
        backgroundColor: colors.background.card,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 12,
        minWidth: 120,
        alignItems: 'center',
        justifyContent: 'center',
        // Add subtle shadow for floating effect
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    optionText: {
        fontSize: fonts.sizes.sm,
        color: colors.text.secondary,
        fontWeight: '500', // Changed from fonts.weights.medium to '500'
        textAlign: 'center',
        lineHeight: 18,
    },
});