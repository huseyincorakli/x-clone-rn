import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Post, User } from "@/types";
import { formatDate } from "@/utils/formatter";
import { Feather } from "@expo/vector-icons";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onDelete: (postId: string) => void;
  currentUser: User;
  isLiked: boolean;
}

const PostCard = ({
  post,
  onLike,
  onDelete,
  currentUser,
  isLiked,
}: PostCardProps) => {
  return (
      <View className="border p-1 flex-row justify-between">
        <View className="flex-row p-2 gap-1">
          <Image
            source={{ uri: post.user.profilePicture }}
            className="size-12 rounded-full"
          />
          <View className=" flex-row gap-1">
            <Text className="font-bold text-base">
            {post.user.firstName} {post.user.lastName}
          </Text>
          <Text className="text-gray-400 text-sm mt-0.5">@{post.user.userName} • {formatDate(post.createdAt)}</Text>
          </View>
        </View>
        <TouchableOpacity className="p-2">
          <Feather name="trash-2" size={18} color={"#1da1f2"} />
        </TouchableOpacity>
      </View>
  );
};

export default PostCard;
