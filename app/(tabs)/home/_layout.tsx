import { colors } from '@/src/constants/colors'
import { router, Stack } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'

export default function HomeLayout () {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right',
        animationDuration: 350
      }}
    >
      <Stack.Screen
        name='goals'
        options={{
          title: 'Goals',
          presentation: 'modal',
          headerShown: false,
          animation: 'slide_from_bottom',
          animationDuration: 400,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft size={24} color={colors.text.primary} />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen
        name='goal-details'
        options={{
          title: 'Goal Details',
          presentation: 'modal',
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 300
        }}
      />
      <Stack.Screen
        name='create-goal'
        options={{
          title: 'Create Goal',
          presentation: 'modal',
          headerShown: false,
          animation: 'slide_from_bottom',
          animationDuration: 500
        }}
      />
      <Stack.Screen
        name='create-task'
        options={{
          title: 'Create Task',
          presentation: 'modal',
          headerShown: false,
          animation: 'slide_from_bottom',
          animationDuration: 500
        }}
      />
    </Stack>
  )
}
