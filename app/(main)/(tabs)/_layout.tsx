import { Platform } from "react-native";
import {
  NativeTabs,
  Icon,
  Label,
  Badge,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  if (Platform.OS === "ios") {
    return <IOSLayout />;
  }

  return <AndroidLayout />;
}

function IOSLayout() {
  return (
    <NativeTabs blurEffect="systemChromeMaterial">
      <NativeTabs.Trigger name="(chat)">
        <Label>Chat</Label>
        <Icon sf={{ default: "message", selected: "message.fill" }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(voice)">
        <Label>Voice</Label>
        <Icon sf={{ default: "mic", selected: "mic.fill" }} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(setting)">
        <Label>Setting</Label>
        <Icon sf={{ default: "gearshape", selected: "gearshape.fill" }} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

function AndroidLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#999",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="voice"
        options={{
          title: "Voice",
          tabBarLabel: "Voice",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="mic-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
