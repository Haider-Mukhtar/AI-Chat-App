import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import React from "react";
import { colors } from "@/constants/colors";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Chat = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.mainContainer}>
      <Text>Chat</Text>
      <View
        style={[
          styles.buttonContainer,
          { paddingBottom: Math.max(insets.bottom, 20) + 60 },
        ]}
      >
        <TouchableOpacity
          onPress={() => router.push("/(main)/(tabs)/(chat)/input-modal")}
          style={styles.startBtn}
        >
          <Text style={styles.startBtnText}>Start Conversation</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
  startBtn: {
    width: "50%",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary.darkSlate,
    shadowColor: colors.shadow.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  startBtnText: {
    color: colors.text.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
