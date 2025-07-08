import React, { useState } from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown
} from 'react-native-reanimated'
import { MessageSquare, CreditCard as Edit3 } from 'lucide-react-native'

import { styles } from './GoalCreationModal.styles'
import { colors } from '../../constants/colors'

type GoalCreationOption = 'agent' | 'manual' | null

interface GoalCreationModalProps {
  visible: boolean
  onClose: () => void
  onCreateWithAgent: () => void
  onCreateManually: () => void
}

export const GoalCreationModal: React.FC<GoalCreationModalProps> = ({
  visible,
  onClose,
  onCreateWithAgent,
  onCreateManually
}) => {
  const [selectedOption, setSelectedOption] = useState<GoalCreationOption>(null)

  const handleContinue = () => {
    if (selectedOption === 'agent') {
      onCreateWithAgent()
    } else if (selectedOption === 'manual') {
      onCreateManually()
    }
    onClose()
    setSelectedOption(null)
  }

  const handleClose = () => {
    onClose()
    setSelectedOption(null)
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType='none'
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        style={styles.overlay}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <Animated.View
                entering={SlideInDown.duration(300).springify()}
                exiting={SlideOutDown.duration(200)}
                style={styles.modalContainer}
              >
                <View style={styles.header}>
                  <Text style={styles.title}>Create New Goal</Text>
                  <Text style={styles.subtitle}>
                    Choose how you'd like to create your goal
                  </Text>
                </View>

                <View style={styles.optionsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      selectedOption === 'agent' && styles.optionButtonActive
                    ]}
                    onPress={() => setSelectedOption('agent')}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.optionIcon,
                        selectedOption === 'agent' && styles.optionIconActive
                      ]}
                    >
                      <MessageSquare
                        size={24}
                        color={
                          selectedOption === 'agent'
                            ? colors.text.primary
                            : colors.button.primary
                        }
                      />
                    </View>
                    <Text style={styles.optionTitle}>With AI Agent</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      selectedOption === 'manual' && styles.optionButtonActive
                    ]}
                    onPress={() => setSelectedOption('manual')}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.optionIcon,
                        selectedOption === 'manual' && styles.optionIconActive
                      ]}
                    >
                      <Edit3
                        size={24}
                        color={
                          selectedOption === 'manual'
                            ? colors.text.primary
                            : colors.button.accent
                        }
                      />
                    </View>
                    <Text style={styles.optionTitle}>Create Myself</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleClose}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.continueButton,
                      !selectedOption && styles.continueButtonDisabled
                    ]}
                    onPress={handleContinue}
                    disabled={!selectedOption}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.continueButtonText,
                        !selectedOption && styles.continueButtonTextDisabled
                      ]}
                    >
                      Continue
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </Modal>
  )
}
