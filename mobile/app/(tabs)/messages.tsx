import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { CONVERSATIONS, ConversationType } from "@/data/conversations";

const MessagesScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState<string>("");
  const [conversationsList, setConversationLists] =
    useState<ConversationType[]>(CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>("");

  const deleteConversation = (conversationId: number) => {
    Alert.alert(
      "Delete Conversation",
      "Are you sure you want to delete this conversation",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setConversationLists((prev) =>
              prev.filter((conv) => conv.id == conversationId)
            );
          },
        },
      ]
    );
  };

  const openConversation = (conversation: ConversationType) => {
    setSelectedConversation(conversation);
    setIsChatOpen(true);
  };

  const closeChatModal = () => {
    setIsChatOpen(false);
    setSelectedConversation(null);
    setNewMessage("");
  };

  const sendNewMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      setConversationLists((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: newMessage, time: "now" }
            : conv
        )
      );
      setNewMessage("");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/*HEADER*/}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <Text className="text-xl font-bold text-gray-900">Messages</Text>
        <TouchableOpacity>
          <Feather name="edit" size={24} color={"#1da1f2"} />
        </TouchableOpacity>
      </View>

      {/*SEARCHBAR*/}
      <View className="border-b border-gray-200 py-2">
        <View className="flex-row items-center px-3  mx-1   bg-gray-200 rounded-full">
          <Feather name="search" size={24} color={"#657786"} />
          <TextInput
            placeholder="Search for people and groups"
            className="flex-1 ml-1 text-base"
            placeholderTextColor={"#657786"}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>
      {/*CONVERSATION LIST*/}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {conversationsList.map((conversation)=>(
          <TouchableOpacity 
          key={conversation.id} 
          className="flex-row p-3 items-center border-b border-gray-300 rounded-br-lg rounded-bl-lg"
          onPress={()=>openConversation(conversation)}
          onLongPress={()=>deleteConversation(conversation.id)}
          >
            <Image source={{uri:conversation.user.avatar}} className="size-14 rounded-full"/>
            <View className="px-2">
              <View className="flex-row justify-between">
              <Text className="font-bold">{conversation.user.name} <Text className="font-normal text-gray-500 text-sm ">@{conversation.user.username}</Text></Text>
              <Text className="text-gray-600 text-sm">{conversation.time}</Text>
              </View>
              <Text className="text-gray-600 text-sm max-w-80 mt-1" numberOfLines={1} ellipsizeMode="tail">{conversation.lastMessage}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/*QUICK ACTIONS */}
      <View className="px-4 py-2 border-t border-gray-200 rounded-3xl ">
        <Text className="text-center text-sm text-gray-400">Tap top open • Long press to delete</Text>
      </View>

      <Modal visible={isChatOpen} animationType="slide" presentationStyle="overFullScreen">
      </Modal>
    </SafeAreaView>
  );
};

export default MessagesScreen;
