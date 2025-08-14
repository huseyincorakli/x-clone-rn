import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useCreatePost } from "@/hooks/useCreatePost";
import { useUser } from "@clerk/clerk-expo";
import { Feather, Ionicons } from "@expo/vector-icons";

const PostComposer = () => {
  const {
    content,
    createPost,
    isCreating,
    pickImageFromGallery,
    removeImage,
    selectedImage,
    setContent,
    takePhoto,
  } = useCreatePost();

  const { user } = useUser();

  const deneme = ()=>{
    console.log("deneme");
    
  }

  return (
    <View className="bg-white border-b border-gray-300 p-2">
      <View className="p-2">
        <View className="flex-row ">
          <Image
            source={{ uri: user?.imageUrl }}
            className="size-12  rounded-full"
          />
          <TextInput
            className="text-gray-600 p-2 text-lg pr-6"
            multiline
            value={content}
            onChangeText={setContent}
            maxLength={300}
            placeholder="Whats happening?"
            placeholderTextColor={"#657786"}
          />
        </View>
      </View>

      {selectedImage && (
        <View>
          <View>
            <Image
              source={{ uri: selectedImage }}
              className="w-full h-48 rounded-lg"
              resizeMode="cover"
            />

            <TouchableOpacity
              className="absolute top-2 right-2 p-2 bg-black rounded-full"
              onPress={removeImage}
            >
              <Feather name="x" size={16} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View className="flex-row flex justify-between p-2">
        <View className="flex-row gap-2">
          <TouchableOpacity onPress={pickImageFromGallery}>
            <Ionicons name="image" size={25} color={"#1da1f2"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto}>
            <Ionicons name="camera" size={25} color={"#1da1f2"} />
          </TouchableOpacity>
        </View>
        {content.length>0 &&(
            <View className="flex-row justify-center items-center gap-3">
           <View>
             {content.length > 0 && (
            <Text
              className={`ml-auto text-sm text-gray-500  ${content.length > 200 && "text-red-500"}`}
            >
              {300 - content.length}/300
            </Text>
          )}
           </View>
        <TouchableOpacity 
        className="bg-blue-400 px-3 py-1 rounded-full"
        onPress={createPost}
        disabled={isCreating || !(content.trim() || selectedImage)}
        >
          {isCreating ? (<Text>Please wait</Text>): <Text className="font-bold text-sm text-white">Post</Text>}
        </TouchableOpacity>
        </View>
        )}
      </View>
    </View>
  );
};

export default PostComposer;
