import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform
} from 'react-native'
import { useRouter } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'

import { styles } from './Header.styles'
import { colors } from '@/src/constants/colors'

interface HeaderProps {
  title: string
  showBackButton?: boolean
  rightAction?: React.ReactNode
  transparent?: boolean
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  rightAction,
  transparent = false
}) => {
  const router = useRouter()

  return (
    <SafeAreaView
      style={[styles.safeArea, transparent && styles.safeAreaTransparent]}
    >
      <View style={[styles.header, transparent && styles.headerTransparent]}>
        <View style={styles.leftContainer}>
          {showBackButton && (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
              accessibilityRole='button'
              accessibilityLabel='Go back'
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <ChevronLeft color={colors.text.primary} size={24} />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.title} numberOfLines={1} accessibilityRole='header'>
          {title}
        </Text>

        <View style={styles.rightContainer}>
          {rightAction || <View style={styles.placeholder} />}
        </View>
      </View>
    </SafeAreaView>
  )
}
