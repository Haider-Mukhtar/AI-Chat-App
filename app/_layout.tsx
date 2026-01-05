import "react-native-get-random-values";
import { Stack } from "expo-router";
import { View, ActivityIndicator, Text } from "react-native";
import { clientDb } from "@/lib/clientDb";

export default function RootLayout() {
  return <RootLayoutContent />;
}

function RootLayoutContent() {
  const { isLoading, user, error } = clientDb.useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Text style={{ color: "red", marginBottom: 10 }}>Auth Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(main)" />
      </Stack.Protected>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}
