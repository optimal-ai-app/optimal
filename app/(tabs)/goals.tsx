import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Plus } from 'lucide-react-native';

import { GoalCreationModal } from '@/src/components/custom/GoalCreationModal';
import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';
import { GoalCard } from '@/src/components/custom/GoalCard/GoalCard';
import {
  useGoals,
  Goal,
  useSendMessageAndCreateNewChat,
  useUserId,
} from '@/src/stores';
import { useFetchUserGoals } from '@/src/stores/goalStore';
import { globalStyles } from '@/src/constants/styles';
import SecondaryPageHeader from '@/src/components/custom/SecondaryPageHeader/SecondaryPageHeader';

export default function GoalsScreen() {
  const router = useRouter();
  const [showGoalModal, setShowGoalModal] = useState(false);
  const goals = useGoals() as unknown as Goal[];
  const sendMessageAndCreateNewChat = useSendMessageAndCreateNewChat();
  const userId = useUserId();
  const fetchGoals = useFetchUserGoals();

  useEffect(() => {
    if (userId) {
      fetchGoals(userId);
    }
  }, [userId]);

  const handleCreateWithAgent = async () => {
    // Send message and create new chat directly through store
    await sendMessageAndCreateNewChat(
      'Help me create a goal',
      { type: 'goal_setting' },
      userId,
    );

    // Navigate to agent page (no params needed since store is updated)
    router.push('/(tabs)/agent');
  };

  const handleCreateManually = () => {
    router.push('/home/create-goal');
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <SecondaryPageHeader
        title="Goals"
        showBackButton={true}
        rightActionChildren={
          <TouchableOpacity
            onPress={() => setShowGoalModal(true)}
            style={globalStyles.circleButton}
            accessibilityLabel="Add new goal"
            accessibilityRole="button"
          >
            <Plus size={24} color={colors.text.primary} />
          </TouchableOpacity>
        }
      />
      <ScrollView
        contentContainerStyle={globalStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.duration(500).delay(100)}>
          {goals.map((goal, index) => (
            <GoalCard key={index} goal={goal} />
          ))}
        </Animated.View>
      </ScrollView>

      <GoalCreationModal
        visible={showGoalModal}
        onClose={() => setShowGoalModal(false)}
        onCreateWithAgent={handleCreateWithAgent}
        onCreateManually={handleCreateManually}
      />
    </SafeAreaView>
  );
}
