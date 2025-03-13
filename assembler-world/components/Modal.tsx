import { uploadUser } from "@/apis/updateUser";
import { UserPreferencesContext } from "@/context/UserPreferencesContext";
import css from "@/styles/css";
import { getValueFor } from "@/utils/storage";
import { router } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import { View, Modal, Text, TextInput } from "react-native";
import { DefaultButton } from "./DefaultButton";
import { useAuthContext } from "@/context/AuthContext";

const EditModal: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose,
}) => {
  const { theme } = useContext(UserPreferencesContext);
  const { isLoggedIn, getUserData } = useAuthContext();

  const [userData, setUserData] = useState("");
  const [mailData, setMailData] = useState("");

  const [userDataSend, setUserDataSend] = useState("");
  const [mailDataSend, setMailDataSend] = useState("");
  const [passwordSend, setPasswordSend] = useState("");

  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const hasFetchedTask = useRef(false);
  const styles = css();

  useEffect(() => {
    if (!hasFetchedTask.current && isLoggedIn) {
      getUserData()
        .then((datos) => {
          setUserData(datos.nombre);
          setMailData(datos.email);
          setUserDataSend(datos.nombre);
          setMailDataSend(datos.email);
        })
        .catch((error) => setErrorMessage("Error: " + error));
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
          onClose();
          router.replace("/");
        }
      }
    } catch (error) {
      setErrorMessage("Error updating task:" + error);
    }
  };

  const handleCancelar = () => {
    setUserDataSend(userData);
    setMailDataSend(mailData);
    setPasswordSend("");
    setPassword("");
    onClose();
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
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
  );
};

export default EditModal;
