import { useSSO, useAuth } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";

export const useSocialAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { startSSOFlow } = useSSO();
  const { isSignedIn } = useAuth();

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {

    if (isSignedIn) {
      console.log("User is already signed in, skipping auth");
      return;
    }

    setIsLoading(true);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        console.log("✅ Social auth successful");
      }
    } catch (error: any) {
      console.log("ERROR in social auth", error);
      
      const provider = strategy === "oauth_google" ? "Google" : "Apple";
      Alert.alert("Error", `Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleSocialAuth, isSignedIn };
};