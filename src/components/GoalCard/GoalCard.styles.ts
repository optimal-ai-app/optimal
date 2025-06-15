import { colors } from "@/src/constants/colors";
import { fonts } from "@/src/constants/fonts";
import { ViewStyle, TextStyle, StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
    goalPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1F2937', // Darker, richer background
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 10,
        position: 'relative',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 3,
            },
        }),
    } as ViewStyle,

    cardContent: {
        flex: 1,
    } as ViewStyle,

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    } as ViewStyle,

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 12,
    } as ViewStyle,

    titleIcon: {
        marginRight: 8,
    } as ViewStyle,

    goalTitle: {
        fontSize: fonts.sizes.lg,
        fontWeight: '600',
        color: colors.text.primary,
        flex: 1,
    } as TextStyle,

    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    } as ViewStyle,

    statusText: {
        fontSize: fonts.sizes.xs,
        fontWeight: '500',
        color: '#FFFFFF',
    } as TextStyle,

    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    } as ViewStyle,

    progressContainer: {
        flex: 1,
        marginRight: 16,
    } as ViewStyle,

    progressBar: {
        height: 6,
        backgroundColor: colors.utility.divider,
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: 4,
    } as ViewStyle,

    progressFill: {
        height: '100%',
        borderRadius: 3,
    } as ViewStyle,

    progressText: {
        fontSize: fonts.sizes.sm,
        color: colors.text.secondary,
        fontWeight: '500',
    } as TextStyle,

    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    } as ViewStyle,

    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    } as ViewStyle,

    statText: {
        fontSize: fonts.sizes.sm,
        fontWeight: '600',
        color: colors.background?.primary,
        marginLeft: 4,
    } as TextStyle,

    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    } as ViewStyle,

    dueDateText: {
        fontSize: fonts.sizes.sm,
        color: colors.text.secondary,
        fontWeight: '500',
    } as TextStyle,
});