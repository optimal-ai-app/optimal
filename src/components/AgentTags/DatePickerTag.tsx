import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { styles } from './AgentTags.styles'

interface DatePickerTagProps {
  onConfirm: (date: string) => void
}

export const DatePickerTag: React.FC<DatePickerTagProps> = ({ onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const handleDateChange = (event: any, date?: Date) => {
    setShowPicker(Platform.OS === 'ios')
    if (date) {
      setSelectedDate(date)
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleConfirm = () => {
    onConfirm(formatDate(selectedDate))
  }

  return (
    <View style={styles.datePickerContainer}>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowPicker(true)}
      >
        <DateTimePicker
          value={selectedDate}
          mode='date'
          display='default'
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.confirmButton, styles.proceedButton, { marginTop: 12 }]}
        onPress={handleConfirm}
      >
        <Text style={styles.confirmButtonText}>Confirm Date</Text>
      </TouchableOpacity>
    </View>
  )
}
