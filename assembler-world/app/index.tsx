import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
import { usePageWidth } from "@/hooks/usePageWidth";
import css from "@/styles/css";
import { useMarkers } from "@/hooks/useMarkers";
import { FavButton } from "@/components/FavButton";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useAuthContext } from "@/context/AuthContext";
import { Href, router } from "expo-router";
import { uploadTask } from "@/apis/uploadTask";
import { getValueFor } from "@/utils/storage";
import { getTask } from "@/apis/getTask";
import { getAllTaskId } from "@/apis/getAllTaskId";
import { DefaultButton } from "@/components/DefaultButton";

const Index: React.FC = () => {
  const { videoWidth, videoHeight } = usePageWidth();
  const { markers } = useMarkers();

  const { screenSize } = useScreenSize();
  const { isLoggedIn } = useAuthContext();

  const styles = css();

  const [tasks, setTasks] = useState<number[]>([]);
  const [randomTaskId, setRandomTaskId] = useState<number>(0);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [titleSend, setTitleSend] = useState<string>("");
  const [contentSend, setContentSend] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const hasFetchedTask = useRef(false);

  useEffect(() => {
    const fetchRandomTask = async () => {
      try {
        const response = await getAllTaskId();
        if (response.success && response.taskIds.length > 0) {
          const taskIds = response.taskIds;
          setTasks(taskIds);
          const randomIndex = Math.floor(Math.random() * taskIds.length);
          const selectedId = taskIds[randomIndex];
          setRandomTaskId(selectedId);

          const taskResponse = await getTask(selectedId);
          if (taskResponse && taskResponse.success) {
            setTitle(taskResponse.title);
            setContent(taskResponse.content);
          }
        } else {
          console.log("No hay tareas disponibles.");
        }
      } catch (error) {
        console.error("Error al obtener la tarea aleatoria:", error);
      }
    };

    if (!hasFetchedTask.current) {
      fetchRandomTask();
      hasFetchedTask.current = true;
    }
  }, []);

  const handleTask = async () => {
    try {
      const token = await getValueFor("token");
      if (token) {
        const Data = await uploadTask(titleSend, contentSend, token);
        if (Data.success) {
          setTitle("");
          setContent("");
          router.replace("/");
        } else {
          setErrorMessage("Error: " + Data.message);
        }
      } else {
        console.error("No match for token");
      }
    } catch (error) {
      console.error("Error adding marker:", error);
      setErrorMessage("Server Error");
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.scrollBackground]}>
      <View style={styles.container}>
        <View style={styles.video}>
          <YoutubeIframe
            height={videoHeight}
            width={videoWidth}
            videoId="9wvzEOq1imo"
          />
        </View>
        <View style={styles.row}>
          <View style={[styles.textContainer, styles.mRigth]}>
            <Text style={styles.h1}>Problema del Día</Text>
            {title ? (
              <>
                <Text style={styles.h2}>{title}</Text>
                <Text style={styles.mainText}>{content}</Text>
                <Image
                  source={require("../assets/images/registers.png")}
                  style={[styles.img, {marginBottom: 20}]}
                />
                <DefaultButton
                  key={randomTaskId}
                  press={() => router.replace(`/task/${randomTaskId}` as Href)}
                  text={"Detalles"}
                  vertical={true}
                />
              </>
            ) : (
              <Text style={styles.mainText}>Cargando tarea...</Text>
            )}
          </View>
          <View style={[styles.textContainer, styles.mLeft]}>
            <ScrollView>
              {tasks.map((id) => (
                <DefaultButton
                  key={id}
                  text={"Tarea " + id}
                  press={async () => {
                    try {
                      const taskResponse = await getTask(id.toString());
                      if (taskResponse && taskResponse.success) {
                        setTitle(taskResponse.title);
                        setContent(taskResponse.content);
                        setRandomTaskId(id);
                      }
                    } catch(error) {
                      console.error(error)
                    }
                  }}
                  vertical={true}
                />
              ))}
            </ScrollView>
          </View>
        </View>
        {isLoggedIn && (
          <View style={[styles.textContainer]}>
            <View style={[styles.container, styles.flex]}>
              <Text style={styles.header}>Crear Tarea</Text>
              {errorMessage && (
                <Text style={styles.errorMsg}>{errorMessage}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Titulo"
                value={titleSend}
                onChangeText={setTitleSend}
              />
              <TextInput
                editable
                multiline
                numberOfLines={100}
                maxLength={2000}
                style={[styles.input, { height: 300 }]}
                placeholder="Consignas"
                value={contentSend}
                onChangeText={setContentSend}
              />
              <View style={{ flexDirection: "row" }}>
                <Pressable style={styles.buttonSubmmit} onPress={handleTask}>
                  <Text style={styles.buttonText}>Publicar</Text>
                </Pressable>
                <Pressable
                  style={[styles.buttonSubmmit, styles.buttonCancel]}
                  onPress={() => router.replace("/")}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </View>
      {screenSize === "large" && isLoggedIn && (
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
