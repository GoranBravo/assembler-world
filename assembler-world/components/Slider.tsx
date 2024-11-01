import { UserPreferencesContext } from "@/context/UserPreferencesContext";
import React, { useContext } from "react";
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

const Slider: React.FC = ({}) => {
  const { theme, setTheme } = useContext(UserPreferencesContext);
  const { refreshMarkers, isVisible, setIsVisible } = useMarkersContext();

  const { logout, isLoggedIn, toMarker } = useAuthContext();

  const { screenWidth } = useScreenSize();
  const translateX = useSharedValue(screenWidth * 0.7);
  const { markers } = useMarkers();

  const styles = css();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(translateX.value, { duration: 300 }) },
      ],
    };
  });

  React.useEffect(() => {
    if (isVisible) {
      translateX.value = 0;
    } else {
      translateX.value = screenWidth * 0.7;
    }
  }, [isVisible]);

  const handleLogOut = async () => {
    logout();
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
                <Text style={styles.title}>Cerrar Sesion</Text>
              </Pressable>
            ) : (
              <Pressable style={styles.headerSlider} onPress={handleLogIn}>
                <Text style={styles.title}>Iniciar Sesion</Text>
              </Pressable>
            )}
          </>

          <View style={styles.buttonsContainer}>
            <DefaultButton
              text={"Cerrar"}
              press={() => setIsVisible(false)}
              vertical={true}
            />
            <DefaultButton
              text={theme === "light" ? "Modo Oscuro" : "Modo Claro"}
              press={() => setTheme(theme === "light" ? "dark" : "light")}
              color={theme === "light" ? "#000" : "#fff"}
              colortext={theme === "light" ? "#fff" : "#000"}
              vertical={true}
              closeAfter={false}
            />
            {isLoggedIn ? (
              <>
                <DefaultButton
                  text={"Añadir a Favoritos"}
                  press={toMarker}
                  vertical={true}
                  color="#D29E16"
                  closeAfter={false}
                />
              </>
            ) : (
              <DefaultButton
                text={"Registrarse"}
                press={() => router.replace("/RegisterScreen")}
                vertical={true}
                color="#28a745"
              />
            )}
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
          </View>
        </SafeAreaView>
      </Animated.View>
    </View>
  ) : null;
};

export default Slider;
