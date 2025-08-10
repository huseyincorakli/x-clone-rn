import {  Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { Text, View } from 'react-native';

export default function AuthRoutesLayout() {
  const { isSignedIn,isLoaded } = useAuth()

  if (!isLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  if (isLoaded && isSignedIn) {
    return <Redirect href="/(tabs)" />
  }

  return <Stack screenOptions={{headerShown:false}} />
}