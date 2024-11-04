import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Button,
} from "react-native";
import css from "@/styles/css";
import { getTask } from "@/apis/getTask";
import { DefaultButton } from "@/components/DefaultButton";
import { getAllTaskId } from "@/apis/getAllTaskId";
import { Href, router } from "expo-router";
import { getValueFor } from "@/utils/storage";
import { taskDelete } from "@/apis/deleteTask";
import { useAuthContext } from "@/context/AuthContext";
import { modifyTask } from "@/apis/modifyTask";

interface TaskProps {
  taskId: number;
}

const Task: React.FC<TaskProps> = ({ taskId }) => {
  const styles = css();

  const { isLoggedIn } = useAuthContext();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [titleSend, setTitleSend] = useState<string>("");
  const [contentSend, setContentSend] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const hasFetchedTask = useRef(false);

  useEffect(() => {
    const fetchRandomTask = async () => {
      try {
        const response = await getAllTaskId();
        if (response.success && response.taskIds.length > 0) {
          const taskIds = response.taskIds;
          setTasks(taskIds);
          const taskResponse = await getTask(taskId.toString());
          if (taskResponse && taskResponse.success) {
            setTitle(taskResponse.title);
            setContent(taskResponse.content);
            setTitleSend(taskResponse.title);
            setContentSend(taskResponse.content);
            router.setParams({ taskId });
          }
        }
      } catch (error) {
        console.error("Error al obtener las tareas", error);
      }
    };

    if (!hasFetchedTask.current) {
      fetchRandomTask();
      hasFetchedTask.current = true;
    }
  }, [taskId]);

  const handleDelete = async () => {
    try {
      const token = await getValueFor("token");
      if (token) {
        await taskDelete(taskId, token);
        router.replace("/");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const token = await getValueFor("token");
      if (token) {
        await modifyTask(taskId, titleSend, contentSend, token);
        setModalVisible(false);
        router.replace(`/task/${taskId}` as Href);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      setErrorMessage("Error updating task:" + error);
    }
  };

  const handleCancelar = () => {
    setTitleSend(title);
    setContentSend(content);
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollBackground}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View
            style={[
              styles.textContainer,
              styles.boxBorder,
              styles.mRigth,
              { marginTop: 20 },
            ]}
          >
            {title ? (
              <>
                <Text style={styles.h2}>{title}</Text>
                <Text style={styles.mainText}>{content}</Text>
                <Image
                  source={require("../assets/images/registers.png")}
                  style={styles.img}
                />
              </>
            ) : (
              <Text style={styles.mainText}>Cargando tarea...</Text>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
                columnGap: 15,
              }}
            >
              <DefaultButton
                text="Volver"
                press={() => router.replace("/")}
                vertical={true}
                flexButton={true}
              />
              {isLoggedIn && title ? (
                <>
                  <DefaultButton
                    text="Eliminar"
                    press={handleDelete}
                    color="red"
                    vertical={true}
                    flexButton={true}
                  />
                  <DefaultButton
                    text="Editar"
                    press={() => setModalVisible(true)}
                    color="#D29E16"
                    vertical={true}
                    flexButton={true}
                  />
                </>
              ) : null}
            </View>
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Editar Tarea</Text>
                {errorMessage ? (
                  <Text style={styles.errorMsg}>{errorMessage}</Text>
                ) : null}
                <TextInput
                  style={styles.input}
                  placeholder="Título"
                  value={titleSend}
                  onChangeText={setTitleSend}
                />
                <TextInput
                  style={[styles.input, { height: 300 }]}
                  placeholder="Contenido"
                  value={contentSend}
                  onChangeText={setContentSend}
                  multiline
                  numberOfLines={100}
                  maxLength={2000}
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
                    press={handleEdit}
                    vertical={true}
                    flexButton={true}
                    color="#E47A17"
                    colortext="#2C2C2C"
                  />
                  <DefaultButton
                    text="Cancelar"
                    press={handleCancelar}
                    vertical={true}
                    flexButton={true}
                  />
                </View>
              </View>
            </View>
          </Modal>

          <View
            style={[
              styles.textContainer,
              styles.boxBorder,
              styles.mLeft,
              { marginTop: 20 },
            ]}
          >
            <ScrollView>
              {tasks.map((id) => (
                <DefaultButton
                  key={id}
                  text={"Tarea " + id}
                  press={async () => {
                    try {
                      const taskResponse = await getTask(id);
                      if (taskResponse && taskResponse.success) {
                        taskId = id;
                        setTitle(taskResponse.title);
                        setContent(taskResponse.content);
                        router.setParams({ id });
                        router.replace(`/task/${id}` as Href);
                      }
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                  vertical={true}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Task;
