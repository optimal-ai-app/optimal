import { colors } from "@/src/constants/colors";
import { fonts } from "@/src/constants/fonts";
import { ViewStyle, TextStyle, StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    overdueGoal: {
        borderColor: 'rgba(239, 68, 68, 0.3)',
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
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

    titleIconContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    } as ViewStyle,

    titleIcon: {
        opacity: 0.9,
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

    progressHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    } as ViewStyle,

    progressBar: {
        height: 6,
        backgroundColor: colors.utility.divider,
        borderRadius: 3,
        overflow: 'hidden',
        flexDirection: 'row',
    } as ViewStyle,

    progressFill: {
        height: '100%',
        borderRadius: 3,
    } as ViewStyle,

    progressText: {
        fontSize: fonts.sizes.sm,
        color: colors.text.secondary,
        fontWeight: '500',
        marginLeft: 6,
    } as TextStyle,

    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    } as ViewStyle,

    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    } as ViewStyle,

    statText: {
        fontSize: fonts.sizes.sm,
        fontWeight: '600',
        color: '#F97316',
        marginLeft: 4,
    } as TextStyle,

    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    } as ViewStyle,

    dueDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    } as ViewStyle,

    dueDateText: {
        fontSize: fonts.sizes.sm,
        color: colors.text.secondary,
        fontWeight: '500',
        marginLeft: 6,
    } as TextStyle,

    overdueText: {
        color: colors.status?.error || '#EF4444',
    } as TextStyle,
});