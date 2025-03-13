import { UserPreferencesContext } from "@/context/UserPreferencesContext";
import { useContext, useEffect, useRef, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultButton } from "./DefaultButton";
import { useScreenSize } from "@/hooks/useScreenSize";
import { FavButton } from "./FavButton";
import { useMarkers } from "@/hooks/useMarkers";
import css from "@/styles/css";
import { useMarkersContext } from "@/context/MarkersContext";
import { useAuthContext } from "@/context/AuthContext";
import EditModal from "./Modal";

const Slider: React.FC = () => {
  const { theme, setTheme } = useContext(UserPreferencesContext);
  const { refreshMarkers, isVisible, setIsVisible } = useMarkersContext();

  const { logout, isLoggedIn, toMarker, handleDeleteAcc, getUserData } =
    useAuthContext();

  const { screenWidth } = useScreenSize();
  const translateX = useSharedValue(screenWidth * 0.7);
  const { markers } = useMarkers();

  const hasFetchedTask = useRef(false);
  const styles = css();

  const [modalVisible, setModalVisible] = useState(false);
  const [mailData, setMailData] = useState("");

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(translateX.value, { duration: 300 }) },
      ],
    };
  });

  getUserData()
    .then((datos) => {
      setMailData(datos.email);
    })
    .catch((error) => console.error("Error: " + error));

  useEffect(() => {
    if (isVisible) {
      translateX.value = 0;
    } else {
      translateX.value = screenWidth * 0.7;
    }
  }, [isVisible]);

  const handleLogOut = async () => {
    logout();
    hasFetchedTask.current = false;
    setIsVisible(false);
    refreshMarkers();
  };

  const handleLogIn = () => {
    router.replace("/LoginScreen");
    setIsVisible(false);
  };

  return isVisible ? (
    <View style={styles.overlay}>
      <Animated.View style={[styles.containerSlider, animatedStyle]}>
        <SafeAreaView style={{ backgroundColor: "#E47A17" }}>
          <>
            {isLoggedIn ? (
              <Pressable style={styles.headerSlider} onPress={handleLogOut}>
                <Text style={[styles.title, { marginTop: 15 }]}>
                  {mailData}
                </Text>
                <Text
                  style={[
                    styles.mainText,
                    { textAlign: "center", fontSize: 14 },
                  ]}
                >
                  Cerrar Sesion
                </Text>
              </Pressable>
            ) : (
              <Pressable style={styles.headerSlider} onPress={handleLogIn}>
                <Text style={styles.title}>Iniciar Sesion</Text>
              </Pressable>
            )}
          </>

          <View style={styles.buttonsContainer}>
            {isLoggedIn ? (
              <DefaultButton
                text={"Añadir a Favoritos"}
                press={toMarker}
                vertical={true}
                color="#D29E16"
                colortext="yellow"
                closeAfter={false}
              />
            ) : (
              <DefaultButton
                text={"Registrarse"}
                press={() => router.replace("/RegisterScreen")}
                vertical={true}
                color="#E47A17"
                colortext="#2C2C2C"
              />
            )}
            <DefaultButton
              text={theme === "light" ? "Modo Oscuro" : "Modo Claro"}
              press={() => setTheme(theme === "light" ? "dark" : "light")}
              color={theme === "light" ? "#000" : "#fff"}
              colortext={theme === "light" ? "#fff" : "#000"}
              vertical={true}
              closeAfter={false}
            />
            <ScrollView>
              {Array.isArray(markers) && markers.length > 0 && isLoggedIn
                ? markers.map((marker) => (
                    <FavButton
                      key={marker.id}
                      markerId={marker.id}
                      text={marker.nombre}
                      press={marker.link}
                      pined={true}
                      vertical={true}
                    />
                  ))
                : null}
            </ScrollView>
            {isLoggedIn && (
              <>
                <DefaultButton
                  text="Editar Perfil"
                  press={() => setModalVisible(true)}
                  color="#D29E16"
                  closeAfter={false}
                  vertical
                />
                <DefaultButton
                  text="Borrar Cuenta"
                  press={handleDeleteAcc}
                  vertical
                  color="red"
                  closeAfter={false}
                />
              </>
            )}
            <DefaultButton
              text={"Cerrar"}
              press={() => setIsVisible(false)}
              vertical={true}
              color="#007BFF"
            />
          </View>
        </SafeAreaView>
      </Animated.View>
      <EditModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  ) : null;
};

export default Slider;
