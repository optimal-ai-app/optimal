import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  TextStyle,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import Animated, { FadeInDown, SlideInRight } from 'react-native-reanimated';
import {
  Flag,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Calendar,
  BookOpenIcon,
  Plus,
} from 'lucide-react-native';

import { Header } from '@/src/components/default/Header';
import { Button } from '@/src/components/default/Button';
import { GoalCreationModal } from '@/src/components/custom/GoalCreationModal';
import { TaskCreationModal } from '@/src/components/custom/TaskCreationModal';
import { DailyLog } from '@/src/components/custom/DailyLog';
import {
  FloatingActionButton,
  GlassCard,
  PulseAnimation,
} from '@/src/components/custom/PremiumFeatures';
import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';
import {
  useGoals,
  useTasks,
  useTaskLoading,
  useTaskError,
  useFetchUserTasks,
  useFetchUserGoals,
  useSendMessageAndCreateNewChat,
} from '@/src/stores';
import { useUserId } from '@/src/stores/userStore';
import { TaskCard } from '@/src/components/custom/TaskCard.tsx/TaskCard';
import { GoalCard } from '@/src/components/custom/GoalCard/GoalCard';
import { globalStyles } from '@/src/constants/styles';
import HomeHeaderDash from '@/src/components/custom/HomeHeaderDash/HomeHeaderDash';

export default function HomeScreen() {
  const router = useRouter();
  const userId = useUserId();
  const tasks = useTasks();
  const isLoading = useTaskLoading();
  const error = useTaskError();
  const fetchUserTasks = useFetchUserTasks();
  const goals = useGoals();
  const fetchUserGoals = useFetchUserGoals();
  const sendMessageAndCreateNewChat = useSendMessageAndCreateNewChat();
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUserTasks(userId);
    }
  }, [userId, fetchUserTasks]);

  useEffect(() => {
    if (userId) {
      fetchUserGoals(userId);
    }
  }, [userId, fetchUserGoals]);

  // All useMemo hooks must also be called unconditionally
  const { todaysTasks, upcomingTasks } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayTasks = tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);
      const isCompletedToday =
        task.status === 'completed' &&
        task.completionDate &&
        new Date(task.completionDate).setHours(0, 0, 0, 0) === today.getTime();

      return taskDate.getTime() === today.getTime() || isCompletedToday;
    });

    const upcoming = tasks
      .filter((task) => {
        const taskDate = new Date(task.dueDate);
        taskDate.setHours(0, 0, 0, 0);
        return (
          taskDate.getTime() > today.getTime() && task.status !== 'completed'
        );
      })
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
      .slice(0, 3);

    return {
      todaysTasks: todayTasks,
      upcomingTasks: upcoming,
    };
  }, [tasks]);

  const hasUser = !!userId;
  const displayedTasks = todaysTasks.length > 0 ? todaysTasks : upcomingTasks;
  const sectionTitle = "Today's Tasks";

  if (isLoading) {
    return (
      <View style={globalStyles.container}>
        <View style={styles.loadingContainer}>
          <PulseAnimation>
            <Sparkles size={48} color={colors.button.primary} />
          </PulseAnimation>
          <Text style={styles.loadingText}>
            Loading your productivity dashboard...
          </Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={globalStyles.container}>
        <Header title="Home" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error loading tasks: {error}</Text>
        </View>
      </View>
    );
  }
  if (!hasUser) {
    return (
      <View style={globalStyles.container}>
        <Header title="Home" />
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Please log in to view your tasks</Text>
        </View>
      </View>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const handleNewGoalWithAgent = async () => {
    await sendMessageAndCreateNewChat(
      'Help me create a goal',
      { type: 'goal_setting' },
      userId,
    );
    router.push('/(tabs)/agent');
  };

  const handleNewGoalManually = () => {
    router.replace('/(tabs)/home/create-goal');
  };

  const handleNewTaskWithAgent = async () => {
    router.navigate('/(tabs)/agent');
    await sendMessageAndCreateNewChat(
      'Help me create a task',
      { type: 'help_request' },
      userId,
    );
  };

  const onRefresh = async () => {
    if (!userId) return;
    setRefreshing(true);
    try {
      await Promise.all([fetchUserTasks(userId), fetchUserGoals(userId)]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <Animated.View
      entering={FadeInDown.duration(400).springify()}
      style={globalStyles.container}
    >
      <SafeAreaView style={globalStyles.container}>
        <ScrollView
          contentContainerStyle={globalStyles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.button.primary}
              colors={[colors.button.primary]}
            />
          }
        >
          <Animated.View entering={FadeInDown.duration(800).delay(200)}>
            <HomeHeaderDash
              goalCount={goals.length}
              taskCount={tasks.filter((t) => t.status === 'completed').length}
              todayTaskCount={todaysTasks.length}
            />
          </Animated.View>

          <Animated.View
            style={styles.sectionItem}
            entering={FadeInDown.duration(600).delay(600)}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <View style={styles.sectionIconContainer}>
                  <Calendar size={24} color={colors.button.secondary} />
                </View>
                <View>
                  <Text style={styles.sectionTitle}>{sectionTitle}</Text>
                  {todaysTasks.length === 0 && upcomingTasks.length > 0 && (
                    <Text style={styles.sectionSubtitle}>
                      Next 3 upcoming tasks
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.sectionActions}>
                <TouchableOpacity
                  onPress={() => router.push('/(tabs)/tasks')}
                  style={styles.viewAllButton}
                  accessibilityLabel="View all tasks"
                  accessibilityRole="button"
                >
                  <Text style={styles.viewAllText}>View All</Text>
                  <ChevronRight size={16} color={colors.button.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowTaskModal(true)}
                  style={globalStyles.circleButton}
                >
                  <Plus size={24} color={colors.text.primary} />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={true}
              style={styles.tasksGrid}
            >
              {displayedTasks.map((task, index, filteredTasks) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isLast={index === filteredTasks.length - 1}
                  index={index}
                />
              ))}
            </ScrollView>
            {displayedTasks.length === 0 && (
              <View style={styles.emptyStateContainer}>
                <TrendingUp size={48} color={colors.text.muted} />
                <Text style={styles.emptyText}>
                  {tasks.length === 0
                    ? 'No tasks yet. Create your first task to get started!'
                    : 'No tasks for today or upcoming.'}
                </Text>
                <Button
                  title="Create Task"
                  onPress={() => setShowTaskModal(true)}
                  variant="secondary"
                  style={styles.emptyActionButton}
                />
              </View>
            )}
          </Animated.View>

          {/* Daily Log Section - Positioned after tasks for reflection */}
          <Animated.View
            style={styles.sectionItem}
            entering={FadeInDown.duration(600).delay(1000)}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <View style={styles.sectionIconContainer}>
                  <BookOpenIcon size={24} color={colors.button.secondary} />
                </View>
                <Text style={styles.sectionTitle}>Daily Log</Text>
              </View>
            </View>
            <DailyLog
            // onVoiceInput={handleVoiceInput}
            // onRecordingStart={() => console.log('Recording started')}
            // onRecordingEnd={() => console.log('Recording ended')}
            />
          </Animated.View>
          {/* Goals Preview with Enhanced Design */}
          <Animated.View
            style={styles.sectionItem}
            entering={FadeInDown.duration(600).delay(1000)}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <View style={styles.sectionIconContainer}>
                  <Flag size={24} color={colors.status.success} />
                </View>
                <Text style={styles.sectionTitle}>Active Goals</Text>
              </View>
              <Link href="/goals" asChild>
                <TouchableOpacity
                  style={styles.viewAllButton}
                  accessibilityLabel="View all goals"
                  accessibilityRole="button"
                >
                  <Text style={styles.viewAllText}>View All</Text>
                  <ChevronRight size={16} color={colors.button.primary} />
                </TouchableOpacity>
              </Link>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {goals
                .filter((goal) => goal.status === 'active')
                .map((goal, index) => (
                  <View style={styles.goalCardGap}>
                    <GoalCard goal={goal} />
                  </View>
                ))}
            </ScrollView>

            {goals.length === 0 && (
              <View style={styles.emptyGoalsContainer}>
                <Sparkles size={48} color={colors.text.muted} />
                <Text style={styles.emptyText}>
                  No goals yet. Let's set your first goal!
                </Text>
                <Button
                  title="Set a Goal"
                  onPress={() => setShowGoalModal(true)}
                  gradient
                  style={styles.emptyGoalsButton}
                />
              </View>
            )}
          </Animated.View>
        </ScrollView>

        {/* Goal Creation Modal */}
        <GoalCreationModal
          visible={showGoalModal}
          onClose={() => setShowGoalModal(false)}
          onCreateWithAgent={handleNewGoalWithAgent}
          onCreateManually={handleNewGoalManually}
        />

        {/* Task Creation Modal */}
        <TaskCreationModal
          visible={showTaskModal}
          onClose={() => setShowTaskModal(false)}
          onCreateWithAgent={handleNewTaskWithAgent}
        />
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tasksGrid: {
    maxHeight: 500,
  } as ViewStyle,

  sectionItem: {
    paddingTop: 12,
  } as ViewStyle,

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  } as ViewStyle,

  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  } as ViewStyle,

  sectionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  } as ViewStyle,

  sectionTitle: {
    fontSize: fonts.sizes.xl,
    color: colors.text.primary,
  } as TextStyle,

  sectionSubtitle: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted,
    marginTop: 2,
  } as TextStyle,

  sectionActions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  } as ViewStyle,

  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(169, 203, 255, 0.1)',
  } as ViewStyle,

  viewAllText: {
    fontSize: fonts.sizes.sm,
    color: colors.button.primary,
    marginRight: 4,
    fontWeight: fonts.weights.medium,
  } as TextStyle,

  // Empty States
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  } as ViewStyle,

  goalCardGap: {
    marginHorizontal: 6,
  } as ViewStyle,

  emptyText: {
    fontSize: fonts.sizes.md,
    color: colors.text.muted,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 20,
    lineHeight: 24,
  } as TextStyle,

  emptyActionButton: {
    marginTop: 8,
  } as ViewStyle,

  emptyGoalsContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  } as ViewStyle,

  emptyGoalsButton: {
    marginTop: 16,
  } as ViewStyle,

  // Loading and Error States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  } as ViewStyle,

  loadingText: {
    fontSize: fonts.sizes.lg,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 24,
  } as TextStyle,

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  } as ViewStyle,

  errorText: {
    fontSize: fonts.sizes.lg,
    color: colors.status.error,
    textAlign: 'center',
  } as TextStyle,

  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  } as ViewStyle,

  loginText: {
    fontSize: fonts.sizes.lg,
    color: colors.text.muted,
    textAlign: 'center',
  } as TextStyle,
});
