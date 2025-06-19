import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { styles } from './AgentTags.styles'

interface TimePickerTagProps {
  onConfirm: (time: string) => void
}

export const TimePickerTag: React.FC<TimePickerTagProps> = ({ onConfirm }) => {
  const [selectedTime, setSelectedTime] = useState<Date>(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const handleTimeChange = (event: any, time?: Date) => {
    setShowPicker(Platform.OS === 'ios')
    if (time) {
      setSelectedTime(time)
    }
  }

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const handleConfirm = () => {
    onConfirm(formatTime(selectedTime))
  }

  return (
    <View style={styles.timePickerContainer}>
      <TouchableOpacity
        style={styles.timePickerButton}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.timePickerText}>
          {formatTime(selectedTime)}
        </Text>
      </TouchableOpacity>
      
      {showPicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
      
      <TouchableOpacity
        style={[styles.confirmButton, styles.proceedButton, { marginTop: 12 }]}
        onPress={handleConfirm}
      >
        <Text style={styles.confirmButtonText}>Confirm Time</Text>
      </TouchableOpacity>
    </View>
  )
}