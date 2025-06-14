import { colors } from '@/src/constants/colors'
import { router, Stack } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { TouchableOpacity } from 'react-native'

export default function HomeLayout () {
  return (
    <Stack>
      <Stack.Screen
        name='goals'
        options={{
          title: 'Goals',
          presentation: 'modal',
          headerShown: false,
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
          headerShown: false
        }}
      />
      <Stack.Screen
        name='create-goal'
        options={{
          title: 'Create Goal',
          presentation: 'modal',
          headerShown: false
        }}
      />
      <Stack.Screen
        name='create-task'
        options={{
          title: 'Create Task',
          presentation: 'modal',
          headerShown: false
        }}
      />
    </Stack>
  )
}
