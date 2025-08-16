import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { useNotification } from "@/hooks/useNotifications";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import NoNotifications from "@/components/NoNotifications";

const NotificationScreen = () => {
  const {
    deleteNotification,
    error,
    isDeletingNotification,
    isLoading,
    isRefetching,
    notifications,
    refetch,
  } = useNotification();

  if (error) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 gap-5 ">
        <View className="items-center gap-1">
          <Feather name="alert-octagon" size={50} color={"red"} />
          <Text className="font-bold text-red-400 text-2xl">
            Failed to load notifications
          </Text>
        </View>
        <TouchableOpacity
          disabled={isRefetching}
          onPress={() => refetch()}
          className="bg-blue-600 p-2 px-5 rounded-lg"
        >
          {isRefetching ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text className="text-white text-base">Retry</Text>
          )}
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between p-4 border-b border-gray-300">
        <Text className="font-bold text-2xl">Notifications</Text>
        <Feather name="settings" size={24} color={"gray"} />
      </View>

      {isLoading ? (
        <Text>Loading</Text>
      ) : notifications.length === 0 ? (
        <NoNotifications />
      ) : (
        <Text>{JSON.stringify(notifications)}</Text>
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;
