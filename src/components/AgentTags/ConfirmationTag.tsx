import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './AgentTags.styles'

interface ConfirmationTagProps {
  onConfirm: (action: string) => void
  data: {
    options: string[]
  }
}

export const ConfirmationTag: React.FC<ConfirmationTagProps> = ({
  onConfirm,
  data
}) => {
  return (
    <View style={styles.confirmationContainer}>
      {data.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.confirmButton, styles.proceedButton]}
          onPress={() => onConfirm(option)}
        >
          <Text style={styles.confirmButtonText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
