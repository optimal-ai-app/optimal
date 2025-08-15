import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  Calendar,
  Target,
  Flag,
  Trash2,
  CreditCard as Edit3,
  CircleCheck as CheckCircle2,
} from 'lucide-react-native';

import { Header } from '@/src/components/default/Header';
import { Card } from '@/src/components/default/Card';
import { Button } from '@/src/components/default/Button';
import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';
import { useGetGoal, useDeleteGoal } from '@/src/stores/goalStore';
import { Goal, Task } from '@/src/stores/types';
import { useTasksByGoal } from '@/src/stores/taskStore';
import { TaskCard } from '@/src/components/custom/TaskCard.tsx/TaskCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GoalDetailsScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useLocalSearchParams();
  const goal = useGetGoal(id as string) as Goal;
  const tasks = useTasksByGoal()(id as string) as Task[];
  const deleteGoal = useDeleteGoal();

  const handleDeleteGoal = () => {
    const confirmAndDelete = async () => {
      if (!goal) return;
      await deleteGoal(goal);
      router.back();
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to delete this goal?')) {
        confirmAndDelete();
      }
    } else {
      Alert.alert('Delete Goal', 'Are you sure you want to delete this goal?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: confirmAndDelete,
          style: 'destructive',
        },
      ]);
    }
  };

  // Handle goal completion
  const handleCompleteGoal = () => {
    const confirmAndComplete = async () => {
      if (!goal) return;
      await deleteGoal(goal);
      router.back();
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Mark this goal as complete?')) {
        confirmAndComplete();
      }
    } else {
      Alert.alert('Complete Goal', 'Mark this goal as complete?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Complete',
          onPress: confirmAndComplete,
        },
      ]);
    }
  };

  if (id === undefined || !goal) {
    return <Text>No goal selected</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Goal Details"
        showBackButton
        rightAction={
          <TouchableOpacity
            onPress={handleDeleteGoal}
            style={styles.deleteButton}
          >
            <Trash2 size={20} color={colors.status.error} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Goal Overview */}
        <Animated.View entering={FadeInDown.duration(500).delay(100)}>
          <Card style={styles.overviewCard}>
            <View style={styles.goalHeader}>
              <LinearGradient
                colors={[colors.gradient.start, colors.gradient.end]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.goalProgress}
              >
                <Text style={styles.goalProgressText}>
                  {Math.round((goal?.progress / 100) * 100)}%
                </Text>
              </LinearGradient>

              <View style={styles.goalTitleContainer}>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                <Text style={styles.goalSubtitle}>{goal.progress} / 100</Text>
              </View>

              <TouchableOpacity
                onPress={() => setIsEditing(true)}
                style={styles.editButton}
              >
                <Edit3 size={20} color={colors.text.muted} />
              </TouchableOpacity>
            </View>

            <View style={styles.goalStats}>
              <View style={styles.goalStat}>
                <Calendar size={16} color={colors.button.primary} />
                <Text style={styles.goalStatLabel}>Streak</Text>
                <Text style={styles.goalStatValue}>{goal.streak} days</Text>
              </View>

              <View style={styles.goalStat}>
                <Target size={16} color={colors.button.accent} />
                <Text style={styles.goalStatLabel}>Completion</Text>
                <Text style={styles.goalStatValue}>{goal.progress}%</Text>
              </View>

              <View style={styles.goalStat}>
                <Flag size={16} color={colors.status.success} />
                <Text style={styles.goalStatLabel}>Created</Text>
                <Text style={styles.goalStatValue}>
                  {/* {selectedGoal.createdAt.toLocaleDateString()} */}
                </Text>
              </View>
            </View>
          </Card>
        </Animated.View>

        {/* Progress History */}
        {/* <Animated.View entering={FadeInDown.duration(500).delay(200)}>
          <Card style={styles.historyCard}>
            <Text style={styles.sectionTitle}>Progress History</Text>

            <View style={styles.historyGraph}>
              {selectedGoal.history.map((entry, index) => (
                <View key={entry.date} style={styles.historyBar}>
                  <View
                    style={[
                      styles.historyBarFill,
                      {
                        height: `${
                          (entry.value / selectedGoal.targetValue) * 100
                        }%`
                      }
                    ]}
                  />
                  <Text style={styles.historyDate}>
                    {new Date(entry.date).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        </Animated.View> */}

        {/* Related Tasks */}
        <Animated.View entering={FadeInDown.duration(500).delay(300)}>
          <Card style={styles.tasksCard}>
            <ScrollView>
              <Text style={styles.sectionTitle}>Standard Tasks</Text>
              {tasks
                .filter((task) => !task.milestone)
                .sort((a, b) => {
                  const dateCompare = a.dueDate.getTime() - b.dueDate.getTime();
                  if (dateCompare !== 0) return dateCompare;
                  if (a.priority !== b.priority) {
                    return b.priority.length - a.priority.length;
                  }
                  return a.title.localeCompare(b.title);
                })
                .map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    isLast={index === tasks.length - 1}
                  />
                ))}
            </ScrollView>
          </Card>
        </Animated.View>
        {goal.type?.toLowerCase() === 'qualitative' && (
          <Animated.View entering={FadeInDown.duration(500).delay(300)}>
            <Card style={styles.tasksCard}>
              <ScrollView>
                <Text style={styles.sectionTitle}>Milestone Tasks</Text>
                {tasks
                  .filter((task) => task.milestone === true)
                  .sort((a, b) => {
                    const dateCompare =
                      a.dueDate.getTime() - b.dueDate.getTime();
                    if (dateCompare !== 0) return dateCompare;
                    if (a.priority !== b.priority) {
                      return b.priority.length - a.priority.length;
                    }
                    return a.title.localeCompare(b.title);
                  })
                  .map((task, index) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      isLast={index === tasks.length - 1}
                    />
                  ))}
              </ScrollView>
            </Card>
          </Animated.View>
        )}

        {/* Action Buttons */}
        <Animated.View entering={FadeInDown.duration(500).delay(400)}>
          <View style={styles.actionButtons}>
            <Button
              title="Complete Goal"
              onPress={handleCompleteGoal}
              fullWidth
            />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
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

  deleteButton: {
    padding: 8,
  },

  overviewCard: {
    padding: 16,
  },

  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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

  goalTitleContainer: {
    flex: 1,
  },

  goalTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },

  goalSubtitle: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted,
  },

  editButton: {
    padding: 8,
    marginRight: -8,
  },

  goalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.utility.divider,
  },

  goalStat: {
    alignItems: 'center',
  },

  goalStatLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted,
    marginTop: 4,
    marginBottom: 2,
  },

  goalStatValue: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
  },

  historyCard: {
    padding: 16,
    marginTop: 16,
  },

  sectionTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 16,
  },

  historyGraph: {
    height: 200,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },

  historyBar: {
    width: 40,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  historyBarFill: {
    width: '100%',
    backgroundColor: colors.button.primary,
    borderRadius: 4,
  },

  historyDate: {
    fontSize: fonts.sizes.xs,
    color: colors.text.muted,
    marginTop: 8,
  },

  tasksCard: {
    padding: 16,
    marginTop: 16,
    maxHeight: 600,
    overflow: 'scroll',
  },

  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.utility.divider,
  },

  taskContent: {
    marginLeft: 12,
  },

  taskTitle: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    marginBottom: 4,
  },

  taskMeta: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted,
  },

  actionButtons: {
    marginTop: 24,
  },
});
