import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { router } from "expo-router";
import { registerCheck } from "@/apis/register";
import { useAuthContext } from "@/context/AuthContext";
import css from "@/styles/css";

const RegisterScreen: React.FC = () => {  
  const { login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const styles = css();

  const handleRegister = async () => {
    const Data = await registerCheck(email, nombre, password);
    if (Data.success) {
      login()
      router.replace("/");
    } else {
      setErrorMessage("Error: " + Data.message);
    }
  };
  return (
    <View style={[styles.container, styles.flex]}>
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
        <Text style={styles.errorMsg}>
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
      <Pressable style={styles.buttonSubmmit} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </Pressable>
      <Pressable onPress={() => router.replace("/LoginScreen")}>
        <Text style={styles.link}>¿Ya tienes una cuenta? Inicia Sesion</Text>
      </Pressable>
    </View>
  );
};

export default RegisterScreen;
