import Slider from "@/components/Slider";
import { useScreenSize } from "@/hooks/useScreenSize";
import { router } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import { Image, Modal, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultButton } from "@/components/DefaultButton";
import { UserPreferencesContext } from "@/context/UserPreferencesContext";
import { useMarkersContext } from "@/context/MarkersContext";
import { useAuthContext } from "@/context/AuthContext";
import css from "@/styles/css";
import { getValueFor } from "@/utils/storage";
import { deleteUser } from "@/apis/deleteUser";
import { getUser } from "@/apis/getUser";
import { uploadUser } from "@/apis/updateUser";

const NavBar: React.FC = () => {
  const { logout, isLoggedIn, toMarker } = useAuthContext();
  const { theme, setTheme } = useContext(UserPreferencesContext);
  const { setIsVisible } = useMarkersContext();

  const { screenSize } = useScreenSize();

  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [userData, setUserData] = useState("");
  const [mailData, setMailData] = useState("");

  const [userDataSend, setUserDataSend] = useState("");
  const [mailDataSend, setMailDataSend] = useState("");
  const [passwordSend, setPasswordSend] = useState("");

  const [password, setPassword] = useState("");

  const hasFetchedTask = useRef(false);
  const styles = css();

  const handleDeleteAcc = async () => {
    try {
      const token = await getValueFor("token");
      if (token) {
        const deleted = await deleteUser(token);
        if (deleted.success) {
          logout();
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const getUserData = async () => {
    try {
      const token = await getValueFor("token");
      if (token) {
        const data = await getUser(token);
        if (data.nombre && data.mail) {
          setUserData(data.nombre);
          setMailData(data.mail);
          setUserDataSend(data.nombre);
          setMailDataSend(data.mail);
        }
      }
    } catch (error) {
      console.error("Error fetching user:" + error);
    }
  };

  useEffect(() => {
    if (!hasFetchedTask.current && isLoggedIn) {
      getUserData();
      hasFetchedTask.current = true;
    }
  }, [hasFetchedTask, isLoggedIn]);

  const handleEditAcc = async () => {
    try {
      const token = await getValueFor("token");
      if (token) {
        const edited = await uploadUser(
          token,
          mailDataSend,
          userDataSend,
          passwordSend,
          password
        );
        if (edited.success) {
          setModalVisible(false);
          router.replace("/");
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setErrorMessage("Error updating task:" + error);
    }
  };

  const handleCancelar = () => {
    setUserDataSend(userData);
    setMailDataSend(mailData);
    setPasswordSend("");
    setPassword("");
    setModalVisible(false);
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#007BFF" }}>
        <View style={styles.navbar}>
          <Pressable onPress={() => router.replace("/")}>
            <Text style={styles.logoText}>Assembler World</Text>
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

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Editar Perfil</Text>
                {errorMessage ? (
                  <Text style={styles.errorMsg}>{errorMessage}</Text>
                ) : null}
                <TextInput
                  style={styles.input}
                  placeholder="Nombre"
                  placeholderTextColor={theme === "light" ? "#2C2C2C" : "#FFF"}
                  value={userDataSend}
                  onChangeText={setUserDataSend}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={theme === "light" ? "#2C2C2C" : "#FFF"}
                  value={mailDataSend}
                  onChangeText={setMailDataSend}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={theme === "light" ? "#2C2C2C" : "#FFF"}
                  value={passwordSend}
                  onChangeText={setPasswordSend}
                  secureTextEntry
                />
                <TextInput
                  style={styles.input}
                  placeholder="Old Password"
                  placeholderTextColor={theme === "light" ? "#2C2C2C" : "#FFF"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    columnGap: 15,
                  }}
                >
                  <DefaultButton
                    text="Guardar"
                    press={handleEditAcc}
                    vertical={true}
                    flexButton={true}
                    color="#E47A17"
                    colortext="#2C2C2C"
                    closeAfter={false}
                  />
                  <DefaultButton
                    text="Cancelar"
                    press={handleCancelar}
                    vertical={true}
                    flexButton={true}
                    closeAfter={false}
                  />
                </View>
              </View>
            </View>
          </Modal>

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
