import { useApiClient } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export const useCreatePost = () => {
  const [content, setContent] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const api = useApiClient();
  const queryClient = useQueryClient()

  const createPostMutation =useMutation({
    mutationFn:async(postData:{content:string,imageUri?:string})=>{
        const formData=new FormData();

        if(postData.content) formData.append('content',postData.content)
        
        if(postData.imageUri) {
            const uriParts = postData.imageUri.split('.')
            const fileType = uriParts[uriParts.length-1].toLocaleLowerCase()

            const mimeTypeMap :Record<string,string>={
                png:"image/png",
                gif:"image/gif",
                webp:"image/webp"
            };

            const mimeType = mimeTypeMap[fileType || "image/jpeg"]

            formData.append("image",{
                uri:postData.imageUri,
                name:`image.${fileType}`,
                type:mimeType
            } as any);
        }

        return api.post('/posts',formData,{})
    },
    onSuccess:()=>{
        setContent("");
        setSelectedImage(null);
        queryClient.invalidateQueries({queryKey:['posts']});
        Alert.alert("Success","Post created successfully")
    },
    onError:(error)=>{
        console.log(JSON.stringify(error));
        
        Alert.alert("Failed","Failed to create post")
    }
  });

  const handleImagePicker = async(useCamera:boolean=false)=>{
    const permissionResult = useCamera?await ImagePicker.requestCameraPermissionsAsync(): await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(permissionResult.status!==ImagePicker.PermissionStatus.GRANTED){
        const source = useCamera ?"camera":"photo library";
        Alert.alert("Permission needed",`Grant permission to access your ${source}`)
        return
    }

    const pickerOptions:ImagePicker.ImagePickerOptions = {
        allowsEditing:true,
        aspect:[16,9],
        quality:0.8
    };


    const result = useCamera? await ImagePicker.launchCameraAsync(pickerOptions):await ImagePicker.launchImageLibraryAsync({
        ...pickerOptions,mediaTypes:["images"]
    })

    if(!result.canceled) setSelectedImage(result.assets[0].uri)
  };

  const createPost = ()=>{
    console.log("called");
    
    if(!content.trim() && !selectedImage){
        Alert.alert("Empty post","Post cannot be empty, add image or write something before posting")
        return;
    }

    const postData:{content:string,imageUri?:string} ={
        content:content.trim()
    }

    if(selectedImage) postData.imageUri = selectedImage

    createPostMutation.mutate(postData)

  }


  return {
    content,
    setContent,
    selectedImage,
    isCreating:createPostMutation.isPending,
    pickImageFromGallery:()=>handleImagePicker(false),
    takePhoto:()=>handleImagePicker(true),
    removeImage:()=>setSelectedImage(null),
    createPost
  }
};


