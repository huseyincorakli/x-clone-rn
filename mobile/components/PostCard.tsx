import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { Post, User } from "@/types";
import { formatDate, formatNumber } from "@/utils/formatter";
import { AntDesign, Feather } from "@expo/vector-icons";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onDelete: (postId: string) => void;
  currentUser: User;
  isLiked: boolean;
  deletePostLoading:boolean;
  onComment: (post: Post) => void;
}

const PostCard = ({
  post,
  onLike,
  onDelete,
  currentUser,
  isLiked,
  deletePostLoading,
  onComment
}: PostCardProps) => {
  const isOwnPost = post.user?._id == currentUser?._id;
  const user = post.user;
  

  const handleDelete =(postId:string)=>{
    Alert.alert("Delete Posts","Are you sure you want to delete this post?",[
      {text:"Cancel",style:'cancel'},
      {text:"Delete", style:'destructive',onPress:()=>onDelete(postId)}
    ])
    
  }

  const handleLike =(postId:string)=>{
    onLike(postId)
  }
 


  return (
    <View className="border-b border-gray-200 bg-white ">
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
                @{user.userName} · {formatDate(post.createdAt)}{" "}
              </Text>
            </View>
            {isOwnPost && (
              <TouchableOpacity disabled={deletePostLoading} onPress={()=>handleDelete(post._id)}>
                {deletePostLoading ? (<ActivityIndicator  size={18} />):(<Feather name="trash" size={18} />)}
              </TouchableOpacity>
            )}
          </View>
          {post.content &&(
            <View>
              <Text className="text-gray-900 leading-5 text-base mb-1">{post.content}</Text>
            </View>
          )}
          {post.image&&(
           <View>
             <Image source={{uri:post.image}} className="w-full h-48 rounded-2xl" resizeMode="cover"/>
           </View>
          )}

          <View className="flex-row justify-between max-w-72 mx-2 mt-1.5">
            <TouchableOpacity onPress={()=>onComment(post)} className="flex-row items-center">
              <Feather name="message-square" size={18} color={'#657786'}/>
              <Text className="text-gray text-sm ml-2">{formatNumber(post.comments?.length) || 0}</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center">
              <Feather name="repeat" size={18} color={'#657786'}/>
              <Text className="text-gray-500 text-sm ml-2">0</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleLike(post._id)} className="flex-row items-center">
              {isLiked ? (<AntDesign name="heart" color={'red'} size={18}/>):(<Feather name="heart" color={'#657786'} size={18}/>)}
              <Text className="text-gray-500 text-sm ml-2">{formatNumber(post.likes?.length) || 0 }</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="share" color={'#657786'} size={18}/>
            </TouchableOpacity>
          </View>
        </View>


      </View>
    </View>
  );
};

export default PostCard;
