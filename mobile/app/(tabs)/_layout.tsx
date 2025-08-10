import {  Tabs } from "expo-router"
import {Feather} from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const TabsLayout = () => {
    const insets = useSafeAreaInsets()
    
  return (
    <Tabs
    screenOptions={{
        tabBarActiveTintColor:"#1DA1F2",
        tabBarInactiveTintColor:"#657786",
        tabBarStyle:{
            backgroundColor:'#fff',
            borderTopWidth:1,
            height:50+insets.bottom,
            paddingTop:8
        },
        headerShown:false
    }}
    >
        <Tabs.Screen
            name="index"
            options={{
                title:"",
                headerShown:false,
                tabBarIcon:({color,size})=><Feather name="home" color={color} size={size} />
            }}
        />
        <Tabs.Screen
            name="search"
            options={{
                title:"",
                headerShown:false,
                tabBarIcon:({color,size})=><Feather name="search" color={color} size={size} />
            }}
        />
        <Tabs.Screen
            name="notifications"
            options={{
                title:"",
                headerShown:false,
                tabBarIcon:({color,size})=><Feather name="bell" color={color} size={size} />
            }}
        />
        <Tabs.Screen
            name="messages"
            options={{
                title:"",
                headerShown:false,
                tabBarIcon:({color,size})=><Feather name="message-circle" color={color} size={size} />
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title:"",
                headerShown:false,
                tabBarIcon:({color,size})=><Feather name="user" color={color} size={size} />
            }}
        />
    </Tabs>
  )
}

export default TabsLayout