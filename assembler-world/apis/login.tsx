import { login } from "@/constants/UrlApis";

interface LoginResponse {
  // Define aquí la estructura de la respuesta que esperas recibir del servidor
  message: string;
  success: boolean;
  token?: string;
  error?: string;
}

export const loginCheck = async (email: string, password: string): Promise<LoginResponse> => {
  //petición a la url
  const res = await fetch(login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  // Devolver la respuesta del servidor, tipada como LoginResponse
  const data: LoginResponse = await res.json();
  return data;
};
