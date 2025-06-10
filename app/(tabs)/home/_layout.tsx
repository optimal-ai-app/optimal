import { Stack } from 'expo-router'

export default function HomeLayout () {
  return (
    <Stack>
      <Stack.Screen
        name='goals'
        options={{
          title: 'Goals',
          presentation: 'modal',
          headerShown: false
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
    </Stack>
  )
}
