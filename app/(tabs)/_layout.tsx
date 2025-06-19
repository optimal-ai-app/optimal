import React from 'react'
import { View, Platform, SafeAreaView } from 'react-native'
import { Tabs } from 'expo-router'
import { BlurView } from 'expo-blur'
import Animated, { FadeIn } from 'react-native-reanimated'
import {
  Chrome as Home,
  MessageSquare,
  ChartBar as BarChart,
  Settings,
  Plus,
  HomeIcon,
  Globe,
  Trophy
} from 'lucide-react-native'

import { colors } from '@/src/constants/colors'

export default function TabsLayout () {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor:
            Platform.OS === 'ios' ? 'transparent' : colors.background.container,
          borderTopColor: 'rgba(177, 181, 201, 0.1)',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 90 : 65,
          paddingTop: 8,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          shadowColor: colors.utility.shadow,
          shadowOffset: {
            width: 0,
            height: -2
          },
          shadowOpacity: 0.1,
          shadowRadius: 8
        },
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView
              intensity={95}
              style={{
                flex: 1,
                backgroundColor: colors.background.container + '95'
              }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: colors.background.container
              }}
            />
          ),
        tabBarActiveTintColor: colors.button.primary,
        tabBarInactiveTintColor: colors.text.muted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2
        },
        tabBarIconStyle: {
          marginTop: 2
        },
        // Add smooth animations
        lazy: false,
        // Custom transition animations
        tabBarItemStyle: {
          paddingVertical: 4
        }
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Optimal',
          tabBarIcon: ({ color, size, focused }) => (
            <Animated.View
              entering={focused ? FadeIn.duration(300) : undefined}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }]
              }}
            >
              <Trophy
                color={color}
                size={focused ? size + 2 : size}
                strokeWidth={focused ? 2.5 : 2}
              />
            </Animated.View>
          )
        }}
      />
      <Tabs.Screen
        name='agent'
        options={{
          title: 'Agent',
          tabBarIcon: ({ color, size, focused }) => (
            <Animated.View
              entering={focused ? FadeIn.duration(300) : undefined}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }]
              }}
            >
              <MessageSquare
                color={color}
                size={focused ? size + 2 : size}
                strokeWidth={focused ? 2.5 : 2}
              />
            </Animated.View>
          )
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size, focused }) => (
            <Animated.View
              entering={focused ? FadeIn.duration(300) : undefined}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }]
              }}
            >
              <Settings
                color={color}
                size={focused ? size + 2 : size}
                strokeWidth={focused ? 2.5 : 2}
              />
            </Animated.View>
          )
        }}
      />
      <Tabs.Screen
        name='chatbot-settings'
        options={{
          href: null // Hide this tab from the tab bar
        }}
      />
      <Tabs.Screen
        name='home'
        options={{
          href: null // Hide this tab from the tab bar
        }}
      />
      <Tabs.Screen
        name='tasks'
        options={{
          href: null // Hide this tab from the tab bar
        }}
      />
    </Tabs>
  )
}
