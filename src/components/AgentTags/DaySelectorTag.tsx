import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './AgentTags.styles'

interface DaySelectorTagProps {
  onConfirm: (days: string) => void
}

const DAYS_OF_WEEK = [
  { key: 'mon', label: 'M', full: 'Monday' },
  { key: 'tue', label: 'T', full: 'Tuesday' },
  { key: 'wed', label: 'W', full: 'Wednesday' },
  { key: 'thu', label: 'T', full: 'Thursday' },
  { key: 'fri', label: 'F', full: 'Friday' },
  { key: 'sat', label: 'S', full: 'Saturday' },
  { key: 'sun', label: 'S', full: 'Sunday' }
]

export const DaySelectorTag: React.FC<DaySelectorTagProps> = ({
  onConfirm
}) => {
  const [selectedDays, setSelectedDays] = useState<string[]>([])

  const toggleDay = (dayKey: string) => {
    setSelectedDays(prev =>
      prev.includes(dayKey) ? prev.filter(d => d !== dayKey) : [...prev, dayKey]
    )
  }

  const handleConfirm = () => {
    const selectedDayNames = selectedDays
      .map(dayKey => DAYS_OF_WEEK.find(day => day.key === dayKey)?.full)
      .filter(Boolean)

    onConfirm(selectedDayNames.join(', '))
  }

  return (
    <View style={styles.daySelectorContainer}>
      <Text style={styles.daySelectorTitle}>Select Days</Text>

      <View style={styles.daysGrid}>
        {DAYS_OF_WEEK.map(day => (
          <TouchableOpacity
            key={day.key}
            style={[
              styles.dayButton,
              selectedDays.includes(day.key) && styles.dayButtonSelected
            ]}
            onPress={() => toggleDay(day.key)}
          >
            <Text
              style={[
                styles.dayButtonText,
                selectedDays.includes(day.key) && styles.dayButtonTextSelected
              ]}
            >
              {day.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.confirmButton,
          styles.proceedButton,
          {
            marginTop: 16
          }
        ]}
        onPress={handleConfirm}
      >
        <Text style={styles.confirmButtonText}>
          Confirm Days ({selectedDays.length})
        </Text>
      </TouchableOpacity>
    </View>
  )
}
