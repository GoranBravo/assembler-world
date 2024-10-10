import { signup } from "@/constants/UrlApis";

interface RegisterResponse {
  message: string;
  success: boolean;
  token?: string;
  error?: string;
}

export const registerCheck = async (email: string, nombre: string, password: string): Promise<RegisterResponse> => {
  const res = await fetch(signup, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, nombre, password }),
  });

  const data: RegisterResponse = await res.json();
  return data;
};
