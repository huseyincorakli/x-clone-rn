import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePosts } from "@/hooks/usePosts";
import { Post } from "@/types";
import PostCard from "./PostCard";

const PostList = () => {
  const { currentUser } = useCurrentUser();
  const {
    posts,
    isLoading,
    checkIsLiked,
    deletePost,
    error,
    refetch,
    toggleLike,
  } = usePosts();

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
          onPress={() => refetch}
          className="bg-blue-500 px-3  py-1 rounded-xl "
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if(posts.length===0){
    return(
        <View className="items-center p-4">
            <Text className="text-gray-500 font-semibold">No posts yet</Text>
        </View>
    )
  }

  return (
    <>
    {posts.map((post:Post)=>(
        <PostCard
          key={post._id}
          post={post}
          onLike={toggleLike}
          onDelete={deletePost}
          currentUser={currentUser}
          isLiked={checkIsLiked(post.likes,currentUser)}
        />
    ))}
    </>
  );
};

export default PostList;
