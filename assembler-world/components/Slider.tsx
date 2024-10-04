import { UserPreferencesContext } from "@/context/UserPreferencesContext";
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultButton } from "./DefaultButton";

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
        <SafeAreaView>
          <Text style={styles.title}>Contenido</Text>
          <DefaultButton text={"Cerrar"} press={onClose} color="#28a745"/>
          <DefaultButton
            text={
              theme === "light" ? "Modo Oscuro" : "Modo Claro"
            }
            press={() => setTheme(theme === "light" ? "dark" : "light")}
            color="#dc3545"
          />
          <DefaultButton
            text={"Login"}
            press={() => router.replace("/LoginScreen")}
            color="#007BFF"
          />
        </SafeAreaView>
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
    backgroundColor: "#164AAD",
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
});

export default Slider;
