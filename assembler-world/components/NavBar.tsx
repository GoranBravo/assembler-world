import Slider from "@/components/Slider";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultButton } from "@/components/DefaultButton";
import { UserPreferencesContext } from "@/context/UserPreferencesContext";

const NavBar: React.FC = () => {
  const { screenSize } = useScreenSize();
  const [isSliderVisible, setSliderVisible] = useState(false);
  const { theme, setTheme } = useContext(UserPreferencesContext);

  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: useThemeColor({}, "background") }}
      >
        <View style={styles.container}>
          <Pressable onPress={() => router.replace("/")}>
            <Text style={styles.h1}>Assembler World</Text>
          </Pressable>

          {screenSize === "small" && (
            <Pressable onPress={() => setSliderVisible(true)}>
              <Image
                style={styles.sliderImg}
                source={require("../assets/images/threeLines.png")}
              />
            </Pressable>
          )}

          {screenSize !== "small" && (
            <View style={styles.buttonsContainer}>
              <DefaultButton
                text={theme === "light" ? "Modo Oscuro" : "Modo Claro"}
                press={() => setTheme(theme === "light" ? "dark" : "light")}
                color="#dc3545"
                vertical={false}
              />
              <DefaultButton
                text={"Login"}
                press={() => router.replace("/LoginScreen")}
                color="#007BFF"
                vertical={false}
              />
            </View>
          )}
        </View>
      </SafeAreaView>

      <Slider
        isVisible={isSliderVisible}
        onClose={() => setSliderVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#164AAD",
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  h1: {
    textAlign: "center",
    color: "#E47A17",
    fontSize: 22,
    textShadowColor: "#000",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  sliderImg: {
    width: 30,
    height: 30,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default NavBar;
