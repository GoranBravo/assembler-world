import { StyleSheet } from "react-native";
import { usePageWidth } from "@/hooks/usePageWidth";
import { useThemeColor } from "@/hooks/useThemeColor";

const css = () => {
  const { videoWidth, videoHeight, pageWidth } = usePageWidth();
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
    flex: {
      flex: 1
    },
    textContainer: {
      width: pageWidth,
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
    input: {
      width: pageWidth,
      height: 50,
      borderColor: "#ddd",
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingHorizontal: 10,
      backgroundColor: "#fff",
    },
    button: {
      width: pageWidth,
      height: 50,
      backgroundColor: "#007BFF",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color,
    },
    link: {
      marginTop: 10,
      color: "#007BFF",
      fontSize: 16,
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
};

export default css;
