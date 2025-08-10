import { Feather } from '@expo/vector-icons'
import {  ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const TrendingTopics=[
  {topic:"#ReactNative",tweets:"250K"},
  {topic:"#AnanıdaAlGit",tweets:"150K"},
  {topic:"#AI",tweets:"50K"},
  {topic:"#WebDevelopment",tweets:"46K"},
  {topic:"#TechNews",tweets:"25K"},
  
]

const location="Turkiye"

const SearchScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      {/*Header*/}
      <View className='p-3 border-b border-gray-100'>
        <View className=' flex-row items-center bg-gray-100 rounded-full px-3'>
          <Feather name='search' size={20} color={'#657786'} />
          <TextInput 
            placeholder='Search Twitter'
            className='flex-1 text-base'
            placeholderTextColor={'#657786'}
          />
        </View>
      </View>

      {/*Topics*/}
      <ScrollView className='flex-1 bg-white'>
        <View className='p-3'>
          <Text className='text-xl font-bold text-gray-900'>Trending for you</Text>
          {TrendingTopics.map((trendingTopic,index)=>(
            <TouchableOpacity key={index} className='py-3 border-b border-gray-100'>
              <Text className='text-gray-500 text-sm'>Trending in {location}</Text>
              <Text className='font-bold text-gray-900 text-lg'>{trendingTopic.topic}</Text>
              <Text className='text-gray-500 text-sm'>{trendingTopic.tweets} Tweets</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchScreen