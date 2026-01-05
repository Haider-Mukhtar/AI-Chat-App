import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { clientDb } from "@/lib/clientDb";

export default function SettingLayout() {

  const handleLogout = async () => {
    try {
      await clientDb.auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
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
          name="setting"
          options={{
            title: "Settings",
            headerTitle: "Settings",
            headerLargeTitle: true,
            headerLargeTitleShadowVisible: false,
            headerTransparent: true,
            headerBlurEffect: "none",
            headerRight: () => (
              <TouchableOpacity onPress={handleLogout} style={styles.headerBtn}>
                <Ionicons
                  name="log-out"
                  size={24}
                  color={colors.primary.deepBlue}
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
