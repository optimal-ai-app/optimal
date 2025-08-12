import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { Calendar } from 'lucide-react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { styles } from './AgentTags.styles'
import { colors } from '@/src/constants/colors'

interface DatePickerTagProps {
  onConfirm: (date: string) => void
}

export const DatePickerTag: React.FC<DatePickerTagProps> = ({ onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const handleDateChange = (event: any, date?: Date) => {
    // Don't close picker on value change, only update the date
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
        style={[
          styles.taskDateButton,
          showPicker && { backgroundColor: colors.button.primary + '20' }
        ]}
        onPress={() => setShowPicker(!showPicker)}
      >
        <Text style={styles.taskDateText}>{formatDate(selectedDate)}</Text>
        <Calendar size={16} color={colors.text.muted} />
      </TouchableOpacity>

      {showPicker && Platform.OS !== 'web' && (
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={selectedDate}
            mode='date'
            display='default'
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
          <TouchableOpacity
            style={styles.pickerCloseButton}
            onPress={() => setShowPicker(false)}
          >
            <Text style={styles.pickerCloseText}>Done</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={[styles.confirmButton, styles.proceedButton, { marginTop: 12 }]}
        onPress={handleConfirm}
      >
        <Text style={styles.confirmButtonText}>Confirm Date</Text>
      </TouchableOpacity>
    </View>
  )
}
