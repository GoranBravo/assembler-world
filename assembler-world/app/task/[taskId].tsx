import React from "react";
import { useGlobalSearchParams } from "expo-router";
import Task from "@/app/Task";
import { Text } from "react-native";

const TaskPage: React.FC = () => {
  const { taskId } = useGlobalSearchParams();

  if (!taskId) {
    return <Text>Cargando...</Text>
  }

  return <Task taskId={Number(taskId)} />;
};

export default TaskPage;
