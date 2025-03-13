import { userUpdate } from "@/constants/UrlApis";

interface UploadUserResponse {
  message: string;
  success: boolean;
  error?: string;
}

export const uploadUser = async (
  token: string,
  mail: string,
  nombre: string,
  password: string,
  oldPassword: string
): Promise<UploadUserResponse> => {
  const res = await fetch(userUpdate, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth": token
    },
    body: JSON.stringify({ mail, nombre, password, oldPassword }),
  });

  const data: UploadUserResponse = await res.json();
  return data;
};
