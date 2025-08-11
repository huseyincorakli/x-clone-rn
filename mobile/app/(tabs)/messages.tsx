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
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {conversationsList.map((conversation) => (
          <TouchableOpacity
            key={conversation.id}
            className="flex-row p-3 items-center border-b border-gray-300 rounded-br-lg rounded-bl-lg"
            onPress={() => openConversation(conversation)}
            onLongPress={() => deleteConversation(conversation.id)}
          >
            <Image
              source={{ uri: conversation.user.avatar }}
              className="size-14 rounded-full"
            />
            <View className="px-2">
              <View className="flex-row justify-between">
                <Text className="font-bold">
                  {conversation.user.name}{" "}
                  {conversation.user.verified && (
                    <Feather name="check-circle" size={13} color={"#1da1f2"} />
                  )}{" "}
                  <Text className="font-normal text-gray-500 text-sm ">
                    @{conversation.user.username}
                  </Text>
                </Text>
                <Text className="text-gray-600 text-sm">
                  {conversation.time}
                </Text>
              </View>
              <Text
                className="text-gray-600 text-sm max-w-80 mt-1"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {conversation.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/*QUICK ACTIONS */}
      <View className="px-4 py-2 border-t border-gray-200 rounded-3xl ">
        <Text className="text-center text-sm text-gray-400">
          Tap top open • Long press to delete
        </Text>
      </View>

      {/*MESSAGE MODAL */}
      <Modal
        transparent={true}
        className="bg-cyan-500"
        visible={isChatOpen}
        animationType="slide"
        presentationStyle="overFullScreen"
      >
        {selectedConversation && (
          <View className="flex-1  rounded-tr-3xl rounded-tl-3xl bg-gray-200">
            {/*MESSAGE MODAL HEADER*/}
            <View className="flex-row items-center py-3 px-1 border-b border-gray-100 ">
              <TouchableOpacity onPress={closeChatModal}>
                <Feather
                  name="arrow-left"
                  size={25}
                  className="p-2"
                  color={"#1da1f2"}
                />
              </TouchableOpacity>
              <Image
                source={{ uri: selectedConversation.user.avatar }}
                className="size-14 rounded-full"
              />
              <View className="px-2">
                <Text className="font-bold text-lg">
                  {selectedConversation.user.name}{" "}
                  {selectedConversation.user.verified && (
                    <Feather name="check-circle" size={16} color={"#1da1f2"} />
                  )}
                </Text>
                <Text className="text-sm text-gray-500">
                  @{selectedConversation.user.username}
                </Text>
              </View>
            </View>

            {/*MESSAGE MODAL CONTENT- MESSAGES SECTION */}
            <ScrollView className="flex-1">
              {selectedConversation.messages.map((message) => (
                <View key={message.id}>
                  {message.fromUser ? (
                    <View className="items-end p-1">
                      <View className="bg-blue-400 max-w-xs p-3 rounded-3xl">
                        <Text className="text-white">{message.text}</Text>
                      </View>
                      <Text className="px-3 text-sm text-gray-400">
                        {message.time}
                      </Text>
                    </View>
                  ) : (
                    <View className="p-2">
                      <View className="flex-row px-1">
                        <Image
                          source={{ uri: selectedConversation.user.avatar }}
                          className="size-10 mr-0.3 rounded-3xl"
                        />
                        <View className="p-4 pt-4 bg-gray-300 max-w-xs mt-2  rounded-3xl">
                          <Text>{message.text}</Text>
                        </View>
                      </View>
                      <Text className="px-12 text-sm  text-gray-400">
                        {message.time}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>

            {/*SEND MESSAGE INPUT-BUTTON */}
            <View className="p-3 flex-row items-center justify-center gap-2 border-t border-gray-300 rounded-full">
              <View className="flex-1">
                <TextInput
                  placeholder="Start a message"
                  className="bg-gray-300 p-4 rounded-full "
                  value={newMessage}
                  onChangeText={setNewMessage}
                />
              </View>
              <TouchableOpacity
                onPress={sendNewMessage}
                disabled={!newMessage.trim()}
                className="bg-gray-400 p-2 rounded-full "
              >
                <Feather name="send" size={20} color={"black"} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default MessagesScreen;
