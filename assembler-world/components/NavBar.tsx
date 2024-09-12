import Slider from "@/components/Slider";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const NavBar: React.FC = () => {
  const [isSliderVisible, setSliderVisible] = useState(false);
  return (
    <>
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
          <Text style={stylesNavbar.slider}>Open Slider</Text>
        </Pressable>
      </View>
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
    fontSize: 24,
  },
  link: {
    flex: 1,
  },
  slider: {
    color: "white",
    fontSize: 14,
  },
});

export default NavBar;
