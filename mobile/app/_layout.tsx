import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import "../global.css";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"

function InnerLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();
  const router = useRouter();

useEffect(() => {
  if (!isLoaded) {
    return;
  }
  
  if (segments.length < 1) {
    if (isSignedIn) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)");
    }
    return;
  }
  
  const inAuthGroup = segments[0] === "(auth)";
  
  if (isSignedIn && inAuthGroup) {
    router.replace("/(tabs)");
  } else if (!isSignedIn && !inAuthGroup) {
    router.replace("/(auth)");
  }
}, [isSignedIn, isLoaded, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <InnerLayout />
      </QueryClientProvider>
    </ClerkProvider>
  );
}