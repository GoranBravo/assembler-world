import { UserPreferencesContext } from "@/context/UserPreferencesContext";
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const Slider: React.FC<{ isVisible: boolean; onClose: () => void }> = ({
  isVisible,
  onClose,
}) => {
  const translateX = useSharedValue(width * 0.7);
  const { theme, setTheme } = useContext(UserPreferencesContext);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(translateX.value, { duration: 300 }) },
      ],
    };
  });

  React.useEffect(() => {
    if (isVisible) {
      translateX.value = 0;
    } else {
      translateX.value = width * 0.7;
    }
  }, [isVisible]);

  return isVisible ? (
    <View style={styles.overlay}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Text style={styles.title}>Slider Content</Text>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </Pressable>
        <Pressable
          onPress={() => setTheme(theme === "light" ? "dark" : "light")}
          style={styles.themeButton}
        >
          <Text style={styles.themeButtonText}>
            {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace("/LoginScreen")}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Go to Login</Text>
        </Pressable>
      </Animated.View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    zIndex: 1000,
  },
  container: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "70%",
    backgroundColor: "white",
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    zIndex: 1000,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
  },
  closeText: {
    color: "white",
    fontSize: 16,
  },
  themeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#28a745",
    borderRadius: 5,
    alignItems: "center",
  },
  themeButtonText: {
    color: "white",
    fontSize: 16,
  },
  loginButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#dc3545",
    borderRadius: 5,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Slider;
