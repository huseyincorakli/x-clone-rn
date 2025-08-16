import { View, Text } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

const NoNotifications = () => {
  return (
    <View className="flex-1 justify-center items-center  gap-5">
              <Feather name="bell" size={90} color={"gray"} />
              <View className=" items-center max-w-xs ">
                <Text className="text-3xl mb-5 text-gray-400">No notifications yet</Text>
                <Text className="text-base text-gray-400">When people like, comment or follow you,</Text>
                <Text className="text-base text-gray-400"> you'll see it here</Text>
              </View>
            </View>
  )
}

export default NoNotifications