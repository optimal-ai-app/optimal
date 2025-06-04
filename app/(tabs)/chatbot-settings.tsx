import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  FadeInDown, 
  useSharedValue, 
  useAnimatedStyle,
  withTiming,
  SlideInRight,
  SlideOutLeft
} from 'react-native-reanimated';
import { 
  ChevronLeft,
  Camera,
  Save,
  Clock
} from 'lucide-react-native';

import { Card } from '@/src/components/Card';
import { Button } from '@/src/components/Button';
import { InputField } from '@/src/components/InputField';
import { Slider } from '@/src/components/Slider';
import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';

// Persona type
interface Persona {
  id: string;
  name: string;
  description: string;
  image: string;
}

export default function ChatBotSettingsScreen() {
  // Router for navigation
  const router = useRouter();
  
  // State
  const [botName, setBotName] = useState('Aria');
  const [empathyValue, setEmpathyValue] = useState(70);
  const [logicValue, setLogicValue] = useState(60);
  const [notificationFrequency, setNotificationFrequency] = useState(3);
  const [selectedPersonaIndex, setSelectedPersonaIndex] = useState(0);
  
  // Animation values
  const slideOffset = useSharedValue(0);
  
  // Sample personas
  const personas: Persona[] = [
    {
      id: '1',
      name: 'Supportive Coach',
      description: 'Gentle guidance with a focus on encouragement and support.',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: '2',
      name: 'Productivity Expert',
      description: 'Focused on efficiency and time management strategies.',
      image: 'https://images.pexels.com/photos/4064826/pexels-photo-4064826.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: '3',
      name: 'Accountability Partner',
      description: 'Direct communication with a focus on commitment and follow-through.',
      image: 'https://images.pexels.com/photos/2773977/pexels-photo-2773977.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];
  
  // Navigate back
  const handleBack = () => {
    router.back();
  };
  
  // Save settings
  const handleSave = () => {
    // In a real app, save settings to storage/API
    alert('Settings saved successfully!');
    router.back();
  };
  
  // Handle persona swipe
  const handlePrevPersona = () => {
    if (selectedPersonaIndex > 0) {
      slideOffset.value = -100;
      
      setTimeout(() => {
        setSelectedPersonaIndex(selectedPersonaIndex - 1);
        slideOffset.value = 100;
        
        setTimeout(() => {
          slideOffset.value = withTiming(0, { duration: 300 });
        }, 50);
      }, 300);
    }
  };
  
  const handleNextPersona = () => {
    if (selectedPersonaIndex < personas.length - 1) {
      slideOffset.value = 100;
      
      setTimeout(() => {
        setSelectedPersonaIndex(selectedPersonaIndex + 1);
        slideOffset.value = -100;
        
        setTimeout(() => {
          slideOffset.value = withTiming(0, { duration: 300 });
        }, 50);
      }, 300);
    }
  };
  
  // Animated styles
  const personaAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideOffset.value }],
    };
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
        >
          <ChevronLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bot Settings</Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Save size={20} color={colors.text.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Bot Profile */}
        <Animated.View entering={FadeInDown.duration(500).delay(100)}>
          <Card style={styles.profileCard}>
            <Text style={styles.sectionTitle}>Bot Profile</Text>
            
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: personas[selectedPersonaIndex].image }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.cameraButton}>
                <Camera size={20} color={colors.text.primary} />
              </TouchableOpacity>
            </View>
            
            <InputField
              label="Bot Name"
              value={botName}
              onChangeText={setBotName}
              style={styles.nameInput}
            />
          </Card>
        </Animated.View>
        
        {/* Persona Selector */}
        <Animated.View entering={FadeInDown.duration(500).delay(200)}>
          <Card style={styles.personaCard}>
            <Text style={styles.sectionTitle}>Persona</Text>
            
            <View style={styles.personaSelector}>
              <TouchableOpacity
                style={[
                  styles.personaArrow,
                  selectedPersonaIndex === 0 && styles.personaArrowDisabled,
                ]}
                onPress={handlePrevPersona}
                disabled={selectedPersonaIndex === 0}
              >
                <ChevronLeft
                  size={24}
                  color={
                    selectedPersonaIndex === 0
                      ? colors.text.muted
                      : colors.text.primary
                  }
                />
              </TouchableOpacity>
              
              <Animated.View
                style={[styles.personaContent, personaAnimatedStyle]}
              >
                <Text style={styles.personaName}>
                  {personas[selectedPersonaIndex].name}
                </Text>
                <Text style={styles.personaDescription}>
                  {personas[selectedPersonaIndex].description}
                </Text>
              </Animated.View>
              
              <TouchableOpacity
                style={[
                  styles.personaArrow,
                  selectedPersonaIndex === personas.length - 1 &&
                    styles.personaArrowDisabled,
                ]}
                onPress={handleNextPersona}
                disabled={selectedPersonaIndex === personas.length - 1}
              >
                <ChevronLeft
                  size={24}
                  color={
                    selectedPersonaIndex === personas.length - 1
                      ? colors.text.muted
                      : colors.text.primary
                  }
                  style={{ transform: [{ rotate: '180deg' }] }}
                />
              </TouchableOpacity>
            </View>
            
            <View style={styles.personaDots}>
              {personas.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.personaDot,
                    index === selectedPersonaIndex && styles.personaDotActive,
                  ]}
                />
              ))}
            </View>
          </Card>
        </Animated.View>
        
        {/* Tone Sliders */}
        <Animated.View entering={FadeInDown.duration(500).delay(300)}>
          <Card style={styles.slidersCard}>
            <Text style={styles.sectionTitle}>Tone & Style</Text>
            
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
          </Card>
        </Animated.View>
        
        {/* Notification Frequency */}
        <Animated.View entering={FadeInDown.duration(500).delay(400)}>
          <Card style={styles.notificationCard}>
            <View style={styles.notificationHeader}>
              <Text style={styles.sectionTitle}>Notification Frequency</Text>
              <Clock size={20} color={colors.text.secondary} />
            </View>
            
            <Text style={styles.notificationDescription}>
              How many times per day should your AI agent check in with you?
            </Text>
            
            <View style={styles.frequencySelector}>
              {[1, 2, 3, 4, 5].map((num) => (
                <TouchableOpacity
                  key={num}
                  style={[
                    styles.frequencyOption,
                    notificationFrequency === num && styles.frequencyOptionSelected,
                  ]}
                  onPress={() => setNotificationFrequency(num)}
                >
                  <Text
                    style={[
                      styles.frequencyText,
                      notificationFrequency === num && styles.frequencyTextSelected,
                    ]}
                  >
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>
        </Animated.View>
        
        {/* Save Button */}
        <Animated.View entering={FadeInDown.duration(500).delay(500)}>
          <Button
            title="Save Settings"
            onPress={handleSave}
            fullWidth
            style={styles.saveSettingsButton}
          />
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
  
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.utility.divider,
  },
  
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  
  headerTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
  },
  
  saveButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  
  scrollView: {
    flex: 1,
  },
  
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  
  sectionTitle: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 16,
  },
  
  profileCard: {
    padding: 16,
  },
  
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.background.container,
  },
  
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.button.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  nameInput: {
    marginTop: 8,
  },
  
  personaCard: {
    padding: 16,
    marginTop: 16,
  },
  
  personaSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  personaArrow: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  personaArrowDisabled: {
    opacity: 0.5,
  },
  
  personaContent: {
    flex: 1,
    paddingHorizontal: 8,
  },
  
  personaName: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 4,
    textAlign: 'center',
  },
  
  personaDescription: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  
  personaDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  
  personaDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.background.container,
    marginHorizontal: 4,
  },
  
  personaDotActive: {
    backgroundColor: colors.button.primary,
  },
  
  slidersCard: {
    padding: 16,
    marginTop: 16,
  },
  
  notificationCard: {
    padding: 16,
    marginTop: 16,
  },
  
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  
  notificationDescription: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  
  frequencySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  frequencyOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background.container,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  frequencyOptionSelected: {
    backgroundColor: colors.button.primary,
  },
  
  frequencyText: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.bold,
    color: colors.text.secondary,
  },
  
  frequencyTextSelected: {
    color: colors.text.primary,
  },
  
  saveSettingsButton: {
    marginTop: 24,
  },
});