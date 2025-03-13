import Slider from "@/components/Slider";
import { useScreenSize } from "@/hooks/useScreenSize";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultButton } from "@/components/DefaultButton";
import { UserPreferencesContext } from "@/context/UserPreferencesContext";
import { useMarkersContext } from "@/context/MarkersContext";
import { useAuthContext } from "@/context/AuthContext";
import css from "@/styles/css";
import EditModal from "./Modal";

const NavBar: React.FC = () => {
  const { logout, isLoggedIn, toMarker, handleDeleteAcc } = useAuthContext();
  const { theme, setTheme } = useContext(UserPreferencesContext);
  const { setIsVisible } = useMarkersContext();

  const [modalVisible, setModalVisible] = useState(false);

  const { screenSize } = useScreenSize();
  const styles = css();

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#007BFF" }}>
        <View style={styles.navbar}>
          <Pressable onPress={() => router.replace("/")}>
            <Text style={styles.logoText} >Assembler World</Text>
          </Pressable>

          {screenSize === "large" && (
            <View style={styles.navbarButtonsContainer}>
              <DefaultButton
                text={theme === "light" ? "Modo Oscuro" : "Modo Claro"}
                press={() => setTheme(theme === "light" ? "dark" : "light")}
                color={theme === "light" ? "#000" : "#fff"}
                colortext={theme === "light" ? "#fff" : "#000"}
              />
              {isLoggedIn ? (
                <>
                  <DefaultButton
                    text={"Añadir a Favoritos"}
                    color="#D29E16"
                    press={toMarker}
                    closeAfter={false}
                    colortext="yellow"
                  />
                  <DefaultButton
                    text={"Cerrar Sesion"}
                    press={logout}
                    color="#E47A17"
                    colortext="#000"
                  />
                  <DefaultButton
                    text={"Editar Perfil"}
                    press={() => setModalVisible(true)}
                    color="#D29E16"
                    closeAfter={true}
                  />
                  <DefaultButton
                    text={"Borrar Cuenta"}
                    press={handleDeleteAcc}
                    color="red"
                    closeAfter={false}
                  />
                </>
              ) : (
                <>
                  <DefaultButton
                    text={"Registrarse"}
                    press={() => router.replace("/RegisterScreen")}
                    color="#007BFF"
                  />
                  <DefaultButton
                    text={"Iniciar Sesion"}
                    press={() => router.replace("/LoginScreen")}
                    color="#E47A17"
                    colortext="#000"
                  />
                </>
              )}
            </View>
          )}

          <EditModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />

          {screenSize !== "large" && (
            <Pressable onPress={() => setIsVisible(true)}>
              <Image
                style={styles.sliderImg}
                source={require("../assets/images/threeLines.png")}
              />
            </Pressable>
          )}
        </View>
      </SafeAreaView>

      <Slider />
    </>
  );
};

export default NavBar;
