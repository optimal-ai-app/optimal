import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, Modal } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {
  Flag,
  MoreVertical,
  CheckCircle2,
  Circle,
  Calendar,
  AlertTriangle,
  Target,
  X,
  Trash,
  Award,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Task, useUpdateTask, useUserId } from '@/src/stores';
import { styles } from './TaskCard.styles';
import { useGoalName } from '@/src/stores';
import { TaskCompletionModal } from './TaskCompletionModal';
import {
  useDeleteAllRelatedTasks,
  useDeleteTaskAndAfter,
  useDeleteTaskInstance,
} from '@/src/stores/taskStore';
import { Card } from '../../default/Card';
import { itemCardStyle } from '@/src/constants/styles';

type Props = {
  task: Task;
  isLast: boolean;
  index?: number;
};

export const TaskCard: React.FC<Props> = ({ task, isLast, index = 0 }) => {
  const router = useRouter();
  const goalName = useGoalName(task.goalId);
  const updateTask = useUpdateTask();
  const deleteTaskInstance = useDeleteTaskInstance();
  const deleteAllRelatedTasks = useDeleteAllRelatedTasks();
  const deleteTaskAndAfter = useDeleteTaskAndAfter();
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // Only keep minimal checkbox animation
  const checkboxScale = useSharedValue(1);
  const userId = useUserId();

  // Simple checkbox animation on toggle
  const animateCheckbox = () => {
    checkboxScale.value = withTiming(0.9, { duration: 100 }, () => {
      checkboxScale.value = withTiming(1, { duration: 100 });
    });
  };

  // Animated styles - only checkbox
  const checkboxAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkboxScale.value }],
  }));

  const getPriorityConfig = (priority: '!' | '!!' | '!!!') => {
    switch (priority) {
      case '!':
        return {
          color: '#10B981',
          label: 'Low',
        };
      case '!!':
        return {
          color: '#F59E0B',
          label: 'Medium',
        };
      case '!!!':
        return {
          color: '#EF4444',
          label: 'High',
        };
      default:
        return {
          color: '#9CA3AF',
          label: 'Low',
        };
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const isSameDay = now.toDateString() === date.toDateString();

    if (isSameDay) {
      return (
        'Today, ' +
        date.toLocaleTimeString(undefined, {
          hour: 'numeric',
          minute: '2-digit',
        })
      );
    }

    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const isOverdue = () => {
    const now = new Date();
    return (
      task.dueDate.getTime() + 1 * 24 * 60 * 60 * 1000 < now.getTime() &&
      task.status !== 'completed'
    );
  };

  const priorityConfig = getPriorityConfig(task.priority);
  const overdue = isOverdue();

  const handleToggleComplete = () => {
    // If task is completed, allow direct unchecking without modal
    if (task.status === 'completed') {
      animateCheckbox();
      const updatedTask = {
        ...task,
        status: 'todo' as any,
        completionDate: new Date(0),
        updatedAt: new Date(),
      };

      setTimeout(() => {
        updateTask(updatedTask);
      }, 100);
      return;
    }

    // If task is not completed, show confirmation modal
    setShowCompletionModal(true);
  };

  const handleConfirmCompletion = () => {
    animateCheckbox();

    const updatedTask = {
      ...task,
      status: 'completed' as any,
      completionDate: new Date(),
      updatedAt: new Date(),
    };

    setTimeout(() => {
      updateTask(updatedTask);
    }, 100);

    setShowCompletionModal(false);
  };

  const handleShowMoreOptions = () => {
    setShowMoreOptions((prev) => !prev);
  };

  const handleCancelCompletion = () => {
    setShowCompletionModal(false);
  };

  const handleDeleteOption = () => {
    setShowMoreOptions(false);
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteInstance = () => {
    deleteTaskInstance(userId, task.id);
    setShowDeleteModal(false);
  };

  const handleDeleteInstanceAndAfter = () => {
    // TODO: Implement delete this instance and all after
    deleteTaskAndAfter(userId, task.id);
    setShowDeleteModal(false);
  };

  const handleDeleteAllInstances = () => {
    // TODO: Implement delete all instances
    deleteAllRelatedTasks(userId, task.sharedId);
    setShowDeleteModal(false);
  };

  return (
    <Card>
      <Pressable
        style={[
          itemCardStyle,
          isLast && styles.lastTaskItem,
          overdue && styles.overdueTask,
        ]}
        accessibilityLabel={`Task: ${task.title}`}
        accessibilityRole="button"
        accessibilityHint="Long press to edit task"
      >
        <Animated.View style={checkboxAnimatedStyle}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={handleToggleComplete}
            accessibilityLabel={
              task.status === 'completed'
                ? 'Mark as incomplete'
                : 'Mark as complete'
            }
            accessibilityRole="checkbox"
            accessibilityState={{ checked: task.status === 'completed' }}
          >
            {task.status === 'completed' ? (
              <CheckCircle2 size={24} color="#10B981" />
            ) : (
              <Circle size={24} color="#9CA3AF" strokeWidth={2} />
            )}
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.taskContent}>
          <View style={styles.titleContainer}>
            <Text
              style={[
                styles.taskTitle,
                task.status === 'completed' && styles.completedTitle,
              ]}
              numberOfLines={2}
            >
              {task.title}
            </Text>

            <View style={styles.metaRow}>
              {task.milestone ? (
                <View
                  style={styles.milestoneBadge}
                  accessibilityLabel="Milestone"
                  accessible
                >
                  <Award size={20} color="#FFD700" />
                  <Text style={[styles.priorityText, { color: '#FFD700' }]}>
                    Milestone
                  </Text>
                </View>
              ) : (
                <View
                  style={[
                    styles.priorityBadge,
                    { borderColor: priorityConfig.color },
                  ]}
                >
                  <Flag size={10} color={priorityConfig.color} />
                  <Text
                    style={[
                      styles.priorityText,
                      { color: priorityConfig.color },
                    ]}
                  >
                    {priorityConfig.label}
                  </Text>
                </View>
              )}

              <View style={{ gap: 6 }}>
                <View>
                  <View
                    style={[styles.titleContainer, { alignSelf: 'flex-end' }]}
                  >
                    {goalName && (
                      <View style={[styles.goalBadge, { gap: 4 }]}>
                        <Target size={12} color="#0066FF" />
                        <Text style={{ color: '#0066FF' }}>
                          {goalName.length > 15
                            ? goalName.substring(0, 15) + '..'
                            : goalName}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <View
                  style={[styles.dueDateBadge, overdue && styles.overdueBadge]}
                >
                  <AlertTriangle
                    size={10}
                    color={overdue ? '#EF4444' : '#9CA3AF'}
                    style={overdue ? {} : { display: 'none' }}
                  />
                  <Calendar size={10} color={overdue ? '#EF4444' : '#9CA3AF'} />
                  <Text
                    style={[styles.dueDateText, overdue && styles.overdueText]}
                  >
                    {formatDate(task.dueDate)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.moreOptionsContainer}>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={handleShowMoreOptions}
            accessibilityLabel="More options"
            accessibilityRole="button"
          >
            <MoreVertical size={24} strokeWidth={1.5} color="#9CA3AF" />
          </TouchableOpacity>

          {showMoreOptions && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={handleDeleteOption}
                accessibilityLabel="Delete task"
                accessibilityRole="button"
              >
                <Trash size={16} color="#EF4444" />
                <Text style={styles.dropdownItemText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Pressable>

      <TaskCompletionModal
        visible={showCompletionModal}
        onConfirm={handleConfirmCompletion}
        onCancel={handleCancelCompletion}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleDeleteModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModalContent}>
            <View style={styles.deleteModalHeader}>
              <Text style={styles.deleteModalTitle}>Delete Task</Text>
              <TouchableOpacity
                onPress={handleDeleteModalClose}
                style={styles.closeButton}
              >
                <X size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.deleteModalDescription}>
              Are you sure you want to delete "{task.title}"?
            </Text>

            <View style={styles.deleteOptionsContainer}>
              <TouchableOpacity
                style={styles.deleteOption}
                onPress={handleDeleteInstance}
              >
                <Text style={styles.deleteOptionText}>Just this instance</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteOption}
                onPress={handleDeleteInstanceAndAfter}
              >
                <Text style={styles.deleteOptionText}>
                  This instance and all after
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteOption}
                onPress={handleDeleteAllInstances}
              >
                <Text style={styles.deleteOptionText}>
                  All related instances
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.deleteOption, styles.cancelOption]}
                onPress={handleDeleteModalClose}
              >
                <Text style={styles.cancelOptionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Card>
  );
};
