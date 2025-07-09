import { colors } from "@/src/constants/colors";
import { fonts } from "@/src/constants/fonts";
import { ViewStyle, TextStyle, StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
    taskItem: {
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

    lastTaskItem: {
        marginBottom: 0,
    } as ViewStyle,

    overdueTask: {
        borderColor: 'rgba(239, 68, 68, 0.5)',
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
    } as ViewStyle,

    checkbox: {
        marginRight: 16,
        padding: 6,
        borderRadius: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    taskContent: {
        flex: 1,
        paddingRight: 8,
    } as ViewStyle,

    taskTitle: {
        fontSize: fonts.sizes.md,
        fontWeight: '600',
        color: '#F3F4F6',
        marginBottom: 6,
        letterSpacing: 0.2,
    } as TextStyle,

    completedTitle: {
        textDecorationLine: 'line-through',
        color: '#9CA3AF',
        opacity: 0.6,
    } as TextStyle,

    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    } as ViewStyle,

    priorityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
    } as ViewStyle,

    priorityText: {
        fontSize: fonts.sizes.xs,
        fontWeight: '600',
        marginLeft: 4,
        letterSpacing: 0.3,
    } as TextStyle,

    dueDateBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(75, 85, 99, 0.3)',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        gap: 4,
    } as ViewStyle,

    overdueBadge: {
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
    } as ViewStyle,

    dueDateText: {
        fontSize: fonts.sizes.xs,
        color: '#E5E7EB',
        marginLeft: 2,
        fontWeight: '600',
        letterSpacing: 0.3,
    } as TextStyle,

    overdueText: {
        color: '#FCA5A5',
    } as TextStyle,

    moreButton: {
        padding: 6,
        marginLeft: 4,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
    } as ViewStyle,

    titleContainer: {
        marginBottom: 4,
        // alignItems: 'flex-start',
    } as ViewStyle,

    goalBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginTop: 4,
    } as ViewStyle,

    goalText: {
        fontSize: fonts.sizes.xs,
        color: colors.button.primary,
        fontWeight: '500',
        marginLeft: 4,
    } as TextStyle,
});