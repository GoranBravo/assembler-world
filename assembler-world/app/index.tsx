import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import YoutubeIframe from "react-native-youtube-iframe";
import { useScreenSize } from "@/hooks/useScreenSize";

const Index: React.FC = () => {
  const { screenSize, screenWidth } = useScreenSize();

  const [videoWidth, setVideoWidth] = useState(500);
  const [videoMargin, setVideoMargin] = useState(20);
  const [videoHeight, setVideoHeight] = useState(500 * (9 / 16));

  useEffect(() => {
    if (screenSize === "large") {
      setVideoWidth(screenWidth - 700);
      setVideoMargin(350);
    } else if (screenSize === "medium") {
      setVideoWidth(screenWidth - 300);
      setVideoMargin(150);
    } else {
      setVideoWidth(screenWidth - 40);
      setVideoMargin(20);
    }

    setVideoHeight(videoWidth * (9 / 16));
  }, [screenSize, screenWidth, videoWidth]);

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
        <Text></Text>
      </ScrollView>
    </View>
  );
};

export default Index;
