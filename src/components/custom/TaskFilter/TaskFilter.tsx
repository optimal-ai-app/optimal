import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Filter, X, Check } from 'lucide-react-native';
import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';
import { globalStyles } from '@/src/constants/styles';

export type TaskFilterType = 'all' | 'todo' | 'overdue' | 'completed' | 'today';
export type TaskSortType = 'dueDate' | 'alphabetical' | 'priority';

interface TaskFilterProps {
  onFilterChange: (filters: TaskFilterType[], sortBy: TaskSortType) => void;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<TaskFilterType[]>(['all']);
  const [activeSort, setActiveSort] = useState<TaskSortType>('dueDate');

  const filterOptions: { value: TaskFilterType; label: string }[] = [
    { value: 'all', label: 'All Tasks' },
    { value: 'today', label: "Today's Tasks" },
    { value: 'todo', label: 'To-Do' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'completed', label: 'Completed' },
  ];

  const sortOptions: { value: TaskSortType; label: string }[] = [
    { value: 'dueDate', label: 'Due Date' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'priority', label: 'Priority Level' },
  ];

  const toggleFilter = (filter: TaskFilterType) => {
    let newFilters: TaskFilterType[];

    if (filter === 'all') {
      newFilters = ['all'];
    } else {
      newFilters = activeFilters.filter((f) => f !== 'all');
      if (activeFilters.includes(filter)) {
        newFilters = newFilters.filter((f) => f !== filter);
        if (newFilters.length === 0) {
          newFilters = ['all'];
        }
      } else {
        newFilters.push(filter);
      }
    }

    setActiveFilters(newFilters);
    onFilterChange(newFilters, activeSort);
  };

  const handleSortChange = (sort: TaskSortType) => {
    setActiveSort(sort);
    onFilterChange(activeFilters, sort);
  };

  return (
    <>
      <TouchableOpacity
        style={globalStyles.circleButton}
        onPress={() => setIsModalVisible(true)}
        accessibilityLabel="Filter tasks"
        accessibilityRole="button"
      >
        <Filter size={20} color={colors.text.primary} />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsModalVisible(false)}
        >
          <Pressable style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter & Sort Tasks</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                accessibilityLabel="Close filter"
              >
                <X size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Show Tasks</Text>
              {filterOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.option}
                  onPress={() => toggleFilter(option.value)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      activeFilters.includes(option.value) &&
                        styles.checkboxActive,
                    ]}
                  >
                    {activeFilters.includes(option.value) && (
                      <Check size={16} color={colors.text.primary} />
                    )}
                  </View>
                  <Text style={styles.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.option}
                  onPress={() => handleSortChange(option.value)}
                >
                  <View
                    style={[
                      styles.radio,
                      activeSort === option.value && styles.radioActive,
                    ]}
                  >
                    {activeSort === option.value && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <Text style={styles.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.button.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background.primary,
    borderRadius: 16,
    padding: 20,
    width: '85%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: '600',
    color: colors.text.primary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: fonts.sizes.md,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.button.primary,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.button.primary,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.button.primary,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: colors.button.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.button.primary,
  },
  optionText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
  },
});
