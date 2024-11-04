import { UserPreferencesContext } from "@/context/UserPreferencesContext";
import { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
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
import { getUser } from "@/apis/getUser";
import { getValueFor } from "@/utils/storage";
import { deleteUser } from "@/apis/deleteUser";
import { uploadUser } from "@/apis/updateUser";

const Slider: React.FC = ({}) => {
  const { theme, setTheme } = useContext(UserPreferencesContext);
  const { refreshMarkers, isVisible, setIsVisible } = useMarkersContext();

  const { logout, isLoggedIn, toMarker } = useAuthContext();

  const { screenWidth } = useScreenSize();
  const translateX = useSharedValue(screenWidth * 0.7);
  const { markers } = useMarkers();

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

  const getUserData = async () => {
    try {
      const token = await getValueFor("token");
      if (token) {
        const data = await getUser(token);
        if (data.nombre && data.mail) {
          setUserData(data.nombre);
          setMailData(data.mail);
          setUserDataSend(userData);
          setMailDataSend(mailData);
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

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(translateX.value, { duration: 300 }) },
      ],
    };
  });

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
            {isLoggedIn ? (
              <>
                <DefaultButton
                  text={"Editar Perfil"}
                  press={() => setModalVisible(true)}
                  color="#D29E16"
                  closeAfter={false}
                  vertical={true}
                />
                <DefaultButton
                  text={"Borrar Cuenta"}
                  press={handleDeleteAcc}
                  vertical={true}
                  color="red"
                  closeAfter={false}
                />
              </>
            ) : null}
            <DefaultButton
              text={"Cerrar"}
              press={() => setIsVisible(false)}
              vertical={true}
              color="#007BFF"
            />
          </View>
        </SafeAreaView>
      </Animated.View>

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
    </View>
  ) : null;
};

export default Slider;
