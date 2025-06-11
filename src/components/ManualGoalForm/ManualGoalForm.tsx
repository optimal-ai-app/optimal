import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Calendar, CheckCircle } from 'lucide-react-native';

import { Header } from '../Header';
import { InputField } from '../InputField';
import { styles } from './ManualGoalForm.styles';
import { colors } from '../../constants/colors';

interface ManualGoalFormProps {
  onGoalCreated?: (goal: {
    title: string;
    description: string;
    completionDate: Date;
  }) => void;
}

export const ManualGoalForm: React.FC<ManualGoalFormProps> = ({
  onGoalCreated,
}) => {
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completionDate, setCompletionDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdGoal, setCreatedGoal] = useState<{
    title: string;
    description: string;
    completionDate: Date;
  } | null>(null);

  const isFormValid = title.trim() && description.trim() && completionDate;

  const handleDatePress = () => {
    if (Platform.OS === 'web') {
      // For web, create a simple date input
      const input = document.createElement('input');
      input.type = 'date';
      input.min = new Date().toISOString().split('T')[0];
      input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        if (target.value) {
          setCompletionDate(new Date(target.value));
        }
      };
      input.click();
    } else {
      setShowDatePicker(true);
    }
  };

  const handleCreateGoal = () => {
    if (!isFormValid) return;

    const goal = {
      title: title.trim(),
      description: description.trim(),
      completionDate: completionDate!,
    };

    setCreatedGoal(goal);
    setIsSubmitted(true);
    onGoalCreated?.(goal);
  };

  const handleGenerateTasks = () => {
    if (!createdGoal) return;

    const prompt = `Can you generate a comprehensive schedule of tasks for the next two weeks that can help me reach my goal? My goal is: ${createdGoal.title}. Description: ${createdGoal.description}. I want to complete this by ${createdGoal.completionDate.toLocaleDateString()}.`;

    router.push({
      pathname: '/(tabs)/agent',
      params: {
        action: 'generate-tasks',
        prompt,
      },
    });
  };

  const handleViewGoals = () => {
    router.push('/home/goals');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isSubmitted && createdGoal) {
    return (
      <View style={styles.container}>
        <Header title="Goal Created" showBackButton />
        
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
          <Animated.View
            entering={FadeInDown.duration(500)}
            style={styles.successContainer}
          >
            <View style={styles.successIcon}>
              <CheckCircle size={32} color={colors.text.primary} />
            </View>
            
            <Text style={styles.successTitle}>Goal Created Successfully!</Text>
            <Text style={styles.successMessage}>
              Your goal "{createdGoal.title}" has been added to your active goals.
              Would you like to generate a task schedule to help you achieve it?
            </Text>
            
            <View style={styles.successActions}>
              <TouchableOpacity
                style={[styles.successButton, styles.successButtonSecondary]}
                onPress={handleViewGoals}
                activeOpacity={0.8}
              >
                <Text style={[styles.successButtonText, styles.successButtonTextSecondary]}>
                  View Goals
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.successButton}
                onPress={handleGenerateTasks}
                activeOpacity={0.8}
              >
                <Text style={styles.successButtonText}>Generate Tasks</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Create Goal" showBackButton />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Animated.View
          entering={FadeInDown.duration(500).delay(100)}
          style={styles.header}
        >
          <Text style={styles.title}>Create Your Goal</Text>
          <Text style={styles.subtitle}>
            Set up a new goal with your own details and timeline
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(500).delay(200)}
          style={styles.form}
        >
          <InputField
            label="Goal Title"
            value={title}
            onChangeText={setTitle}
            placeholder="e.g., Run a 5K marathon"
            maxLength={100}
          />

          <InputField
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Describe your goal in detail..."
            multiline
            numberOfLines={4}
            maxLength={500}
            style={{ height: 120 }}
          />

          <View>
            <Text style={{ 
              fontSize: 14, 
              color: colors.text.muted, 
              marginBottom: 8,
              marginLeft: 16 
            }}>
              Completion Date
            </Text>
            <TouchableOpacity
              style={[
                styles.datePickerButton,
                showDatePicker && styles.datePickerButtonFocused,
              ]}
              onPress={handleDatePress}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.datePickerText,
                  !completionDate && styles.datePickerPlaceholder,
                ]}
              >
                {completionDate ? formatDate(completionDate) : 'Select completion date'}
              </Text>
              <Calendar size={20} color={colors.text.muted} />
            </TouchableOpacity>
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
            onPress={handleCreateGoal}
            disabled={!isFormValid}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.createButtonText,
                !isFormValid && styles.createButtonTextDisabled,
              ]}
            >
              Create Goal
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};