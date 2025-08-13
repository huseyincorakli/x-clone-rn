import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignOutButton from '@/components/SignOutButton'
import { useUserSync } from '@/hooks/useUserSync'

const HomeScreen = () => {
  useUserSync();

 const calistir = async () => {
  try {
    const r = await fetch('https://xwsg4swwscgo0cs00wgkgosg.corhus.space/health');

    if (!r.ok) {
      console.log(`HTTP Hatası: ${r.status}`);
      return;
    }

    const data = await r.json(); // Yanıt JSON formatındaysa
    console.log(data);           // JSON'u konsola yazdır
  } catch (error) {
    console.error('Fetch hatası:', error);
  }
};

  return (
    <SafeAreaView className='flex-1'>
      <Text>index2</Text>
      <Button onPress={()=>{calistir()}} title='Tıkla'></Button>
      <SignOutButton/>
    </SafeAreaView>
  )
}

export default HomeScreen