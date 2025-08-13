import { useApiClient, userApi } from "@/utils/api";
import { useAuth } from "@clerk/clerk-expo"
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export const useUserSync=()=>{
    const {isSignedIn} = useAuth();
    const api = useApiClient();

    const syncUserMutation = useMutation({
        mutationFn:()=>userApi.syncUser(api),
        onSuccess:(response:any)=>console.log("USER SYNC -",response.data.message),
        onError:(error)=>console.log("USER SYNC FAILED",JSON.stringify(error.message))
    })

    useEffect(()=>{
        if(isSignedIn && !syncUserMutation.data){
            syncUserMutation.mutate();
        }
    },[isSignedIn])

    return null;
}