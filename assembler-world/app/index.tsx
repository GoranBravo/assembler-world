import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
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
    textContainer: {
      paddingHorizontal: 400,
      paddingVertical: 10,
    },
    h1: {
      textAlign: "center",
      color: useThemeColor({}, "text"),
      fontSize: 34,
      fontWeight: "bold",
      marginBottom: 20,
    },
    h2: {
      fontSize: 28,
      color: useThemeColor({}, "text"),
      marginBottom: 10,
      fontWeight: "600",
      textAlign: "center",
    },
    mainText: {
      fontSize: 16,
      color: useThemeColor({}, "text"),
      lineHeight: 24,
      textAlign: "left",
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
        <View style={stylesDaily.textContainer}>
          <Text style={stylesDaily.h2}>TP Assembly</Text>
          <Text style={stylesDaily.mainText}>
            {" "}
            1- Probar número más grande que pueda asignarse directamente, y que
            todos los anteriores al mismo puedan asignarse directamente. Deducir
            el por qué. {"\n"} 2- Guardar el número "1234" en R2. {"\n"} 3-
            Guardar dicho número en memoria. {"\n"} 4- Guardar el doble del
            número anterior en la siguiente posición de memoria. Utilizando
            offset.
          </Text>
          <Image source={require("../assets/images/registers.png")} style={{width: 1000, height: 500, marginTop: 20}}></Image>
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
