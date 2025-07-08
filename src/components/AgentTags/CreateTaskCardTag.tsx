import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Switch,
  Platform,
  Keyboard
} from 'react-native'
import { Calendar, Clock, Flag, Repeat, Send } from 'lucide-react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Animated, { FadeInDown } from 'react-native-reanimated'

import { colors } from '@/src/constants/colors'
import { fonts } from '@/src/constants/fonts'
import { styles } from './AgentTags.styles'
import { useAddTask } from '../../stores'
import { useUserId } from '../../stores/userStore'
import { Task } from '../../stores/types'

export interface TaskData {
  taskType?: string
  taskDescription?: string
  priority?: string // '!', '!!', '!!!'
  repeatDays?: string[] // ['M','T','W','TH','F','S','SU']
  repeatEndDate?: string // DateTime 12-hour time string
  goalId?: string // Add goalId support
}

interface CreateTaskCardTagProps {
  taskData?: TaskData
  onConfirm: (message: string) => void
}

export const CreateTaskCardTag: React.FC<CreateTaskCardTagProps> = ({
  taskData,
  onConfirm
}) => {
  const addTask = useAddTask()
  const userId = useUserId()

  // Form state
  const [title, setTitle] = useState(taskData?.taskType || '')
  const [description, setDescription] = useState(
    taskData?.taskDescription || ''
  )
  const [priority, setPriority] = useState(taskData?.priority || '!!')
  const [dueDate, setDueDate] = useState<Date | null>(null)
  const [dueTime, setDueTime] = useState('')
  const [isRepeating, setIsRepeating] = useState(false)
  const [repeatEndDate, setRepeatEndDate] = useState<Date | null>(null)
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [goalId, setGoalId] = useState<string | null>(taskData?.goalId || null)

  // UI state
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [showRepeatEndDatePicker, setShowRepeatEndDatePicker] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  // Initialize repeat data from LLM
  useEffect(() => {
    if (taskData?.repeatDays && taskData.repeatDays.length > 0) {
      setIsRepeating(true)
      // Convert LLM format ['M','T','W','TH','F','S','SU'] to internal format
      const dayMapping: { [key: string]: string } = {
        M: 'mon',
        T: 'tue',
        W: 'wed',
        TH: 'thu',
        F: 'fri',
        S: 'sat',
        SU: 'sun'
      }
      const mappedDays = taskData.repeatDays
        .map(day => dayMapping[day])
        .filter(Boolean)
      setSelectedDays(mappedDays)
    }

    if (taskData?.repeatEndDate) {
      // Parse the DateTime string to Date object
      try {
        const endDate = new Date(taskData.repeatEndDate)
        if (!isNaN(endDate.getTime())) {
          setRepeatEndDate(endDate)
        }
      } catch (error) {
        console.warn('Failed to parse repeatEndDate:', error)
      }
    }
  }, [taskData])

  const daysOfWeek = [
    { key: 'mon', label: 'M', full: 'Monday' },
    { key: 'tue', label: 'T', full: 'Tuesday' },
    { key: 'wed', label: 'W', full: 'Wednesday' },
    { key: 'thu', label: 'T', full: 'Thursday' },
    { key: 'fri', label: 'F', full: 'Friday' },
    { key: 'sat', label: 'S', full: 'Saturday' },
    { key: 'sun', label: 'S', full: 'Sunday' }
  ]

  const priorityOptions = [
    { value: '!', label: 'Low', color: colors.status.warning },
    { value: '!!', label: 'Medium', color: colors.status.info },
    { value: '!!!', label: 'High', color: colors.status.error }
  ]

  const isFormValid =
    title.trim() &&
    description.trim() &&
    dueTime &&
    (isRepeating ? repeatEndDate && selectedDays.length > 0 : dueDate)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (time: string) => {
    if (!time) return ''
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const handleDateChange = (event: any, selectedDate?: Date) => {
    // Don't close picker on value change, only update the date
    if (selectedDate) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate >= today) {
        setDueDate(selectedDate)
      }
    }
  }

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    // Don't close picker on value change, only update the time
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, '0')
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0')
      setDueTime(`${hours}:${minutes}`)
    }
  }

  const handleRepeatEndDateChange = (event: any, selectedDate?: Date) => {
    // Don't close picker on value change, only update the date
    if (selectedDate) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate >= today) {
        setRepeatEndDate(selectedDate)
      }
    }
  }

  const toggleDay = (dayKey: string) => {
    setSelectedDays(prev =>
      prev.includes(dayKey) ? prev.filter(d => d !== dayKey) : [...prev, dayKey]
    )
  }

  // Convert internal day format to backend expected format
  const convertDaysToBackendFormat = (days: string[]): string[] => {
    const dayMapping: { [key: string]: string } = {
      mon: 'M',
      tue: 'T',
      wed: 'W',
      thu: 'TH',
      fri: 'F',
      sat: 'S',
      sun: 'SU'
    }
    return days.map(day => dayMapping[day]).filter(Boolean)
  }

  const createTaskObject = (): Task => {
    const [hours, minutes] = dueTime.split(':')

    // For repeating tasks, use today's date; for one-time tasks, use the selected date
    const dateToUse = isRepeating ? new Date() : dueDate!
    const combinedDate = new Date(dateToUse)
    combinedDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)

    return {
      id: '',
      title: title.trim(),
      description: description.trim(),
      createdAt: new Date(),
      completionDate: null,
      priority: priority as '!!' | '!' | '!!!',
      dueDate: combinedDate,
      status: 'todo',
      goalId: goalId || undefined
    }
  }

  const handleCreateTask = async () => {
    if (!isFormValid || !userId) return

    setIsCreating(true)
    try {
      const taskData = createTaskObject()

      // Prepare repeat parameters if needed
      const repeatEndDateParam =
        isRepeating && repeatEndDate ? repeatEndDate : undefined
      const repeatDaysParam =
        isRepeating && selectedDays.length > 0
          ? convertDaysToBackendFormat(selectedDays)
          : undefined

      await addTask(taskData, userId, repeatEndDateParam, repeatDaysParam)

      let successMessage = `✅ Task "${title}" created successfully!`

      if (isRepeating && repeatEndDate && selectedDays.length > 0) {
        const dayNames = selectedDays
          .map(day => {
            const dayObj = daysOfWeek.find(d => d.key === day)
            return dayObj?.full || day
          })
          .join(', ')
        successMessage += ` (Repeating on ${dayNames} until ${formatDate(
          repeatEndDate
        )})`
      }

      onConfirm(successMessage)
    } catch (error) {
      console.error('Failed to create task:', error)
      onConfirm('❌ Failed to create task. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  const handleKeyPress = (e: any) => {
    // Prevent keyboard events from bubbling to parent chat interface
    e.stopPropagation?.()
  }

  return (
    <Animated.View
      entering={FadeInDown.duration(400)}
      style={[styles.taskCardContainer]}
      onStartShouldSetResponder={() => false}
      onMoveShouldSetResponder={() => false}
    >
      <View style={styles.taskCardHeader}>
        <Text style={styles.taskCardTitle}>Create Task</Text>
      </View>

      <ScrollView
        style={styles.taskCardContent}
        showsVerticalScrollIndicator={true}
      >
        {/* Title */}
        <View style={styles.taskField}>
          <Text style={styles.taskFieldLabel}>Title</Text>
          <TextInput
            style={styles.taskInput}
            value={title}
            onChangeText={setTitle}
            placeholder='Task title...'
            placeholderTextColor={colors.text.muted}
            maxLength={100}
            returnKeyType='done'
            blurOnSubmit={true}
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
            onKeyPress={handleKeyPress}
          />
        </View>

        {/* Description */}
        <View style={styles.taskField}>
          <Text style={styles.taskFieldLabel}>Description</Text>
          <TextInput
            style={[styles.taskInput, styles.taskInputMultiline]}
            value={description}
            onChangeText={setDescription}
            placeholder='Task description...'
            placeholderTextColor={colors.text.muted}
            multiline
            numberOfLines={3}
            maxLength={500}
            returnKeyType='done'
            blurOnSubmit={true}
            textAlignVertical='top'
            onSubmitEditing={() => {
              Keyboard.dismiss()
            }}
            onKeyPress={handleKeyPress}
          />
        </View>

        {/* Priority */}
        <View style={styles.taskField}>
          <Text style={styles.taskFieldLabel}>Priority</Text>
          <View style={styles.priorityContainer}>
            {priorityOptions.map(option => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.priorityButton,
                  priority === option.value && { backgroundColor: option.color }
                ]}
                onPress={() => setPriority(option.value)}
              >
                <Text
                  style={[
                    styles.priorityButtonText,
                    priority === option.value && { color: colors.text.primary }
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Date & Time */}
        <View style={styles.taskFieldRow}>
          <View style={styles.taskField}>
            <Text style={styles.taskFieldLabel}>Schedule Time</Text>
            <View style={[styles.taskDateView]}>
              <DateTimePicker
                value={dueTime ? new Date(`2000-01-01T${dueTime}`) : new Date()}
                mode='time'
                display='default'
                onChange={handleTimeChange}
              />
              <Clock size={16} color={colors.text.muted} />
            </View>
          </View>
          <View style={styles.taskField}>
            {!isRepeating && (
              <>
                <Text style={styles.taskFieldLabel}>Due Date</Text>
                <View style={[styles.taskDateView]}>
                  <DateTimePicker
                    value={dueDate || new Date()}
                    mode='date'
                    display='default'
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                  />
                  <Calendar size={16} color={colors.text.muted} />
                </View>
              </>
            )}
          </View>
        </View>

        {/* Repeating Task Toggle */}
        <View style={styles.taskField}>
          <View style={styles.taskRepeatHeader}>
            <View style={styles.taskRepeatToggle}>
              <Repeat size={16} color={colors.button.secondary} />
              <Text style={styles.taskFieldLabel}>Repeating Task</Text>
              <Switch
                value={isRepeating}
                onValueChange={setIsRepeating}
                trackColor={{
                  false: colors.background.container,
                  true: colors.button.primary
                }}
                thumbColor={colors.text.primary}
              />
            </View>
          </View>

          {/* Repeat Options */}
          {isRepeating && (
            <View style={styles.taskRepeatOptions}>
              <View style={styles.taskField}>
                <Text style={styles.taskFieldLabel}>Repeat End Date</Text>
                <View style={[styles.taskDateView]}>
                  <DateTimePicker
                    value={repeatEndDate || new Date()}
                    mode='date'
                    display='default'
                    onChange={handleRepeatEndDateChange}
                    minimumDate={new Date()}
                  />
                  <Calendar size={16} color={colors.text.muted} />
                </View>
              </View>

              <View style={styles.taskField}>
                <Text style={styles.taskFieldLabel}>Days</Text>
                <View style={styles.daysGrid}>
                  {daysOfWeek.map(day => (
                    <TouchableOpacity
                      key={day.key}
                      style={[
                        styles.dayButton,
                        selectedDays.includes(day.key) &&
                          styles.dayButtonSelected
                      ]}
                      onPress={() => toggleDay(day.key)}
                    >
                      <Text
                        style={[
                          styles.dayButtonText,
                          selectedDays.includes(day.key) &&
                            styles.dayButtonTextSelected
                        ]}
                      >
                        {day.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.taskCardFooter}>
        <TouchableOpacity
          style={[
            styles.taskSubmitButton,
            (!isFormValid || isCreating) && styles.taskSubmitButtonDisabled
          ]}
          onPress={handleCreateTask}
          disabled={!isFormValid || isCreating}
        >
          <Send size={16} color={colors.text.primary} />
          <Text style={styles.taskSubmitButtonText}>
            {isCreating ? 'Creating...' : 'Create Task'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Date Pickers */}
    </Animated.View>
  )
}
