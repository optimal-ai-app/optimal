import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput,
  Modal,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { 
  Calendar, 
  Clock, 
  ChevronDown, 
  CircleCheck as CheckCircle,
  Flag,
  Repeat
} from 'lucide-react-native';

import { Header } from '../Header';
import { InputField } from '../InputField';
import { styles } from './ManualTaskForm.styles';
import { colors } from '../../constants/colors';

interface Goal {
  id: string;
  title: string;
}

interface ManualTaskFormProps {
  onTaskCreated?: (task: {
    title: string;
    description: string;
    dueDate: Date;
    dueTime: string;
    goalId?: string;
    isRepeating: boolean;
    repeatCount?: number;
    repeatDays?: string[];
  }) => void;
}

export const ManualTaskForm: React.FC<ManualTaskFormProps> = ({
  onTaskCreated,
}) => {
  const router = useRouter();
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [dueTime, setDueTime] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isRepeating, setIsRepeating] = useState(false);
  const [repeatCount, setRepeatCount] = useState('1');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  
  // UI state
  const [isDateFocused, setIsDateFocused] = useState(false);
  const [isTimeFocused, setIsTimeFocused] = useState(false);
  const [showGoalDropdown, setShowGoalDropdown] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdTask, setCreatedTask] = useState<any>(null);

  const webDateInputRef = useRef<TextInput>(null);
  const webTimeInputRef = useRef<TextInput>(null);

  // Mock goals data
  const availableGoals: Goal[] = [
    { id: '1', title: 'Do 30 pushups' },
    { id: '2', title: 'Read for 30 minutes daily' },
    { id: '3', title: 'Meditate for 10 minutes' },
  ];

  const daysOfWeek = [
    { key: 'mon', label: 'M', full: 'Monday' },
    { key: 'tue', label: 'T', full: 'Tuesday' },
    { key: 'wed', label: 'W', full: 'Wednesday' },
    { key: 'thu', label: 'T', full: 'Thursday' },
    { key: 'fri', label: 'F', full: 'Friday' },
    { key: 'sat', label: 'S', full: 'Saturday' },
    { key: 'sun', label: 'S', full: 'Sunday' },
  ];

  const isFormValid = title.trim() && description.trim() && dueDate && dueTime;

  const handleDatePress = () => {
    if (Platform.OS === 'web') {
      webDateInputRef.current?.focus();
    } else {
      // For native platforms, implement date picker modal
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDueDate(tomorrow);
    }
  };

  const handleTimePress = () => {
    if (Platform.OS === 'web') {
      webTimeInputRef.current?.focus();
    } else {
      // For native platforms, implement time picker modal
      setDueTime('09:00');
    }
  };

  const handleWebDateChange = (dateString: string) => {
    if (dateString) {
      const selectedDate = new Date(dateString);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate >= today) {
        setDueDate(selectedDate);
      }
    }
  };

  const handleWebTimeChange = (timeString: string) => {
    if (timeString) {
      setDueTime(timeString);
    }
  };

  const handleGoalSelect = (goal: Goal) => {
    setSelectedGoal(goal);
    setShowGoalDropdown(false);
  };

  const toggleDay = (dayKey: string) => {
    setSelectedDays(prev => 
      prev.includes(dayKey) 
        ? prev.filter(d => d !== dayKey)
        : [...prev, dayKey]
    );
  };

  const handleCreateTask = () => {
    if (!isFormValid) return;

    const task = {
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate!,
      dueTime,
      goalId: selectedGoal?.id,
      isRepeating,
      repeatCount: isRepeating ? parseInt(repeatCount) : undefined,
      repeatDays: isRepeating ? selectedDays : undefined,
    };

    setCreatedTask(task);
    setIsSubmitted(true);
    onTaskCreated?.(task);
  };

  const handleViewTasks = () => {
    router.push('/(tabs)');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (time: string) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (isSubmitted && createdTask) {
    return (
      <View style={styles.container}>
        <Header title="Task Created" showBackButton />
        
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
          <Animated.View
            entering={FadeInDown.duration(600).delay(200)}
            style={styles.successContainer}
          >
            <View style={styles.successIcon}>
              <CheckCircle size={40} color={colors.text.primary} />
            </View>
            
            <Text style={styles.successTitle}>Task Created Successfully!</Text>
            <Text style={styles.successMessage}>
              Your task "{createdTask.title}" has been added to your task list.
              {createdTask.isRepeating && ` It will repeat ${createdTask.repeatCount} times on selected days.`}
            </Text>
            
            <View style={styles.successActions}>
              <TouchableOpacity
                style={styles.successButton}
                onPress={handleViewTasks}
                activeOpacity={0.8}
              >
                <Text style={styles.successButtonText}>View Tasks</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Create Task" showBackButton />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeInDown.duration(500).delay(100)}
          style={styles.header}
        >
          <Text style={styles.title}>Create Your Task</Text>
          <Text style={styles.subtitle}>
            Set up a new task with detailed scheduling and options
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(500).delay(200)}
          style={styles.form}
        >
          <InputField
            label="Task Title"
            value={title}
            onChangeText={setTitle}
            placeholder="e.g., Complete project proposal"
            maxLength={100}
          />

          <View style={styles.textAreaContainer}>
            <InputField
              label="Description"
              value={description}
              onChangeText={setDescription}
              placeholder="Describe what needs to be done..."
              multiline
              numberOfLines={4}
              maxLength={500}
              style={{ minHeight: 120 }}
            />
          </View>

          <View style={styles.dateTimeContainer}>
            <View style={[styles.fieldContainer, styles.dateTimeField]}>
              <Text style={styles.fieldLabel}>Due Date</Text>
              
              {Platform.OS === 'web' ? (
                <TextInput
                  ref={webDateInputRef}
                  type="date"
                  min={getTodayDateString()}
                  onChange={(e: any) => handleWebDateChange(e.target.value)}
                  onFocus={() => setIsDateFocused(true)}
                  onBlur={() => setIsDateFocused(false)}
                  style={[
                    styles.webInput,
                    isDateFocused && styles.webInputFocused,
                  ]}
                  placeholder="Select date"
                />
              ) : (
                <TouchableOpacity
                  style={[
                    styles.pickerButton,
                    isDateFocused && styles.pickerButtonFocused,
                  ]}
                  onPress={handleDatePress}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.pickerText,
                      !dueDate && styles.pickerPlaceholder,
                    ]}
                  >
                    {dueDate ? formatDate(dueDate) : 'Select date'}
                  </Text>
                  <Calendar size={20} color={colors.text.muted} />
                </TouchableOpacity>
              )}
            </View>

            <View style={[styles.fieldContainer, styles.dateTimeField]}>
              <Text style={styles.fieldLabel}>Due Time</Text>
              
              {Platform.OS === 'web' ? (
                <TextInput
                  ref={webTimeInputRef}
                  type="time"
                  onChange={(e: any) => handleWebTimeChange(e.target.value)}
                  onFocus={() => setIsTimeFocused(true)}
                  onBlur={() => setIsTimeFocused(false)}
                  style={[
                    styles.webInput,
                    isTimeFocused && styles.webInputFocused,
                  ]}
                  placeholder="Select time"
                />
              ) : (
                <TouchableOpacity
                  style={[
                    styles.pickerButton,
                    isTimeFocused && styles.pickerButtonFocused,
                  ]}
                  onPress={handleTimePress}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.pickerText,
                      !dueTime && styles.pickerPlaceholder,
                    ]}
                  >
                    {dueTime ? formatTime(dueTime) : 'Select time'}
                  </Text>
                  <Clock size={20} color={colors.text.muted} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Attach to Goal (Optional)</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowGoalDropdown(true)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.dropdownText,
                  !selectedGoal && styles.dropdownPlaceholder,
                ]}
              >
                {selectedGoal ? selectedGoal.title : 'Select a goal'}
              </Text>
              <Flag size={20} color={colors.text.muted} />
            </TouchableOpacity>
          </View>

          <View style={styles.repeatSection}>
            <View style={styles.repeatHeader}>
              <View style={styles.repeatToggle}>
                <Repeat size={20} color={colors.button.primary} style={{ marginRight: 8 }} />
                <Text style={styles.repeatTitle}>Repeating Task</Text>
              </View>
              <Switch
                value={isRepeating}
                onValueChange={setIsRepeating}
                trackColor={{ false: colors.background.container, true: colors.button.primary }}
                thumbColor={colors.text.primary}
                ios_backgroundColor={colors.background.container}
              />
            </View>

            {isRepeating && (
              <View style={styles.repeatOptions}>
                <View style={styles.repeatRow}>
                  <View style={styles.repeatField}>
                    <InputField
                      label="Repeat Count"
                      value={repeatCount}
                      onChangeText={setRepeatCount}
                      placeholder="1"
                      keyboardType="numeric"
                      maxLength={3}
                    />
                  </View>
                </View>

                <View style={styles.daysContainer}>
                  <Text style={styles.fieldLabel}>Days of Repetition</Text>
                  <View style={styles.daysGrid}>
                    {daysOfWeek.map((day) => (
                      <TouchableOpacity
                        key={day.key}
                        style={[
                          styles.dayButton,
                          selectedDays.includes(day.key) && styles.dayButtonSelected,
                        ]}
                        onPress={() => toggleDay(day.key)}
                        activeOpacity={0.8}
                      >
                        <Text
                          style={[
                            styles.dayButtonText,
                            selectedDays.includes(day.key) && styles.dayButtonTextSelected,
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
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(500).delay(300)}
          style={styles.actionButtons}
        >
          <TouchableOpacity
            style={[
              styles.createButton,
              !isFormValid && styles.createButtonDisabled,
            ]}
            onPress={handleCreateTask}
            disabled={!isFormValid}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.createButtonText,
                !isFormValid && styles.createButtonTextDisabled,
              ]}
            >
              Create Task
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {/* Goal Selection Modal */}
      <Modal
        visible={showGoalDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowGoalDropdown(false)}
      >
        <View style={styles.dropdownModal}>
          <View style={styles.dropdownContent}>
            <Text style={styles.dropdownTitle}>Select Goal</Text>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                style={[
                  styles.dropdownOption,
                  !selectedGoal && styles.dropdownOptionSelected,
                ]}
                onPress={() => {
                  setSelectedGoal(null);
                  setShowGoalDropdown(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownOptionText,
                    !selectedGoal && styles.dropdownOptionTextSelected,
                  ]}
                >
                  No Goal
                </Text>
              </TouchableOpacity>
              
              {availableGoals.map((goal) => (
                <TouchableOpacity
                  key={goal.id}
                  style={[
                    styles.dropdownOption,
                    selectedGoal?.id === goal.id && styles.dropdownOptionSelected,
                  ]}
                  onPress={() => handleGoalSelect(goal)}
                >
                  <Text
                    style={[
                      styles.dropdownOptionText,
                      selectedGoal?.id === goal.id && styles.dropdownOptionTextSelected,
                    ]}
                  >
                    {goal.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <View style={styles.dropdownActions}>
              <TouchableOpacity
                style={[styles.dropdownButton, styles.dropdownButtonCancel]}
                onPress={() => setShowGoalDropdown(false)}
              >
                <Text style={[styles.dropdownButtonText, styles.dropdownButtonTextCancel]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};