import React, { useEffect, useRef, useState } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import css from "@/styles/css";
import { getTask } from "@/apis/getTask";
import { DefaultButton } from "@/components/DefaultButton";
import { getAllTaskId } from "@/apis/getAllTaskId";
import { Href, router } from "expo-router";
import { getValueFor } from "@/utils/storage";
import { taskDelete } from "@/apis/deleteTask";

interface TaskProps {
  taskId: number;
}

const Task: React.FC<TaskProps> = ({ taskId }) => {
  const styles = css();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

  return (
    <ScrollView contentContainerStyle={[styles.scrollBackground, styles.flex]}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.textContainer, styles.mRigth]}>
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
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <DefaultButton text="Volver" press={() => router.replace("/")} />
              <DefaultButton text="Eliminar" press={handleDelete} color="red" />
            </View>
          </View>
          <View style={[styles.textContainer, styles.mLeft]}>
            <ScrollView>
              {tasks.map((id) => (
                <DefaultButton
                  key={id}
                  text={"Tarea " + id}
                  press={async () => {
                    const taskResponse = await getTask(id);
                    if (taskResponse && taskResponse.success) {
                      taskId = id;
                      setTitle(taskResponse.title);
                      setContent(taskResponse.content);
                      router.setParams({ id });
                      router.replace(`/task/${id}` as Href)}
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
