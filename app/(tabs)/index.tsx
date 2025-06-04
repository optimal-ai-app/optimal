import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Switch 
} from 'react-native';
import { Link } from 'expo-router';
import Animated, { 
  FadeInDown, 
  useSharedValue, 
  useAnimatedStyle,
  withTiming 
} from 'react-native-reanimated';
import { CircleCheck as CheckCircle2, Clock, ListTodo, Globe, BellRing, ArrowRight } from 'lucide-react-native';

import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { useAuthContext } from '@/src/context/AuthContext';
import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';

export default function HomeScreen() {
  // Get user from auth context
  const { user } = useAuthContext();
  
  // Focus mode state
  const [focusMode, setFocusMode] = useState(false);
  
  // Animation value for focus mode
  const focusOpacity = useSharedValue(0);
  
  // Handle focus mode toggle
  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
    focusOpacity.value = withTiming(focusMode ? 0 : 1, { duration: 500 });
  };
  
  // Animated style for focus mode overlay
  const focusOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: focusOpacity.value,
      display: focusOpacity.value === 0 ? 'none' : 'flex',
    };
  });
  
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  return (
    <View style={styles.container}>
      <Header title="Home" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeInDown.duration(500).delay(100)}
          style={styles.greetingContainer}
        >
          <Text style={styles.greeting}>
            {getGreeting()}, {user?.name?.split(' ')[0]}
          </Text>
          <View style={styles.focusModeContainer}>
            <Text style={styles.focusModeLabel}>Focus Mode</Text>
            <Switch
              value={focusMode}
              onValueChange={toggleFocusMode}
              trackColor={{ false: colors.background.container, true: colors.button.primary }}
              thumbColor={colors.text.primary}
              ios_backgroundColor={colors.background.container}
              style={styles.switch}
            />
          </View>
        </Animated.View>
        
        <View style={styles.cardsContainer}>
          <Animated.View entering={FadeInDown.duration(500).delay(200)}>
            <Link href="/habit-summary" asChild>
              <TouchableOpacity activeOpacity={0.8}>
                <Card style={styles.card}>
                  <View style={styles.cardIconContainer}>
                    <ListTodo size={24} color={colors.button.primary} />
                  </View>
                  <Text style={styles.cardTitle}>Habit Summary</Text>
                  <Text style={styles.cardDescription}>
                    Track your daily habits and progress
                  </Text>
                  <View style={styles.cardFooter}>
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: '70%' }]} />
                      </View>
                      <Text style={styles.progressText}>70% Complete</Text>
                    </View>
                    <ArrowRight size={16} color={colors.text.muted} />
                  </View>
                </Card>
              </TouchableOpacity>
            </Link>
          </Animated.View>
          
          <Animated.View entering={FadeInDown.duration(500).delay(300)}>
            <Link href="/check-ins" asChild>
              <TouchableOpacity activeOpacity={0.8}>
                <Card style={styles.card}>
                  <View style={styles.cardIconContainer}>
                    <CheckCircle2 size={24} color={colors.status.success} />
                  </View>
                  <Text style={styles.cardTitle}>Progress Check-ins</Text>
                  <Text style={styles.cardDescription}>
                    Update your goals and track progress
                  </Text>
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardFooterText}>Last check-in: 2 days ago</Text>
                    <ArrowRight size={16} color={colors.text.muted} />
                  </View>
                </Card>
              </TouchableOpacity>
            </Link>
          </Animated.View>
          
          <Animated.View entering={FadeInDown.duration(500).delay(400)}>
            <Link href="/internet-bite" asChild>
              <TouchableOpacity activeOpacity={0.8}>
                <Card style={styles.card}>
                  <View style={styles.cardIconContainer}>
                    <Globe size={24} color={colors.button.accent} />
                  </View>
                  <Text style={styles.cardTitle}>Internet Bite</Text>
                  <Text style={styles.cardDescription}>
                    Quick and insightful news updates
                  </Text>
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardFooterText}>5 new updates</Text>
                    <ArrowRight size={16} color={colors.text.muted} />
                  </View>
                </Card>
              </TouchableOpacity>
            </Link>
          </Animated.View>
          
          <Animated.View entering={FadeInDown.duration(500).delay(500)}>
            <Link href="/alarms" asChild>
              <TouchableOpacity activeOpacity={0.8}>
                <Card style={styles.card}>
                  <View style={styles.cardIconContainer}>
                    <BellRing size={24} color={colors.status.warning} />
                  </View>
                  <Text style={styles.cardTitle}>Alarm Creation</Text>
                  <Text style={styles.cardDescription}>
                    Set reminders for important tasks
                  </Text>
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardFooterText}>Next alarm: 8:00 AM</Text>
                    <ArrowRight size={16} color={colors.text.muted} />
                  </View>
                </Card>
              </TouchableOpacity>
            </Link>
          </Animated.View>
        </View>
      </ScrollView>
      
      {/* Focus Mode Overlay */}
      <Animated.View style={[styles.focusOverlay, focusOverlayStyle]}>
        <Card style={styles.focusCard}>
          <Clock size={48} color={colors.button.primary} />
          <Text style={styles.focusTitle}>Focus Mode Active</Text>
          <Text style={styles.focusDescription}>
            Notifications are paused and distractions minimized.
            Stay focused on your current task.
          </Text>
          <TouchableOpacity 
            style={styles.endFocusButton}
            onPress={toggleFocusMode}
          >
            <Text style={styles.endFocusText}>End Focus Session</Text>
          </TouchableOpacity>
        </Card>
      </Animated.View>
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
  
  greetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  
  greeting: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
  },
  
  focusModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  focusModeLabel: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    marginRight: 8,
  },
  
  switch: {
    transform: [{ scale: 0.8 }],
  },
  
  cardsContainer: {
    gap: 16,
  },
  
  card: {
    padding: 16,
  },
  
  cardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.container,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  cardTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  
  cardDescription: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  cardFooterText: {
    fontSize: fonts.sizes.xs,
    color: colors.text.muted,
  },
  
  progressContainer: {
    flex: 1,
    marginRight: 16,
  },
  
  progressBar: {
    height: 4,
    backgroundColor: colors.background.container,
    borderRadius: 2,
    marginBottom: 4,
    overflow: 'hidden',
  },
  
  progressFill: {
    height: '100%',
    backgroundColor: colors.button.primary,
    borderRadius: 2,
  },
  
  progressText: {
    fontSize: fonts.sizes.xs,
    color: colors.text.muted,
  },
  
  // Focus mode overlay
  focusOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(16, 23, 37, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    zIndex: 1000,
  },
  
  focusCard: {
    padding: 24,
    alignItems: 'center',
    maxWidth: 320,
  },
  
  focusTitle: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  
  focusDescription: {
    fontSize: fonts.sizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  
  endFocusButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.button.primary,
  },
  
  endFocusText: {
    color: colors.button.primary,
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.medium,
  },
});