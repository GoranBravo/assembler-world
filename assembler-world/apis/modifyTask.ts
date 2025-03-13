import { editTask } from "@/constants/UrlApis";

interface EditTaskResponse {
  message: string;
  success: boolean;
  error?: string;
}

export const modifyTask = async (
  idTask: number,
  title: string,
  content: string,
  token: string
): Promise<EditTaskResponse> => {
  const res = await fetch(editTask, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth": token
    },
    body: JSON.stringify({ idTask, title, content }),
  });

  const data: EditTaskResponse = await res.json();
  return data;
};
