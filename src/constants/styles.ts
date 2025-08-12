import { ViewStyle } from 'react-native'
import { colors } from './colors'

export const globalStyles = {
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
        // paddingTop: 48,
        // paddingBottom: '20%'
    } as ViewStyle
}

export const itemCardStyle = {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    position: 'relative',
} as ViewStyle