import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { useGoals } from '@/src/stores'
import { colors } from '@/src/constants/colors'

interface GoalNamesScrollerProps {
  onSelect: (goalName: string) => void
}

export const GoalNamesScroller: React.FC<GoalNamesScrollerProps> = ({
  onSelect
}) => {
  const goals = useGoals()

  if (!goals.length) return null

  return (
    <FlatList
      data={goals}
      horizontal
      keyExtractor={item => item.id}
      style={{ marginTop: 8, marginBottom: 4 }}
      contentContainerStyle={{ gap: 8, paddingHorizontal: 4 }}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          key={index}
          style={{
            backgroundColor: colors.button.primary,
            borderRadius: 16,
            paddingVertical: 8,
            paddingHorizontal: 16,
            marginRight: 4
          }}
          onPress={() => onSelect(item.title)}
        >
          <Text style={{ color: colors.text.primary, fontWeight: '600' }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
    />
  )
}
