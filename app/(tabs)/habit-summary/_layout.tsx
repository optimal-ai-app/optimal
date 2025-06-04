import { Stack } from 'expo-router';

export default function HabitSummaryLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Habit Summary',
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="goals" 
        options={{ 
          title: 'Goals',
          presentation: 'modal'
        }} 
      />
      <Stack.Screen 
        name="goal-details" 
        options={{ 
          title: 'Goal Details',
          presentation: 'modal'
        }} 
      />
    </Stack>
  );
}