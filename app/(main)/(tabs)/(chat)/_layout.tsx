import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ChatLayout() {
  return (
    <LinearGradient
      colors={[
        colors.gradient.blue950,
        colors.gradient.blue900,
        colors.gradient.blue800,
        colors.gradient.blue700,
        colors.gradient.blue600,
        colors.gradient.blue500,
        colors.gradient.blue400,
        colors.gradient.blue300,
        colors.gradient.blue200,
        colors.gradient.blue100,
        colors.gradient.blue50,
      ]}
      style={styles.container}
    >
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "transparent" },
          headerStyle: { backgroundColor: "transparent" },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="chat"
          options={{
            title: "",
            headerTitle: "",
            headerLeft: () => (
              <TouchableOpacity style={styles.headerBtn}>
                <Ionicons
                  name="person"
                  size={24}
                  color={colors.primary.deepBlue}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity style={styles.headerBtn}>
                <Ionicons
                  name="ellipsis-horizontal"
                  size={24}
                  color={colors.primary.deepBlue}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="input-modal"
          options={{
            title: "",
            headerTitle: "",
            presentation: "modal",
            headerBackButtonDisplayMode: "minimal",
            animation: "slide_from_bottom",
            gestureDirection: "vertical",
            sheetGrabberVisible: true,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()}
                style={styles.headerBtn}
              >
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={colors.primary.darkSlate}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBtn: {
    padding: 5,
  },
});
