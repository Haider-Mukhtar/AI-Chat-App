import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { Image } from "expo-image";

const InputModal = () => {
  const inputRef = useRef<TextInput>(null);
  const [text, setText] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Permissions
  const requestCameraPermissions = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    return {
      camera: cameraPermission.status === "granted",
    };
  };
  const requestLibraryPermissions = async () => {
    const libraryPermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    return {
      library: libraryPermission.status === "granted",
    };
  };

  // Image Picker (max 3)
  const pickImageFromGallery = async () => {
    if (images.length >= 3) {
      Toast.show({
        type: "info",
        text1: "Maximum Images",
        text2: "You can only select up to 3 images.",
      });
      return;
    }

    const permissions = await requestLibraryPermissions();
    if (!permissions.library) {
      Toast.show({
        type: "info",
        text1: "Permission Required",
        text2: "Please grant media library permission to select images.",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 1,
      selectionLimit: 3 - images.length,
    });

    if (!result.canceled && result.assets) {
      const newImages = result.assets
        .map((asset) => asset.uri)
        .slice(0, 3 - images.length);
      setImages([...images, ...newImages]);
    }
  };

  const pickImageFromCamera = async () => {
    if (images.length >= 3) {
      Toast.show({
        type: "info",
        text1: "Maximum Images",
        text2: "You can only select up to 3 images.",
      });
      return;
    }

    const permissions = await requestCameraPermissions();
    if (!permissions.camera) {
      Toast.show({
        type: "info",
        text1: "Permission Required",
        text2: "Please grant camera permission to take photos.",
      });
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

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
          numberOfLines={images.length > 0 ? 7 : 9}
          value={text}
          onChangeText={setText}
          style={styles.textInput}
        />

        {/* Action Btns */}
        <View>
          {/* Selected Images */}
          {images.length > 0 && (
            <ScrollView
              horizontal
              style={styles.imagePreviewContainer}
              showsHorizontalScrollIndicator={false}
            >
              {images.map((uri, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri }} style={styles.imagePreview} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons name="close" size={18} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
          <View style={styles.btnsContainer}>
            <View style={styles.leftContainer}>
              <TouchableOpacity
                onPress={pickImageFromGallery}
                style={styles.iconButton}
              >
                <Ionicons name="image" size={24} color={colors.primary.white} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={pickImageFromCamera}
                style={styles.iconButton}
              >
                <Ionicons
                  name="camera"
                  size={24}
                  color={colors.primary.white}
                />
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
  imagePreviewContainer: {
    maxHeight: 100,
    marginBottom: 8,
  },
  imageWrapper: {
    position: "relative",
    marginRight: 8,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeImageButton: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
