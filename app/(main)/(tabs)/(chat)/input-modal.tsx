import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const InputModal = () => {
  const inputRef = useRef<TextInput>(null);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoiding}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <View style={styles.mainContainer}>
        <TextInput
          ref={inputRef}
          placeholder="Start Typing..."
          placeholderTextColor={colors.text.placeholder}
          multiline
          maxLength={1000}
          numberOfLines={9}
          value={text}
          onChangeText={setText}
          style={styles.textInput}
        />

        {/* Action Btns */}
        <View style={styles.btnsContainer}>
          <View style={styles.leftContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="image" size={24} color={colors.primary.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="camera" size={24} color={colors.primary.white} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.sendButton, !text && styles.disabledButton]}
            disabled={!text}
          >
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default InputModal;

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 36,
  },
  textInput: {
    fontSize: 28,
    color: colors.text.darkSlate,
    fontWeight: "600",
    textAlignVertical: "top",
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  leftContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
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
  sendButton: {
    backgroundColor: colors.background.green,
    borderRadius: 50,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.shadow.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: colors.background.diable,
  },
});
