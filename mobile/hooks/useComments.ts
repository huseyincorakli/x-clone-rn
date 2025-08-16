import { commentApi, useApiClient } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Alert } from "react-native";

export const useComments = () => {
  const [commentText, setCommentText] = useState<string>("");

  const api = useApiClient();
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation({
    mutationFn: async ({
      postId,
      content,
    }: {
      postId: string;
      content: string;
    }) => {
      const response = await commentApi.createComment(api, postId, content);

      return response.data;
    },
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.log(JSON.stringify(error.message));

      Alert.alert("Error", "Failed to post comment. Try again");
    },
  });

  const createComment = (postId: string) => {
    console.log("postid", postId);
    if (!commentText.trim()) {
      Alert.alert("Empty Comment", "Please write something before posting");
      return;
    }

    createCommentMutation.mutate({
      postId: postId,
      content: commentText.trim(),
    });
  };

  return {
    createComment,
    setCommentText,
    commentText,
    isCreatingComment: createCommentMutation.isPending,
  };
};
