import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Switch, 
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { 
  Calendar, 
  FileText, 
  Bell, 
  LogOut, 
  Crown, 
  ChevronRight,
  Cog,
  Lock
} from 'lucide-react-native';

import { Card } from '@/src/components/Card';
import { Header } from '@/src/components/Header';
import { Slider } from '@/src/components/Slider';
import { Button } from '@/src/components/Button';
import { useAuthContext } from '@/src/context/AuthContext';
import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';

export default function SettingsScreen() {
  // Router for navigation
  const router = useRouter();
  
  // Get auth context for sign out
  const { signOut } = useAuthContext();
  
  // State for switches and selections
  const [calendarSync, setCalendarSync] = useState(true);
  const [notesSync, setNotesSync] = useState(false);
  const [remindersSync, setRemindersSync] = useState(true);
  const [coachType, setCoachType] = useState<'neutral' | 'grit'>('neutral');
  const [empathyValue, setEmpathyValue] = useState(70);
  const [logicValue, setLogicValue] = useState(60);
  
  // Handle sign out
  const handleSignOut = async () => {
    if (Platform.OS === 'web') {
      // Web doesn't have Alert.alert, use window.confirm
      if (window.confirm('Are you sure you want to sign out?')) {
        await signOut();
      }
    } else {
      Alert.alert(
        'Sign Out',
        'Are you sure you want to sign out?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Sign Out',
            onPress: async () => {
              await signOut();
            },
            style: 'destructive',
          },
        ]
      );
    }
  };
  
  // Handle calendar connection
  const handleConnectCalendar = () => {
    // In a real app, this would show OAuth flow for calendar
    alert('Calendar connection initiated');
  };
  
  return (
    <View style={styles.container}>
      <Header title="Settings" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Subscription Section */}
        <Animated.View entering={FadeInDown.duration(500).delay(100)}>
          <Card style={styles.subscriptionCard}>
            <View style={styles.subscriptionHeader}>
              <View style={styles.crownContainer}>
                <Crown size={24} color={colors.status.warning} />
              </View>
              <View style={styles.subscriptionInfo}>
                <Text style={styles.subscriptionTitle}>Premium Plan</Text>
                <Text style={styles.subscriptionDetail}>
                  Active until Dec 31, 2025
                </Text>
              </View>
            </View>
            
            <Button
              title="Manage Subscription"
              variant="secondary"
              fullWidth
              style={styles.subscriptionButton}
            />
          </Card>
        </Animated.View>
        
        {/* Privacy Section */}
        <Animated.View entering={FadeInDown.duration(500).delay(200)}>
          <Card style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Lock size={20} color={colors.text.primary} />
              <Text style={styles.sectionTitle}>Privacy</Text>
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Calendar size={20} color={colors.button.primary} />
                <Text style={styles.settingText}>Calendar Sync</Text>
              </View>
              <Switch
                value={calendarSync}
                onValueChange={setCalendarSync}
                trackColor={{ false: colors.background.container, true: colors.button.primary }}
                thumbColor={colors.text.primary}
                ios_backgroundColor={colors.background.container}
              />
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <FileText size={20} color={colors.button.accent} />
                <Text style={styles.settingText}>Notes Sync</Text>
              </View>
              <Switch
                value={notesSync}
                onValueChange={setNotesSync}
                trackColor={{ false: colors.background.container, true: colors.button.primary }}
                thumbColor={colors.text.primary}
                ios_backgroundColor={colors.background.container}
              />
            </View>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Bell size={20} color={colors.status.warning} />
                <Text style={styles.settingText}>Reminders Sync</Text>
              </View>
              <Switch
                value={remindersSync}
                onValueChange={setRemindersSync}
                trackColor={{ false: colors.background.container, true: colors.button.primary }}
                thumbColor={colors.text.primary}
                ios_backgroundColor={colors.background.container}
              />
            </View>
          </Card>
        </Animated.View>
        
        {/* Agent Settings */}
        <Animated.View entering={FadeInDown.duration(500).delay(300)}>
          <Card style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Cog size={20} color={colors.text.primary} />
              <Text style={styles.sectionTitle}>Agent Settings</Text>
            </View>
            
            <Link href="/chatbot-settings" asChild>
              <TouchableOpacity style={styles.navItem}>
                <Text style={styles.navItemText}>Manage Bot Settings</Text>
                <ChevronRight size={20} color={colors.text.muted} />
              </TouchableOpacity>
            </Link>
            
            <View style={styles.radioContainer}>
              <Text style={styles.radioLabel}>Coach Persona</Text>
              
              <View style={styles.radioOptions}>
                <TouchableOpacity
                  style={[
                    styles.radioOption,
                    coachType === 'neutral' && styles.radioOptionSelected,
                  ]}
                  onPress={() => setCoachType('neutral')}
                >
                  <Text
                    style={[
                      styles.radioText,
                      coachType === 'neutral' && styles.radioTextSelected,
                    ]}
                  >
                    Neutral Coach
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.radioOption,
                    coachType === 'grit' && styles.radioOptionSelected,
                  ]}
                  onPress={() => setCoachType('grit')}
                >
                  <Text
                    style={[
                      styles.radioText,
                      coachType === 'grit' && styles.radioTextSelected,
                    ]}
                  >
                    Grit Coach
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.sliderContainer}>
              <Slider
                min={0}
                max={100}
                value={empathyValue}
                onValueChange={setEmpathyValue}
                leftLabel="Empathy"
                rightLabel="Tough Love"
                showValue
              />
              
              <Slider
                min={0}
                max={100}
                value={logicValue}
                onValueChange={setLogicValue}
                leftLabel="Logic"
                rightLabel="Emotion"
                showValue
              />
            </View>
            
            <TouchableOpacity
              style={styles.connectButton}
              onPress={handleConnectCalendar}
            >
              <Calendar size={20} color={colors.button.primary} />
              <Text style={styles.connectButtonText}>Connect Calendar</Text>
            </TouchableOpacity>
          </Card>
        </Animated.View>
        
        {/* Sign Out Button */}
        <Animated.View entering={FadeInDown.duration(500).delay(400)}>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <LogOut size={16} color={colors.text.muted} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
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
  
  subscriptionCard: {
    padding: 16,
  },
  
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  crownContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(249, 168, 38, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  
  subscriptionInfo: {
    flex: 1,
  },
  
  subscriptionTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 4,
  },
  
  subscriptionDetail: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
  },
  
  subscriptionButton: {
    marginTop: 8,
  },
  
  sectionCard: {
    padding: 16,
    marginTop: 16,
  },
  
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  sectionTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginLeft: 8,
  },
  
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  settingText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    marginLeft: 12,
  },
  
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(177, 181, 201, 0.2)',
  },
  
  navItemText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
  },
  
  radioContainer: {
    marginVertical: 16,
  },
  
  radioLabel: {
    fontSize: fonts.sizes.md,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  
  radioOptions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  radioOption: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.background.container,
    alignItems: 'center',
    marginRight: 8,
  },
  
  radioOptionSelected: {
    backgroundColor: colors.button.primary,
    borderColor: colors.button.primary,
  },
  
  radioText: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
  },
  
  radioTextSelected: {
    color: colors.text.primary,
    fontWeight: fonts.weights.medium,
  },
  
  sliderContainer: {
    marginVertical: 16,
  },
  
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(61, 74, 211, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  
  connectButtonText: {
    fontSize: fonts.sizes.md,
    color: colors.button.primary,
    marginLeft: 8,
  },
  
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  
  signOutText: {
    fontSize: fonts.sizes.sm,
    color: colors.text.muted,
    marginLeft: 8,
  },
});