import React, { useContext, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { router } from "expo-router";
import { registerCheck } from "@/apis/register";
import { useAuthContext } from "@/context/AuthContext";
import css from "@/styles/css";
import { UserPreferencesContext } from "@/context/UserPreferencesContext";

const RegisterScreen: React.FC = () => {
  const { loginProve } = useAuthContext();
  const { theme } = useContext(UserPreferencesContext);

  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const styles = css();

  const handleRegister = async () => {
    if (validateInputs() == null) {
      try {
        const Data = await registerCheck(email, nombre, password);
        if (Data.success) {
          await loginProve(email, password);
        } else {
          setErrorMessage("Error: " + Data.message);
        }
      } catch (error) {
        setErrorMessage("Error: " + error);
      }
    }
  };
  const validateInputs = () => {
    if (!email.trim()) return "El correo electrónico es requerido";
    if (!nombre.trim()) return "El nombre es requerido";
    if (!password.trim()) return "Una contraseña es requerida";
    return null;
  };
  return (
    <View style={[styles.container, styles.flex]}>
      <Text style={styles.header}>Registrarse</Text>
      {errorMessage ? (
        <Text style={styles.errorMsg}>{errorMessage}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        placeholderTextColor={theme === "light" ? "#2C2C2C" : "#FFF"}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor={theme === "light" ? "#2C2C2C" : "#FFF"}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor={theme === "light" ? "#2C2C2C" : "#FFF"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.buttonSubmmit} onPress={handleRegister}>
        <Text style={[styles.buttonText, styles.buttonTextOrange]}>
          Registrarse
        </Text>
      </Pressable>
      <Pressable onPress={() => router.replace("/LoginScreen")}>
        <Text style={styles.link}>¿Ya tienes una cuenta? Inicia Sesion</Text>
      </Pressable>
    </View>
  );
};

export default RegisterScreen;
