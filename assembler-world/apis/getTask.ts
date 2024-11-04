import { taskGet } from "@/constants/UrlApis";

interface getTaskResponse {
  message: string;
  success: boolean;
  title: string;
  content: string;
  creator: string;
  error?: string;
}

export const getTask = async (idTask: string): Promise<getTaskResponse> => {
  const res = await fetch(taskGet, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      task: idTask,
    },
  });

  const data: getTaskResponse = await res.json();
  return data;
};
