import React, { useContext, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { router } from "expo-router";
import css from "@/styles/css";
import { useAuthContext } from "@/context/AuthContext";
import { UserPreferencesContext } from "@/context/UserPreferencesContext";

const LoginScreen: React.FC = () => {
  const { loginProve } = useAuthContext();
  const { theme } = useContext(UserPreferencesContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const styles = css();

  const handleLogin = async () => {
    try {
      await loginProve(email, password);
    } catch (error) {
      setErrorMessage("Error: "+ error);
    }
  };
  return (
    <View style={[styles.container, styles.flex]}>
      <Text style={styles.header}>Iniciar Sesión</Text>
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
        placeholder="Contraseña"
        placeholderTextColor={theme === "light" ? "#2C2C2C" : "#FFF"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.buttonSubmmit} onPress={handleLogin}>
        <Text style={[styles.buttonText, styles.buttonTextOrange]}>Iniciar Sesión</Text>
      </Pressable>
      <Pressable onPress={() => router.replace("/RegisterScreen")}>
        <Text style={styles.link}>¿No tienes una cuenta? Regístrate</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
