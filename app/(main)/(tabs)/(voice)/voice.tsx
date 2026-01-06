import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

const Voice = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>Voice Avatar</Text>
      <Text>Transcript</Text>
      {/* Action Btns */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="mic" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="close" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.startBtn}>
          <Text style={styles.startBtnText}>Connect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Voice;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  bottomActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginBottom: 80,
  },
  btn: {
    backgroundColor: colors.primary.deepBlue,
    borderRadius: 50,
    padding: 12,
    shadowColor: colors.shadow.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  startBtn: {
    width: "40%",
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
