import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/constants/colors";

const Chat = () => {
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
      style={styles.gradient}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View>
        <Text>Chat</Text>
      </View>
    </LinearGradient>
  );
};

export default Chat;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
