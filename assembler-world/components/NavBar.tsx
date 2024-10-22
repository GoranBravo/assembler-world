import Slider from "@/components/Slider";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultButton } from "@/components/DefaultButton";
import { UserPreferencesContext } from "@/context/UserPreferencesContext";
import { getValueFor } from "@/utils/storage";
import { addMarker } from "@/apis/addMarker";
import { useRouteInfo } from "expo-router/build/hooks";
import { markerLink } from "@/apis/linkMarker";
import { useMarkersContext } from "@/context/MarkersContext";
import { useAuthContext } from "@/context/AuthContext";
import css from "@/styles/css";

const NavBar: React.FC = () => {
  const { logout, isLoggedIn } = useAuthContext();
  const { screenSize } = useScreenSize();
  const [isSliderVisible, setSliderVisible] = useState(false);
  const { theme, setTheme } = useContext(UserPreferencesContext);
  const route = useRouteInfo();
  const styles = css()

  const { refreshMarkers } = useMarkersContext();
  const toMarker = async () => {
    try {
      const token = await getValueFor("token");
      if (token) {
        const data = await addMarker(route.pathname, route.pathname, token);
        if (data.markerId) {
          await markerLink(data.markerId, token);
          refreshMarkers();
        }
      }
    } catch (error) {
      console.error("Error adding marker:", error);
    }
  };

  const handleLogOut = () => {
    //TODO: LogOut Function
    logout();
  };

  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: useThemeColor({}, "background") }}
      >
        <View style={styles.navbar}>
          <Pressable onPress={() => router.replace("/")}>
            <Text style={styles.logoText}>Assembler World</Text>
          </Pressable>

          {screenSize === "large" && (
            <View style={styles.navbarButtonsContainer}>
              <DefaultButton
                text={theme === "light" ? "Modo Oscuro" : "Modo Claro"}
                press={() => setTheme(theme === "light" ? "dark" : "light")}
                color="#dc3545"
              />
              {isLoggedIn ? (
                <>
                  <DefaultButton
                    text={"Añadir a Favoritos"}
                    press={() => toMarker()}
                  />
                  <DefaultButton text={"Cerrar Sesion"} press={handleLogOut} />
                </>
              ) : (
                <>
                  <DefaultButton
                    text={"Registrarse"}
                    press={() => router.replace("/RegisterScreen")}
                  />
                  <DefaultButton
                    text={"Iniciar Sesion"}
                    press={() => router.replace("/LoginScreen")}
                  />
                </>
              )}
            </View>
          )}

          {screenSize !== "large" && (
            <Pressable onPress={() => setSliderVisible(true)}>
              <Image
                style={styles.sliderImg}
                source={require("../assets/images/threeLines.png")}
              />
            </Pressable>
          )}
        </View>
      </SafeAreaView>

      <Slider
        isVisible={isSliderVisible}
        onClose={() => setSliderVisible(false)}
      />
    </>
  );
};

export default NavBar;
