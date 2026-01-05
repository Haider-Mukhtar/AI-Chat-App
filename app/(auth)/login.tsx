import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { clientDb } from "@/lib/clientDb";
import { colors } from "@/constants/colors";

const Login = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const shake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const isValidEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSendCode = async () => {
    if (!email) {
      setError("Email is required.");
      shake();
      return;
    }

    if (!isValidEmail(email)) {
      setError("Enter a valid email.");
      shake();
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await clientDb.auth.sendMagicCode({ email });
      setCodeSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send code. Please try again.");
      shake();
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!code) {
      setError("Code is required.");
      shake();
      return;
    }

    if (!/^\d{6}$/.test(code)) {
      setError("Enter a valid 6-digit code.");
      shake();
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await clientDb.auth.signInWithMagicCode({ email, code });
    } catch (err: any) {
      setError(err.message || "Invalid code. Please try again.");
      shake();
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setCode("");
    setError("");
    setCodeSent(false);
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
      style={styles.gradient}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          // bounces={false}
        >
          {/* Top Section - Logo and Title */}
          {!keyboardVisible && (
            <View style={styles.topSection}>
              <View style={styles.logoContainer}>
                <View style={styles.logoCircle}>
                  {/* <Text style={styles.logoText}>AI</Text> */}
                </View>
              </View>
              {/* <Text style={styles.appName}>AI Chat</Text> */}
            </View>
          )}

          {/* Bottom Section - Input and Buttons */}
          <View style={styles.bottomSection}>
            <Text style={styles.tagline}>
              {!codeSent
                ? "Your intelligent conversation partner. Anytime, anywhere."
                : "Enter the verification code sent to your email."}
            </Text>

            {!codeSent ? (
              <Animated.View
                style={[
                  styles.inputContainer,
                  { transform: [{ translateX: shakeAnim }] },
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={colors.text.placeholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  editable={!isLoading}
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TouchableOpacity
                  style={[styles.button, isLoading && styles.buttonDisabled]}
                  onPress={handleSendCode}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color={colors.primary.white} />
                  ) : (
                    <Text style={styles.buttonText}>Send Code</Text>
                  )}
                </TouchableOpacity>
              </Animated.View>
            ) : (
              <Animated.View
                style={[
                  styles.inputContainer,
                  { transform: [{ translateX: shakeAnim }] },
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Enter 6-digit code"
                  placeholderTextColor={colors.text.placeholder}
                  keyboardType="number-pad"
                  maxLength={6}
                  value={code}
                  onChangeText={setCode}
                  editable={!isLoading}
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[
                      styles.backButton,
                      isLoading && styles.buttonDisabled,
                    ]}
                    onPress={handleBack}
                    disabled={isLoading}
                  >
                    <Text style={styles.backButtonText}>Back</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.verifyButton,
                      isLoading && styles.buttonDisabled,
                    ]}
                    onPress={handleVerify}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator color={colors.primary.white} />
                    ) : (
                      <Text style={styles.buttonText}>Verify</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </Animated.View>
            )}

            {!keyboardVisible && (
              <Text style={styles.termsText}>
                By continuing you agree to our{" "}
                <Text style={{ textDecorationLine: "underline",  }}>
                  Terms of Services
                </Text>{" "}
                and{" "}
                <Text style={{ textDecorationLine: "underline" }}>
                  Privacy Policy
                </Text>
                .
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  topSection: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 200,
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.background.whiteTransparent,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.shadow.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.text.deepBlue,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text.white,
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 36,
    color: colors.text.darkSlate,
    textAlign: "left",
    lineHeight: 36,
    opacity: 0.95,
    marginBottom: 24,
    fontWeight: "600",
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    width: "100%",
    height: 56,
    backgroundColor: colors.background.white,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 12,
    shadowColor: colors.shadow.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  button: {
    width: "100%",
    height: 56,
    backgroundColor: colors.primary.darkSlate,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    shadowColor: colors.shadow.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: colors.text.white,
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: colors.error.text,
    paddingHorizontal: 12,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    marginTop: 8,
    gap: 12,
  },
  backButton: {
    flex: 1,
    height: 56,
    // backgroundColor: colors.background.whiteTransparent20,
    borderWidth: 2,
    borderColor: colors.primary.darkSlate,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: colors.text.darkSlate,
    fontSize: 16,
    fontWeight: "600",
  },
  verifyButton: {
    flex: 2,
    height: 56,
    backgroundColor: colors.primary.darkSlate,
    borderRadius: 16,
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
  buttonDisabled: {
    opacity: 0.6,
  },
  termsText: {
    color: colors.text.darkSlate,
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
    opacity: 0.8,
    lineHeight: 18,
  },
});
