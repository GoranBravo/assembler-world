import { StyleSheet } from "react-native";
import { usePageWidth } from "@/hooks/usePageWidth";
import { useThemeColor } from "@/hooks/useThemeColor";

const css = () => {
  const { videoWidth, videoHeight, pageWidth, screenWidth } = usePageWidth();
  const backgroundColor = useThemeColor({}, "background");
  const color = useThemeColor({}, "text");

  return StyleSheet.create({
    video: {
      width: videoWidth,
      height: videoHeight,
      marginVertical: 20,
    },
    container: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor,
    },
    textContainer: {
      width: pageWidth,
    },
    floatingBox: {
      position: "absolute",
      left: ((screenWidth - videoWidth) / 2) + videoWidth,
      right: 0,
      top: 0,
      height: videoHeight,
      marginRight: 20,
      marginTop: 20,
      marginLeft: 15,
      backgroundColor: "#313131",
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingTop: 10,
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    h1: {
      textAlign: "center",
      color,
      fontSize: 34,
      fontWeight: "bold",
      marginBottom: 20,
    },
    h2: {
      fontSize: 28,
      color,
      marginBottom: 10,
      fontWeight: "600",
      textAlign: "center",
    },
    mainText: {
      fontSize: 16,
      color,
      lineHeight: 24,
      textAlign: "left",
      marginBottom: 10,
    },
  });
};

export default css;
