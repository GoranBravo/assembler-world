import React from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import YoutubeIframe from "react-native-youtube-iframe";

const { width } = Dimensions.get("window");

const Index: React.FC = () => {
  const videoWidth = width > 1500 ? width - 700 : width > 900 ? width - 300 : width - 40;  
  const videoMargin = width > 1500 ? 350 : width > 900 ? 150 : 20;
  const videoHeight = videoWidth * (9 / 16);

  const stylesDaily = StyleSheet.create({
    video: {
      width: videoWidth,
      height: videoHeight,
      marginStart: videoMargin,
      marginEnd: videoMargin,
      marginTop: 20,
      marginBottom: 20,
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
    <View style={stylesDaily.container}>
      <ScrollView>
        <View style={stylesDaily.video}>
          <YoutubeIframe
            height={videoHeight}
            width={videoWidth}
            videoId="9wvzEOq1imo"
          />
        </View>
        <Text style={stylesDaily.h1}>Problema del Día</Text>
      </ScrollView>
    </View>
  );
};

export default Index;
