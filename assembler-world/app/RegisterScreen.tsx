import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { registerCheck } from "@/apis/register";

const { width } = Dimensions.get("window");

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    // Comprobar éxito en el login
    const Data = await registerCheck(email, nombre, password);
    if (Data.success) {
      router.replace("/");
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
      padding: 20,
    },
    input: {
      width: width - 40,
      height: 50,
      borderColor: "#ddd",
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingHorizontal: 10,
      backgroundColor: "#fff",
    },
    button: {
      width: width - 40,
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
      <Text style={styles.header}>Registrarse</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
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
      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </Pressable>
      <Pressable onPress={() => router.replace("/LoginScreen")}>
        <Text style={styles.link}>¿Ya tienes una cuenta? Inicia Sesion</Text>
      </Pressable>
    </View>
  );
};

export default RegisterScreen;
