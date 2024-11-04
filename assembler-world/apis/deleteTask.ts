import { deleteTask } from "@/constants/UrlApis";

interface deleteResponse {
  message: string;
  success: boolean;
  error?: string;
}

export const taskDelete = async (
  idTask: number,
  token: string
): Promise<deleteResponse> => {
  const res = await fetch(deleteTask, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth": token
    },
    body: JSON.stringify({ idTask }),
  });

  const data: deleteResponse = await res.json();
  return data;
};
