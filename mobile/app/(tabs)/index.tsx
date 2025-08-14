import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignOutButton from '@/components/SignOutButton'
import { useUserSync } from '@/hooks/useUserSync'
import { Ionicons } from '@expo/vector-icons'
import PostComposer from '@/components/PostComposer'

const HomeScreen = () => {
  
  useUserSync();
  return (
    <SafeAreaView className='flex-1' edges={["top"]}>

      <View className='flex-row justify-between items-center p-3 border-b border-gray-300'>
        <Ionicons name='logo-twitter' size={23} color={'#1da1f2'} />
        <Text className='font-bold text-xl'>Home</Text>
        <SignOutButton/>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}
       className='flex-1' 
       contentContainerStyle={{paddingBottom:80}}
       
       > 
        <PostComposer/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen