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
import { addMarker } from "@/apis/addMarker";
import { useRouteInfo } from "expo-router/build/hooks";
import { getValueFor } from "@/utils/storage";
import { markerLink } from "@/apis/linkMarker";
import { useMarkersContext } from "@/context/MarkersContext";
import { useAuthContext } from "@/context/AuthContext";

const Slider: React.FC<{ isVisible: boolean; onClose: () => void }> = ({
  isVisible,
  onClose,
}) => {
  const { theme, setTheme } = useContext(UserPreferencesContext);

  const { refreshMarkers } = useMarkersContext();
  const { logout, isLoggedIn } = useAuthContext();

  const { screenWidth } = useScreenSize();
  const translateX = useSharedValue(screenWidth * 0.7);
  const { markers } = useMarkers();

  const styles = css();
  const route = useRouteInfo();

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

  const toMarker = async () => {
    try {
      const token = await getValueFor("token");
      if (token) {
        const data = await addMarker(route.pathname, route.pathname, token);
        await markerLink(data.markerId, token);
        refreshMarkers();
      }
    } catch (error) {
      console.error("Error adding marker:", error);
    }
  };

  const handleLogOut = () => {
    //TODO: LogOut Function
    logout();
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
              <Pressable
                style={styles.headerSlider}
                onPress={() => router.replace("/LoginScreen")}
              >
                <Text style={styles.title}>Iniciar Sesion</Text>
              </Pressable>
            )}
          </>

          <View style={styles.buttonsContainer}>
            <DefaultButton
              text={"Cerrar"}
              press={onClose}
              color="#28a745"
              vertical={true}
            />
            <DefaultButton
              text={theme === "light" ? "Modo Oscuro" : "Modo Claro"}
              press={() => setTheme(theme === "light" ? "dark" : "light")}
              color="#dc3545"
              vertical={true}
            />
            {isLoggedIn ? (
              <>
              <DefaultButton
                text={"Registrarse"}
                press={() => router.replace("/RegisterScreen")}
                vertical={true}
              />
              <DefaultButton
                  text={"Añadir a Favoritos"}
                  press={() => toMarker()}
                  vertical={true}
                  color="#D29E16"
                />
              </>
            ) : (null)}
            <ScrollView>
              {Array.isArray(markers) && markers.length > 0
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
