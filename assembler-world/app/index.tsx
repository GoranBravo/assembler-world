import React from "react";
import { UserPreferencesContext } from "@/context/UserPreferencesContext";
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import YoutubeIframe from "react-native-youtube-iframe";

const { width } = Dimensions.get("window");

const Index: React.FC = () => {
  const stylesDaily = StyleSheet.create({
    video: {
      width: width - 40,
      height: (width - 40) * (9 / 16),
      margin: 20,
    },
    container: {
      flex: 1,
      backgroundColor: useThemeColor({}, "background"),
    },
    h1: {
      textAlign: "center",
      color: useThemeColor({}, "text"),
      fontSize: 24,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={stylesDaily.container}>
        <View style={stylesDaily.video}>
          <YoutubeIframe
            height={stylesDaily.video.height}
            width={stylesDaily.video.width}
            videoId="9wvzEOq1imo"
          />
        </View>
        <Text style={stylesDaily.h1}>Problema del Día</Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;