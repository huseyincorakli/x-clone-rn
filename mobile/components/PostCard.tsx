import { View, Text, Image } from 'react-native'
import React from 'react'
import { Post, User } from '@/types'

interface PostCardProps{
post:Post;
onLike:(postId: string) => void;
onDelete:(postId: string) => void;
currentUser:User;
isLiked:boolean;

}


const PostCard = ({post,onLike,onDelete,currentUser,isLiked}:PostCardProps) => {
  return (
    <View className='p-3  '>
      <View className='border p-1'>
        <Image source={{uri:post.user.profilePicture}} className='size-12 rounded-full'/>
        <Text>{post.user.firstName} {post.user.lastName}</Text>
        <Text>@{JSON.stringify(post.user.userName)}</Text>
      </View>
    </View>
  )
}

export default PostCard