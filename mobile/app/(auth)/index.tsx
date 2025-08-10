import { useSocialAuth } from "@/hooks/useSocialAuth";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  const { handleSocialAuth, isLoading } = useSocialAuth();

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 px-8 justify-between">
        <View className="flex-1 justify-center">
          {/** Image */}
          <View className="items-center">
            <Image
              source={require("../../assets/images/auth2.png")}
              className="size-96"
              resizeMode="contain"
            />
          </View>
          {/** Buttons & Icons */}
          <View className="flex-col gap-2">
            {/* Google Button */}
            <TouchableOpacity
              className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full min-h-[50px]"
              onPress={() => handleSocialAuth("oauth_google")}
              disabled={isLoading}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Image
                    source={require("../../assets/images/google.png")}
                    className="size-12"
                    resizeMode="contain"
                  />
                  <Text className="text-black font-medium text-lg">
                    {" "}
                    Continue with Google
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            {/* Apple Button */}
            <TouchableOpacity
              className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full min-h-[50px]"
              onPress={() => handleSocialAuth("oauth_apple")}
              disabled={isLoading}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Image
                    source={require("../../assets/images/apple.png")}
                    className="size-9 mr-1"
                    resizeMode="contain"
                  />
                  <Text className="text-black font-medium text-lg">
                    {" "}
                    Continue with Apple
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          {/*Terms and Privacy */}
          <Text className="text-center text-gray-500 text-sm leading-4 mt-6 px-2">
            By signing up, you agree to our{" "}
            <Text className="text-blue-500">Terms</Text>
            {", "}
            <Text className="text-blue-500">Privacy Policy</Text>
            {", "}
            <Text className="text-blue-500">Cookie Use</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}