import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import YoutubeIframe from "react-native-youtube-iframe";
import { useScreenSize } from "@/hooks/useScreenSize";

const Index: React.FC = () => {
  const {videoHeight, videoWidth, videoMargin} = useScreenSize();
  
  const stylesDaily = StyleSheet.create({
    video: {
      width: videoWidth,
      height: videoHeight,
      marginHorizontal: videoMargin,
      marginVertical: 20,
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
