import { useApiClient } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useNotification = () => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const {
    data: notificationsData,
    error,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => api.get("/notification"),
    select: (response) => response.data.notifications,
    
  });

  const deleteNotificationMutation = useMutation({
    mutationFn:(notificationId:string)=>api.delete(`/notification/${notificationId}`),
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['notifications']})
    },
    onError:(error)=>{
        console.log(error);
        
        Alert.alert('Error','Failed to delete notification')
    }
  })

  const deleteNotification =(notificationId:string)=>{
    deleteNotificationMutation.mutate(notificationId);
  }

  return {
   notifications:notificationsData || [],
   isLoading,
   error,
   refetch,
   isRefetching,
   deleteNotification,
   isDeletingNotification : deleteNotificationMutation.isPending
  }
};
