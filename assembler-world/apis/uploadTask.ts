import { taskUpload } from "@/constants/UrlApis";

interface UploadResponse {
  message: string;
  success: boolean;
  error?: string;
}

export const uploadTask = async (
  title: string,
  content: string,
  token: string
): Promise<UploadResponse> => {
  const res = await fetch(taskUpload, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth": token
    },
    body: JSON.stringify({ title, content }),
  });

  const data: UploadResponse = await res.json();
  return data;
};
