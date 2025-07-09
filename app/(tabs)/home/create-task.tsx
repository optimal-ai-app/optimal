import React from 'react'
import { CreateTaskCardTag } from '@/src/components/AgentTags/CreateTaskCardTag'
import { router } from 'expo-router'
import { globalStyles } from '@/src/constants/styles'
import { SafeAreaView, View } from 'react-native'

export default function CreateTaskScreen () {
  return (
    <SafeAreaView style={[globalStyles.container]}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 8
        }}
      >
        <CreateTaskCardTag
          onConfirm={() => {
            router.replace('/(tabs)/tasks')
          }}
        />
      </View>
    </SafeAreaView>
  )
}
