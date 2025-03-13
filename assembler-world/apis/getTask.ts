import { taskGet } from "@/constants/UrlApis";

interface GetTaskResponse {
  message: string;
  success: boolean;
  title: string;
  content: string;
  creator: string;
  error?: string;
}

export const getTask = async (idTask: string): Promise<GetTaskResponse> => {
  const res = await fetch(taskGet, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      task: idTask
    },
  });

  const data: GetTaskResponse = await res.json();
  return data;
};
