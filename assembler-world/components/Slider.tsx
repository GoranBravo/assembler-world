import { UserPreferencesContext } from "@/context/UserPreferencesContext";
import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultButton } from "./DefaultButton";
import { useScreenSize } from "@/hooks/useScreenSize";

const Slider: React.FC<{ isVisible: boolean; onClose: () => void }> = ({
  isVisible,
  onClose,
}) => {
  const { screenWidth } = useScreenSize();
  const translateX = useSharedValue(screenWidth * 0.7);
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
      translateX.value = screenWidth * 0.7;
    }
  }, [isVisible]);

  return isVisible ? (
    <View style={styles.overlay}>
      <Animated.View style={[styles.container, animatedStyle]}>  
        <Pressable style={styles.header} onPress={() => router.replace("/LoginScreen")}>
          <Text style={styles.title}>Iniciar Sesion</Text>
        </Pressable>
        <SafeAreaView style={styles.buttons}>
          <DefaultButton
            text={"Cerrar"}
            press={onClose}
            color="#28a745"
            vertical={true}
          />
          <DefaultButton
            text={theme === "light" ? "Modo Oscuro" : "Modo Claro"}
            press={() => setTheme(theme === "light" ? "dark" : "light")}
            color="#dc3545"
            vertical={true}
          />
          <DefaultButton
            text={"SingUp"}
            press={() => router.replace("/RegisterScreen")}
            vertical={true}
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
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    zIndex: 1000,
  },
  buttons: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  header: {
    padding: 20,
    backgroundColor: "#E47A17",
    height: 65,
  }
});

export default Slider;
