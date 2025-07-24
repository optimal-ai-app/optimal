import React from 'react'
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
import { CheckCircle2, AlertCircle } from 'lucide-react-native'
import { colors } from '../../constants/colors'
import { fonts } from '../../constants/fonts'
import { StyleSheet } from 'react-native'

interface TaskCompletionModalProps {
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const TaskCompletionModal: React.FC<TaskCompletionModalProps> = ({
  visible,
  onConfirm,
  onCancel
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType='none'
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        style={styles.overlay}
      >
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <Animated.View
                entering={SlideInDown.duration(300).springify()}
                exiting={SlideOutDown.duration(200)}
                style={styles.modalContainer}
              >
                <View style={styles.header}>
                  <View style={styles.iconContainer}>
                    <AlertCircle size={32} color={colors.button.primary} />
                  </View>
                  <Text style={styles.title}>Complete Task?</Text>
                  <Text style={styles.subtitle}>
                    By marking this task complete, you pledge that you have
                    fully completed it. Remember - marking tasks complete
                    without doing them only cheats yourself of real progress.
                  </Text>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={onCancel}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.cancelButtonText}>No, Not Yet</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={onConfirm}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.confirmButtonText}>Yes, Complete</Text>
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

const styles = StyleSheet.create({
  overlay: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.utility.backdrop,
    justifyContent: 'center',
    alignItems: 'center'
  },

  modalContainer: {
    backgroundColor: colors.background.card,
    borderRadius: 24,
    padding: 24,
    width: '85%',
    maxWidth: 380,
    borderWidth: 1,
    borderColor: colors.utility.border,
    shadowColor: colors.utility.shadow,
    shadowOffset: {
      width: 0,
      height: 16
    },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 16
  },

  header: {
    alignItems: 'center',
    marginBottom: 24
  },

  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.background.container,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },

  title: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: 'center'
  },

  subtitle: {
    fontSize: fonts.sizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 22
  },

  taskTitle: {
    fontSize: fonts.sizes.sm,
    color: colors.text.primary,
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.8
  },

  actionButtons: {
    flexDirection: 'row',
    gap: 12
  },

  cancelButton: {
    flex: 1,
    backgroundColor: colors.background.container,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.utility.border
  },

  cancelButtonText: {
    fontSize: fonts.sizes.md,
    color: colors.text.secondary,
    fontWeight: fonts.weights.medium
  },

  confirmButton: {
    flex: 1.2,
    backgroundColor: colors.button.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    shadowColor: colors.button.primary,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6
  },

  confirmButtonText: {
    fontSize: fonts.sizes.md,
    color: colors.text.primary,
    fontWeight: fonts.weights.bold
  }
})
