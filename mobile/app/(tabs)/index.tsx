import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "@/components/SignOutButton";
import { useUserSync } from "@/hooks/useUserSync";
import { Ionicons } from "@expo/vector-icons";
import PostComposer from "@/components/PostComposer";
import PostList from "@/components/PostList";
import { usePosts } from "@/hooks/usePosts";

const HomeScreen = () => {
  const [refreshing, setIsRefreshin] = useState<boolean>(false);
  useUserSync();
  const { refetch: reFetchPosts } = usePosts();

  const handlePullToRefresh = async () => {
    setIsRefreshin(true);
    await reFetchPosts();
    setIsRefreshin(false);
  };
  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <View className="flex-row justify-between items-center p-3 border-b border-gray-300">
        <Ionicons name="logo-twitter" size={23} color={"#1da1f2"} />
        <Text className="font-bold text-xl">Home</Text>
        <SignOutButton />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handlePullToRefresh}
          />
        }
      >
        <PostComposer />
        <PostList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
