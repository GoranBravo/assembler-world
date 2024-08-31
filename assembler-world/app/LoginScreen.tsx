import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Dimensions } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

const { width } = Dimensions.get('window');

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // validar las credenciales y redirigir al usuario
    if (email === '' || password === '') {
      Alert.alert('Error', 'Por favor, ingrese su correo electrónico y contraseña.');
      return;
    }
    Alert.alert('Éxito', 'Inicio de sesión exitoso');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: useThemeColor({}, 'background'),
      padding: 20,
    },
    input: {
      width: width - 40,
      height: 50,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
    },
    button: {
      width: width - 40,
      height: 50,
      backgroundColor: '#007BFF',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: useThemeColor({}, 'text'),
    },
    link: {
      marginTop: 10,
      color: '#007BFF',
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
      <Pressable onPress={() => Alert.alert('Link', 'Ir a la pantalla de registro')} >
        <Text style={styles.link}>¿No tienes una cuenta? Regístrate</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
