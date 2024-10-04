import Slider from "@/components/Slider";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NavBar: React.FC = () => {
  const [isSliderVisible, setSliderVisible] = useState(false);
  return (
    <>
      <SafeAreaView style={{backgroundColor: useThemeColor({}, "background")}}>
      <View style={stylesNavbar.container}>
          <Pressable
            style={stylesNavbar.link}
            onPress={() => router.replace("/")}
          >
            <Text style={stylesNavbar.h1}>Assembler World</Text>
          </Pressable>
          <Pressable
            onPress={() => setSliderVisible(true)}
            style={stylesNavbar.link}
          >
            <Text style={stylesNavbar.slider}>Slider</Text>
            <Image src=""></Image>
          </Pressable>
          
      </View>
      </SafeAreaView>

      <Slider
        isVisible={isSliderVisible}
        onClose={() => setSliderVisible(false)}
      />
    </>
  );
};

const stylesNavbar = StyleSheet.create({
  container: {
    backgroundColor: "#164AAD",
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  h1: {
    textAlign: "center",
    color: "#E47A17",
    fontSize: 22,
    textShadowColor: "#000",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  link: {
    flex: 1,
  },
  slider: {
    textAlign: "right",
    color: "white",
    fontSize: 14,
  },
});

export default NavBar;
