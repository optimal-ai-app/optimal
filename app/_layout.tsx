import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useFrameworkReady } from '@/hooks/useFrameworkReady'
import { AuthProvider } from '@/src/context/AuthContext'

export default function RootLayout () {
  useFrameworkReady()

  return (
    <AuthProvider>
      <StatusBar style='light' />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 300
        }}
      >
        <Stack.Screen
          name='(auth)'
          options={{
            animation: 'fade',
            animationDuration: 400
          }}
        />
        <Stack.Screen
          name='(tabs)'
          options={{
            animation: 'slide_from_bottom',
            animationDuration: 500
          }}
        />
        <Stack.Screen
          name='+not-found'
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
            animationDuration: 300
          }}
        />
      </Stack>
    </AuthProvider>
  )
}
