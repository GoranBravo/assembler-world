import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { loginCheck } from "@/apis/login";
import { save } from "@/utils/storage";
import { router } from "expo-router";
import css from "@/styles/css";
import { useAuthContext } from "@/context/AuthContext";

const LoginScreen: React.FC = () => {
  
  const { login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const styles = css()

  const handleLogin = async () => {
    const Data = await loginCheck(email, password);
    if (Data.success) {
      if (Data.token) {
        const result = await save("token", Data.token);
        if (result) {
          login()
          router.replace("/");
        } else {
          setErrorMessage("Token Save Error.");
        }
      } else {
        setErrorMessage("Token Unaviable");
      }
    } else {
      setErrorMessage("Error: " + Data.message);
    }
  };

  return (
    <View style={[styles.container, styles.flex]}>
      <Text style={styles.header}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {errorMessage ? (
        <Text style={{ fontSize: 20, color: "red", textAlign: "left" }}>
          {errorMessage}
        </Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </Pressable>
      <Pressable onPress={() => router.replace("/RegisterScreen")}>
        <Text style={styles.link}>¿No tienes una cuenta? Regístrate</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
