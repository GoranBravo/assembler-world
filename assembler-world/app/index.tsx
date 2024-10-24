import React, { useState } from "react";
import { Text, View, ScrollView, Image, TextInput, Pressable } from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import { usePageWidth } from "@/hooks/usePageWidth";
import css from "@/styles/css";
import { useMarkers } from "@/hooks/useMarkers";
import { FavButton } from "@/components/FavButton";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useAuthContext } from "@/context/AuthContext";
import { router } from "expo-router";

const Index: React.FC = () => {
  const { videoWidth, videoHeight } = usePageWidth();
  const { markers } = useMarkers();

  const { screenSize } = useScreenSize();
  const { isLoggedIn } = useAuthContext();

  const styles = css();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const uploadTask = async () => {
    // try {
    //   const Data = await upload();
    //   if (Data.success) {
    //     router.replace("/");
    //   } else {
    //     setErrorMessage("Error: " + Data.message);
    //   }
    // } catch {
    //   setErrorMessage("Server Error");
    // }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollBackground}>
      <View style={styles.container}>
        <View style={styles.video}>
          <YoutubeIframe
            height={videoHeight}
            width={videoWidth}
            videoId="9wvzEOq1imo"
          />
        </View>
        <View style={styles.row}>
          <View style={[styles.textContainer, { marginRight: 10 }]}>
            <Text style={styles.h1}>Problema del Día</Text>
            <Text style={styles.h2}>TP Assembly</Text>
            <Text style={styles.mainText}>
              {" "}
              1- Probar número más grande que pueda asignarse directamente, y
              que todos los anteriores al mismo puedan asignarse directamente.
              Deducir el por qué. {"\n"} 2- Guardar el número "1234" en R2.{" "}
              {"\n"} 3- Guardar dicho número en memoria. {"\n"} 4- Guardar el
              doble del número anterior en la siguiente posición de memoria.
              Utilizando offset.
            </Text>
            <Image
              source={require("../assets/images/registers.png")}
              style={styles.img}
            ></Image>
          </View>
          <View style={[styles.textContainer, { marginLeft: 10 }]}>
            <View style={[styles.container, styles.flex]}>
              <Text style={styles.header}>Crear Tarea</Text>
              {errorMessage ? (
                <Text style={styles.errorMsg}>{errorMessage}</Text>
              ) : null}
              <TextInput
                style={styles.input}
                placeholder="Titulo de la Tarea:"
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={styles.input}
                placeholder="Consignas:"
                value={content}
                onChangeText={setContent}
              />
              <View style={styles.row}>
                <Pressable style={styles.buttonSubmmit} onPress={uploadTask}>
                  <Text style={styles.buttonText}>Publicar</Text>
                </Pressable>
                <Pressable style={[styles.buttonSubmmit, styles.buttonCancel]} onPress={() => router.replace("/")}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
      {screenSize == "large" && isLoggedIn && (
        <ScrollView style={styles.floatingBox}>
          {Array.isArray(markers) && markers.length > 0
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
      )}
    </ScrollView>
  );
};

export default Index;
