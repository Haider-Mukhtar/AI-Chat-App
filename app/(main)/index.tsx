import { clientDb } from "@/lib/clientDb";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const handleLogout = async () => {
    try {
      await clientDb.auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
  },
  logoutButton: {
    width: "60%",
    height: 50,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
