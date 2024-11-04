import { StyleSheet } from "react-native";
import { usePageWidth } from "@/hooks/usePageWidth";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useScreenSize } from "@/hooks/useScreenSize";

const css = () => {
  const { screenWidth } = useScreenSize();
  const { videoWidth, videoHeight, pageWidth, widthSlider, flexDir } =
    usePageWidth();
  const backgroundColor = useThemeColor({}, "background");
  const color = useThemeColor({}, "text");
  let marginLeft = 0;
  let marginRight = 0;
  let widthMLeft = pageWidth - 40;
  if (flexDir == "row") {
    marginLeft = 10;
    marginRight = 10;
    widthMLeft = (pageWidth - 40) / 2;
  }
  const ligthBlue = "#007BFF";
  const darkerBlue = "#164AAD";
  const darkestBlue = "#102C63";
  const orangeJoseju = "#E47A17";
  const darkText = "#2C2C2C";

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
    scrollBackground: {
      backgroundColor,
    },
    flex: {
      flex: 1,
    },
    row: {
      flexDirection: flexDir,
    },
    textContainer: {
      width: pageWidth - 40,
      marginBottom: 20,
      padding: 20,
      borderRadius: 10,
      paddingBottom: 10,
    },
    boxBorder: {
      borderRadius: 5,
      shadowColor: color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
    },
    mLeft: {
      marginLeft,
      width: widthMLeft,
    },
    mRigth: {
      marginRight,
    },
    img: {
      width: pageWidth - 80,
      resizeMode: "contain",
      height: (pageWidth - 80) * (9 / 16),
      borderRadius: 7,
    },
    floatingBox: {
      position: "absolute",
      left: (screenWidth - videoWidth) / 2 + videoWidth,
      right: 0,
      top: 0,
      height: videoHeight,
      marginRight: 20,
      marginTop: 20,
      marginLeft: 15,
      backgroundColor: darkerBlue,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingTop: 10,
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
      width: pageWidth - 80,
      height: 50,
      color,
      borderColor: orangeJoseju,
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingHorizontal: 10,
      backgroundColor,
    },
    buttonSubmmit: {
      width: pageWidth / 2 - 47.5,
      paddingHorizontal: 10,
      height: 50,
      backgroundColor: orangeJoseju,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonCancel: {
      backgroundColor: ligthBlue,
      marginLeft: 15,
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color,
    },
    link: {
      marginTop: 10,
      color: ligthBlue,
      fontSize: 16,
    },
    button: {
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
    },
    buttonTextOrange: {
      color: darkText,
      fontSize: 16,
      fontWeight: "bold",
    },
    favButton: {
      padding: 10,
      flexDirection: "row",
      borderRadius: 5,
      alignItems: "center",
      backgroundColor: "gray",
    },
    favImage: {
      marginRight: 10,
      height: 20,
      width: 20,
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
      backgroundColor: darkestBlue,
      shadowColor: "#000",
      shadowOpacity: 0.5,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      zIndex: 1000,
    },
    buttonsContainer: {
      paddingHorizontal: 20,
      backgroundColor: darkestBlue,
      paddingTop: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    headerSlider: {
      backgroundColor: orangeJoseju,
      height: 65,
      justifyContent: "center",
    },
    errorMsg: {
      fontSize: 20,
      color: "red",
      textAlign: "left",
      marginBottom: 10,
    },
    navbar: {
      backgroundColor: darkerBlue,
      height: 65,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      justifyContent: "space-between",
    },
    logoText: {
      textAlign: "center",
      color: orangeJoseju,
      fontSize: 22,
      fontWeight: "bold",
      textShadowColor: "#000",
      textShadowRadius: 5,
    },
    sliderImg: {
      width: 30,
      height: 30,
    },
    navbarButtonsContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: pageWidth - 40,
      padding: 20,
      backgroundColor,
      borderRadius: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15,
      color,
    },
  });
};

export default css;
