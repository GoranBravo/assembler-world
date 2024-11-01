import React from "react";
import { useRouter } from "expo-router";
import Task from "@/app/Task"; // Adjust the import according to your project structure
import { Text } from "react-native";

const TaskPage: React.FC = () => {
  const router = useRouter();
  const { taskId } = router.setParams; // Get taskId from the route parameters

  if (!taskId) {
    return <Text>Cargando...</Text> // Loading state
  }

  return <Task taskId={Number(taskId)} />; // Pass taskId as a prop to Task component
};

export default TaskPage;
