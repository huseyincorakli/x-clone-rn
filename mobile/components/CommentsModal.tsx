import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { useComments } from "@/hooks/useComments";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import PostCard from "./PostCard";
import { Post } from "@/types";
import { formatDate } from "@/utils/formatter";
import { Feather } from "@expo/vector-icons";

interface CommentsModalProps {
  selectedPost: Post;
  onClose: () => void;
}

const CommentsModal = ({ onClose, selectedPost }: CommentsModalProps) => {
  const { commentText, createComment, isCreatingComment, setCommentText } =
    useComments();
  const { currentUser } = useCurrentUser();
  const user = selectedPost?.user;
  const handleClose = () => {
    onClose();
    setCommentText("");
  };


  return (
    <Modal
      visible={!!selectedPost}
      animationType="slide"
      className=" flex-1 "
      transparent={true}
    >
      <View className=" bg-white rounded-3xl  flex-1  p-3  ">
        <View className=" flex-row  items-center justify-between border-b border-gray-300 py-2 px-2.5">
          <TouchableOpacity onPress={handleClose}>
            <Text className="text-lg font-medium text-blue-600">Close</Text>
          </TouchableOpacity>
          <Text className="text-lg font-bold ">Comments</Text>
          <View className="w-12" />
        </View>

        {selectedPost && user && (
          <ScrollView>
            <View className="flex-row p-2 gap-1">
              <Image
                source={{ uri: user.profilePicture }}
                className="size-12 rounded-full mt-1"
              />
              <View className="flex-1 p-1">
                <View className="flex-row  justify-between items-center">
                  <View className="flex-row gap-1">
                    <Text className="font-bold">
                      {user.firstName} {user.lastName}
                    </Text>
                    <Text className="font-normal text-sm text-gray-400">
                      @{user.userName} ·{" "}
                      {formatDate(selectedPost.createdAt)}{" "}
                    </Text>
                  </View>
                </View>
                {selectedPost.content && (
                  <View>
                    <Text className="text-gray-900 leading-5 text-base mb-1">
                      {selectedPost.content}
                    </Text>
                  </View>
                )}
                {selectedPost.image && (
                  <View>
                    <Image
                      source={{ uri: selectedPost.image }}
                      className="w-full h-48 rounded-2xl"
                      resizeMode="cover"
                    />
                  </View>
                )}
              </View>
            </View>
            <View className="flex-row  gap-1 p-2 border-b border-gray-300">
              <Image
                source={{ uri: currentUser?.profilePicture }}
                className="size-12 rounded-full "
              />
              <View className="flex-1 p-1">
                <TextInput
                  placeholder="text here"
                  className="border border-gray-400 rounded-lg "
                  value={commentText}
                  onChangeText={setCommentText}
                />
              </View>
              <TouchableOpacity
                disabled={!commentText || isCreatingComment}
                onPress={() => createComment(selectedPost._id)}
                className="items-center justify-center  "
              >
                <Feather name="send" size={23} color={"black"} />
              </TouchableOpacity>
            </View>
            {selectedPost.comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((comment) => (
              <View key={comment._id} className="flex-row p-2 px-6 gap-2 border-b border-gray-200 rounded-full ">
                <Image
                  source={{ uri: comment.user.profilePicture }}
                  className="size-12 rounded-full mt-1"
                />
                <View className="flex-1 p-1">
                  <View className="flex-row  justify-between items-center">
                    <View className="flex-row gap-1">
                      <Text className="font-bold">
                        {comment.user.firstName} {comment.user.lastName}
                      </Text>
                      <Text className="font-normal text-sm text-gray-400">
                        @{comment.user.userName} ·{" "}
                        {formatDate(comment.createdAt)}{" "}
                      </Text>
                    </View>
                  </View>
                  <Text>{comment.content}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </Modal>
  );
};

export default CommentsModal;
