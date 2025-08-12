import { colors } from "@/src/constants/colors";
import { fonts } from "@/src/constants/fonts";
import { ViewStyle, TextStyle, StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
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

    // Dropdown menu styles
    moreOptionsContainer: {
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,

    dropdownMenu: {
        position: 'absolute',
        top: 0,
        right: 40,
        backgroundColor: '#374151',
        borderRadius: 12,
        padding: 8,
        minWidth: 120,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        zIndex: 1000,
    } as ViewStyle,

    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        gap: 8,
    } as ViewStyle,

    dropdownItemText: {
        fontSize: fonts.sizes.sm,
        color: '#F3F4F6',
        fontWeight: '500',
    } as TextStyle,

    // Delete modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    } as ViewStyle,

    deleteModalContent: {
        backgroundColor: '#1F2937',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 12,
    } as ViewStyle,

    deleteModalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    } as ViewStyle,

    deleteModalTitle: {
        fontSize: fonts.sizes.lg,
        fontWeight: '700',
        color: '#F3F4F6',
        letterSpacing: 0.5,
    } as TextStyle,

    closeButton: {
        padding: 4,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
    } as ViewStyle,

    deleteModalDescription: {
        fontSize: fonts.sizes.md,
        color: '#D1D5DB',
        marginBottom: 24,
        lineHeight: 24,
    } as TextStyle,

    deleteOptionsContainer: {
        gap: 12,
    } as ViewStyle,

    deleteOption: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    } as ViewStyle,

    deleteOptionText: {
        fontSize: fonts.sizes.md,
        color: '#F3F4F6',
        fontWeight: '500',
        textAlign: 'center',
    } as TextStyle,

    cancelOption: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderColor: 'rgba(239, 68, 68, 0.3)',
        marginTop: 8,
    } as ViewStyle,

    cancelOptionText: {
        fontSize: fonts.sizes.md,
        color: '#EF4444',
        fontWeight: '600',
        textAlign: 'center',
    } as TextStyle,
});