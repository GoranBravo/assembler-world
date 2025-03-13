import { allTaskId } from "@/constants/UrlApis";

interface GetTasksIdResponse {
  message: string;
  success: boolean;
  taskIds: [];
  error?: string;
}

export const getAllTaskId = async (): Promise<GetTasksIdResponse> => {
  const res = await fetch(allTaskId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });

  const data: GetTasksIdResponse = await res.json();
  return data;
};
