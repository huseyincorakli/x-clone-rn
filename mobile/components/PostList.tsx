import { View, Text, ActivityIndicator, TouchableWithoutFeedback,TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePosts } from "@/hooks/usePosts";
import { Post } from "@/types";
import PostCard from "./PostCard";
import CommentsModal from "./CommentsModal";

const PostList = () => {
  const { currentUser } = useCurrentUser();
  const [selectedPostId, setSelectedPostId] = useState<string>();
  const {
    posts,
    isLoading,
    checkIsLiked,
    deletePost,
    deletePostLoading,
    error,
    refetch,
    toggleLike,
  } = usePosts();

  const selectedPost = selectedPostId 
    ? posts.find((post:Post) => post._id === selectedPostId) 
    : undefined;

  if (isLoading) {
    return (
      <View className="p-4 items-center ">
        <ActivityIndicator size="large" color="#1da1f2" />
        <Text className="text-gray-500 mt-2">Loading posts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="items-center p-4 gap-3">
        <Text className="text-gray-500">Failed to load posts</Text>
        <TouchableOpacity
          onPress={() => refetch()}
          className="bg-blue-500 px-3 py-1 rounded-xl "
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (posts.length === 0) {
    return (
      <View className="items-center p-4">
        <Text className="text-gray-500 font-semibold">No posts yet</Text>
      </View>
    );
  }

  return (
    <>
      {posts.map((post: Post) => (
        <TouchableWithoutFeedback key={post._id+post.user._id} onPress={()=>{setSelectedPostId(post._id)}}>
          <View>
            <PostCard
          key={post._id}
          post={post}
          onLike={toggleLike}
          onDelete={deletePost}
          currentUser={currentUser}
          onComment={(post: Post) => { setSelectedPostId(post._id) }}
          isLiked={checkIsLiked(post.likes, currentUser)}
          deletePostLoading={deletePostLoading}
        />
          </View>
        </TouchableWithoutFeedback>
      ))}
      {selectedPost && (
        <CommentsModal 
          selectedPost={selectedPost} 
          onClose={() => setSelectedPostId(undefined)} 
        />
      )}
    </>
  );
};

export default PostList;