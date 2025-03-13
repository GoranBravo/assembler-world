import { deleteTask } from "@/constants/UrlApis";

interface DeleteResponse {
  message: string;
  success: boolean;
  error?: string;
}

export const taskDelete = async (
  idTask: number,
  token: string
): Promise<DeleteResponse> => {
  const res = await fetch(deleteTask, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth": token
    },
    body: JSON.stringify({ idTask }),
  });

  const data: DeleteResponse = await res.json();
  return data;
};
