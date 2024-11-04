import { userUpdate } from "@/constants/UrlApis";

interface uploadUserResponse {
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
): Promise<uploadUserResponse> => {
  const res = await fetch(userUpdate, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth": token
    },
    body: JSON.stringify({ mail, nombre, password, oldPassword }),
  });

  const data: uploadUserResponse = await res.json();
  return data;
};
