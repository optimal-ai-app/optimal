import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  ScrollView,
  Pressable
} from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { 
  Target, 
  Clock, 
  Flag, 
  ChevronRight,
  MoreVertical,
  CheckCircle2
} from 'lucide-react-native';

import { Header } from '@/src/components/Header';
import { Card } from '@/src/components/Card';
import { Button } from '@/src/components/Button';
import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';

// Task type definition
interface Task {
  id: string;
  title: string;
  completionTime: string;
  priority: '!' | '!!' | '!!!';
  description?: string;
  completed?: boolean;
}

// Goal type definition
interface Goal {
  id: string;
  title: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  createdAt: Date;
  tasks: Task[];
}

export default function HabitSummaryScreen() {
  // State
  const [goalInput, setGoalInput] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  
  // Handle goal submission
  const handleSubmitGoal = () => {
    if (!goalInput.trim()) return;
    
    // In a real app, this would be handled by an AI service
    // For demo, we'll create a simple task and goal
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: goalInput,
      targetValue: 30, // Example for "30 pushups"
      currentValue: 0,
      unit: 'pushups',
      createdAt: new Date(),
      tasks: []
    };
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: '10 pushups',
      completionTime: '15 minutes',
      priority: '!!',
      description: 'Work towards your goal of 30 pushups',
      completed: false
    };
    
    setTasks(prev => [...prev, newTask]);
    setGoals(prev => [...prev, newGoal]);
    setGoalInput('');
  };
  
  // Handle task completion
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };
  
  // Get priority color
  const getPriorityColor = (priority: '!' | '!!' | '!!!') => {
    switch (priority) {
      case '!':
        return colors.status.success;
      case '!!':
        return colors.status.warning;
      case '!!!':
        return colors.status.error;
      default:
        return colors.text.muted;
    }
  };
  
  return (
    <View style={styles.container}>
      <Header title="Habit Summary" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Goal Input Section */}
        <Animated.View entering={FadeInDown.duration(500).delay(100)}>
          <Card style={styles.inputCard}>
            <Text style={styles.inputLabel}>What's your goal?</Text>
            <TextInput
              style={styles.input}
              value={goalInput}
              onChangeText={setGoalInput}
              placeholder="e.g., Do 30 pushups daily"
              placeholderTextColor={colors.text.muted}
              multiline
            />
            <Button
              title="Save Goal"
              onPress={handleSubmitGoal}
              fullWidth
              style={styles.saveButton}
            />
          </Card>
        </Animated.View>
        
        {/* Tasks Section */}
        <Animated.View entering={FadeInDown.duration(500).delay(200)}>
          <Card style={styles.tasksCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Target size={20} color={colors.button.primary} />
                <Text style={styles.sectionTitle}>Today's Tasks</Text>
              </View>
              <Text style={styles.taskCount}>{tasks.length} tasks</Text>
            </View>
            
            {tasks.map((task, index) => (
              <Pressable
                key={task.id}
                style={[
                  styles.taskItem,
                  index === tasks.length - 1 && styles.lastTaskItem,
                ]}
                onLongPress={() => {
                  // Handle long press to edit task
                }}
              >
                <TouchableOpacity
                  style={styles.taskCheckbox}
                  onPress={() => toggleTaskCompletion(task.id)}
                >
                  <CheckCircle2
                    size={24}
                    color={task.completed ? colors.status.success : colors.text.muted}
                  />
                </TouchableOpacity>
                
                <View style={styles.taskContent}>
                  <Text 
                    style={[
                      styles.taskTitle,
                      task.completed && styles.taskTitleCompleted
                    ]}
                  >
                    {task.title}
                  </Text>
                  
                  <View style={styles.taskMeta}>
                    <View style={styles.taskMetaItem}>
                      <Clock size={14} color={colors.text.muted} />
                      <Text style={styles.taskMetaText}>{task.completionTime}</Text>
                    </View>
                    
                    <View style={styles.taskMetaItem}>
                      <Flag 
                        size={14} 
                        color={getPriorityColor(task.priority)} 
                      />
                      <Text 
                        style={[
                          styles.taskMetaText,
                          { color: getPriorityColor(task.priority) }
                        ]}
                      >
                        {task.priority}
                      </Text>
                    </View>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.taskMoreButton}
                  onPress={() => {
                    // Handle more options
                  }}
                >
                  <MoreVertical size={20} color={colors.text.muted} />
                </TouchableOpacity>
              </Pressable>
            ))}
            
            {tasks.length === 0 && (
              <Text style={styles.emptyText}>
                No tasks yet. Add a goal to get started!
              </Text>
            )}
          </Card>
        </Animated.View>
        
        {/* Goals Preview */}
        <Animated.View entering={FadeInDown.duration(500).delay(300)}>
          <Card style={styles.goalsCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Flag size={20} color={colors.button.accent} />
                <Text style={styles.sectionTitle}>Active Goals</Text>
              </View>
              <Link href="/habit-summary/goals" asChild>
                <TouchableOpacity style={styles.viewAllButton}>
                  <Text style={styles.viewAllText}>View All</Text>
                  <ChevronRight size={16} color={colors.button.primary} />
                </TouchableOpacity>
              </Link>
            </View>
            
            {goals.slice(0, 2).map((goal, index) => (
              <Link 
                key={goal.id}
                href={{
                  pathname: "/habit-summary/goal-details",
                  params: { id: goal.id }
                }}
                asChild
              >
                <TouchableOpacity
                  style={[
                    styles.goalPreview,
                    index === goals.length - 1 && styles.lastGoalPreview,
                  ]}
                >
                  <LinearGradient
                    colors={[colors.gradient.start, colors.gradient.end]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.goalProgress}
                  >
                    <Text style={styles.goalProgressText}>
                      {Math.round((goal.currentValue / goal.targetValue) * 100)}%
                    </Text>
                  </LinearGradient>
                  
                  <View style={styles.goalContent}>
                    <Text style={styles.goalTitle}>{goal.title}</Text>
                    <Text style={styles.goalSubtitle}>
                      {goal.currentValue} / {goal.targetValue} {goal.unit}
                    </Text>
                  </View>
                  
                  <ChevronRight size={20} color={colors.text.muted} />
                </TouchableOpacity>
              </Link>
            ))}
            
            {goals.length === 0 && (
              <Text style={styles.emptyText}>
                No goals yet. Add one to get started!
              </Text>
            )}
          </Card>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  
  scrollView: {
    flex: 1,
  },
  
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  
  inputCard: {
    padding: 16,
  },
  
  inputLabel: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 12,
  },
  
  input: {
    backgroundColor: colors.background.container,
    borderRadius: 8,
    padding: 12,
    color: colors.text.primary,
    fontSize: fonts.sizes.md,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  
  saveButton: {
    marginTop: 16,
  },
  
  tasksCard: {
    padding: 16,
    marginTop: 16,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  sectionTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginLeft: 8,
  },
  
  taskCount: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted,
  },
  
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.utility.divider,
  },
  
  lastTaskItem: {
    borderBottomWidth: 0,
  },
  
  taskCheckbox: {
    marginRight: 12,
  },
  
  taskContent: {
    flex: 1,
  },
  
  taskTitle: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    marginBottom: 4,
  },
  
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.text.muted,
  },
  
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  taskMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  
  taskMetaText: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted,
    marginLeft: 4,
  },
  
  taskMoreButton: {
    padding: 8,
    marginRight: -8,
  },
  
  emptyText: {
    fontSize: fonts.sizes.md,
    color: colors.text.muted,
    textAlign: 'center',
    marginTop: 8,
  },
  
  goalsCard: {
    padding: 16,
    marginTop: 16,
  },
  
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  viewAllText: {
    fontSize: fonts.sizes.sm,
    color: colors.button.primary,
    marginRight: 4,
  },
  
  goalPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.utility.divider,
  },
  
  lastGoalPreview: {
    borderBottomWidth: 0,
  },
  
  goalProgress: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  goalProgressText: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
  },
  
  goalContent: {
    flex: 1,
  },
  
  goalTitle: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    marginBottom: 4,
  },
  
  goalSubtitle: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted,
  },
});