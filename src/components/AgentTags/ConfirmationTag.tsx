import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './AgentTags.styles'

interface ConfirmationTagProps {
  onConfirm: (action: string) => void
}

export const ConfirmationTag: React.FC<ConfirmationTagProps> = ({ onConfirm }) => {
  return (
    <View style={styles.confirmationContainer}>
      <TouchableOpacity
        style={[styles.confirmButton, styles.proceedButton]}
        onPress={() => onConfirm('Yes')}
      >
        <Text style={styles.confirmButtonText}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.confirmButton, styles.tryElseButton]}
        onPress={() => onConfirm('Something Else')}
      >
        <Text style={styles.confirmButtonText}>Something Else</Text>
      </TouchableOpacity>
    </View>
  )
}