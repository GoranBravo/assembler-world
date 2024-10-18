import { StyleSheet } from "react-native";
import { usePageWidth } from "@/hooks/usePageWidth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useScreenSize } from "@/hooks/useScreenSize";

const css = () => {
  const { screenWidth } = useScreenSize();
  const { videoWidth, videoHeight, pageWidth, widthSlider } = usePageWidth();
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
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-start",
      zIndex: 1000,
    },
    containerSlider: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: widthSlider,
      backgroundColor: "#164AAD",
      shadowColor: "#000",
      shadowOpacity: 0.5,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      zIndex: 1000,
    },
    buttonsContainer: {
      paddingHorizontal: 20,
      backgroundColor: "#164AAD",
      paddingTop: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    headerSlider: {
      backgroundColor: "#E47A17",
      height: 65,
      justifyContent: "center",
    },
  });
};

export default css;
