import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import YoutubeIframe from "react-native-youtube-iframe";
import { usePageWidth } from "@/hooks/usePageWidth";

const Index: React.FC = () => {
  const { videoWidth, videoHeight, pageWidth } = usePageWidth();

  const stylesDaily = StyleSheet.create({
    video: {
      width: videoWidth,
      height: videoHeight,
      marginVertical: 20,
    },
    container: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: useThemeColor({}, "background"),
    },
    textContainer: {
      width: pageWidth,
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
      marginBottom: 10,
    },
  });

  return (
    
    <ScrollView contentContainerStyle={stylesDaily.container}>
    <View style={stylesDaily.container}>
        <View style={stylesDaily.video}>
          <YoutubeIframe
            height={videoHeight}
            width={videoWidth}
            videoId="9wvzEOq1imo"
          />
        </View>
        <View style={stylesDaily.textContainer}>
          <Text style={stylesDaily.h1}>Problema del Día</Text>
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
          <Image source={require("../assets/images/registers.png")} style={{width: videoWidth, height: videoHeight}}></Image>
        </View>
    </View>
    
    </ScrollView>
  );
};

export default Index;
