import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import { Clock } from 'lucide-react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { styles } from './AgentTags.styles'
import { colors } from '@/src/constants/colors'

interface TimePickerTagProps {
  onConfirm: (time: string) => void
}

export const TimePickerTag: React.FC<TimePickerTagProps> = ({ onConfirm }) => {
  const [selectedTime, setSelectedTime] = useState<Date>(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const handleTimeChange = (event: any, time?: Date) => {
    // Don't close picker on value change, only update the time
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
        style={[
          styles.taskDateButton,
          showPicker && { backgroundColor: colors.button.primary + '20' }
        ]}
        onPress={() => setShowPicker(!showPicker)}
      >
        <Text style={styles.taskDateText}>{formatTime(selectedTime)}</Text>
        <Clock size={16} color={colors.text.muted} />
      </TouchableOpacity>

      {showPicker && Platform.OS !== 'web' && (
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={selectedTime}
            mode='time'
            display='default'
            onChange={handleTimeChange}
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
        <Text style={styles.confirmButtonText}>Confirm Time</Text>
      </TouchableOpacity>
    </View>
  )
}
