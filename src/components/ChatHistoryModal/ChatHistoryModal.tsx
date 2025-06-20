import React from 'react'
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutRight
} from 'react-native-reanimated'
import { X, MessageSquare, Clock } from 'lucide-react-native'
import { ChatSession } from '@/src/stores/chatStore'
import { colors } from '@/src/constants/colors'
import { fonts } from '@/src/constants/fonts'

interface ChatHistoryModalProps {
  visible: boolean
  onClose: () => void
  chatSessions: ChatSession[]
  onSelectChat: (sessionId: string) => void
  onNewChat: () => void
}

export const ChatHistoryModal: React.FC<ChatHistoryModalProps> = ({
  visible,
  onClose,
  chatSessions,
  onSelectChat,
  onNewChat
}) => {
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) {
      return timestamp.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    } else if (days === 1) {
      return 'Yesterday'
    } else if (days < 7) {
      return `${days} days ago`
    } else {
      return timestamp.toLocaleDateString()
    }
  }

  const handleSelectChat = (sessionId: string) => {
    onSelectChat(sessionId)
    onClose()
  }

  const handleNewChat = () => {
    onNewChat()
    onClose()
  }

  const renderChatItem = ({
    item,
    index
  }: {
    item: ChatSession
    index: number
  }) => (
    <Animated.View
      entering={SlideInRight.duration(300).delay(index * 50)}
      exiting={SlideOutRight.duration(200)}
    >
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => handleSelectChat(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.chatIcon}>
          <MessageSquare size={20} color={colors.button.primary} />
        </View>

        <View style={styles.chatContent}>
          <Text style={styles.chatTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.chatLastMessage} numberOfLines={2}>
            {item.lastMessage}
          </Text>
          <View style={styles.chatMeta}>
            <Clock size={12} color={colors.text.muted} />
            <Text style={styles.chatTimestamp}>
              {formatTimestamp(item.timestamp)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )

  return (
    <Modal
      visible={visible}
      transparent
      animationType='none'
      onRequestClose={onClose}
    >
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
        style={styles.overlay}
      >
        <Animated.View
          entering={SlideInRight.duration(300)}
          exiting={SlideOutRight.duration(200)}
          style={styles.modalContainer}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Chat History</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.newChatButton}
            onPress={handleNewChat}
            activeOpacity={0.8}
          >
            <MessageSquare size={20} color={colors.text.primary} />
            <Text style={styles.newChatText}>Start New Chat</Text>
          </TouchableOpacity>

          {chatSessions.length > 0 ? (
            <FlatList
              data={chatSessions}
              renderItem={renderChatItem}
              keyExtractor={item => item.id}
              style={styles.chatList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.chatListContent}
            />
          ) : (
            <View style={styles.emptyState}>
              <MessageSquare size={48} color={colors.text.muted} />
              <Text style={styles.emptyText}>No chat history yet</Text>
              <Text style={styles.emptySubtext}>
                Start a conversation to see your chat history here
              </Text>
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },

  modalContainer: {
    backgroundColor: colors.background.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingTop: 20
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.utility.divider
  },

  title: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary
  },

  closeButton: {
    padding: 4
  },

  newChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.button.primary,
    marginHorizontal: 20,
    marginVertical: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: 'center'
  },

  newChatText: {
    color: colors.text.primary,
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.semibold,
    marginLeft: 8
  },

  chatList: {
    flex: 1
  },

  chatListContent: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },

  chatItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.background.container,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.utility.divider
  },

  chatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(61, 74, 211, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },

  chatContent: {
    flex: 1
  },

  chatTitle: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.semibold,
    color: colors.text.primary,
    marginBottom: 4
  },

  chatLastMessage: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    lineHeight: 18,
    marginBottom: 8
  },

  chatMeta: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  chatTimestamp: {
    fontSize: fonts.sizes.xs,
    color: colors.text.muted,
    marginLeft: 4
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60
  },

  emptyText: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.semibold,
    color: colors.text.primary,
    marginTop: 16,
    marginBottom: 8
  },

  emptySubtext: {
    fontSize: fonts.sizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20
  }
})
