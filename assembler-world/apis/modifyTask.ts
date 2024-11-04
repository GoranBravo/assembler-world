import { editTask } from "@/constants/UrlApis";

interface editTaskResponse {
  message: string;
  success: boolean;
  error?: string;
}

export const modifyTask = async (
  idTask: number,
  title: string,
  content: string,
  token: string
): Promise<editTaskResponse> => {
  const res = await fetch(editTask, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      auth: token,
    },
    body: JSON.stringify({ idTask, title, content }),
  });

  const data: editTaskResponse = await res.json();
  return data;
};
