import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { loginCheck } from "@/apis/login";
import { save } from "@/utils/storage";
import { router } from "expo-router";
import { usePageWidth } from "@/hooks/usePageWidth";

const LoginScreen: React.FC = () => {
  const { pageWidth } = usePageWidth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    const Data = await loginCheck(email, password);
    if (Data.success) {
      if (Data.token) {
        const result = await save("token", Data.token);
        if (result) {
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: useThemeColor({}, "background"),
    },
    input: {
      width: pageWidth,
      height: 50,
      borderColor: "#ddd",
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingHorizontal: 10,
      backgroundColor: "#fff",
    },
    button: {
      width: pageWidth,
      height: 50,
      backgroundColor: "#007BFF",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: useThemeColor({}, "text"),
    },
    link: {
      marginTop: 10,
      color: "#007BFF",
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
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
