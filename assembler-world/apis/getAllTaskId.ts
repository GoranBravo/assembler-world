import { allTaskId } from "@/constants/UrlApis";

interface getTasksIdResponse {
  message: string;
  success: boolean;
  taskIds: [];
  error?: string;
}

export const getAllTaskId = async (): Promise<getTasksIdResponse> => {
  const res = await fetch(allTaskId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });

  const data: getTasksIdResponse = await res.json();
  return data;
};
