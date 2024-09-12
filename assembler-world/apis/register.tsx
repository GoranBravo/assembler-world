import { signup } from "@/constants/UrlApis";

interface RegisterResponse {
  // Define aquí la estructura de la respuesta que esperas recibir del servidor
  message: string;
  success: boolean;
  token?: string;
  error?: string;
}

export const registerCheck = async (email: string, nombre: string, password: string): Promise<RegisterResponse> => {
  //petición a la url
  const res = await fetch(signup, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, nombre, password }),
  });

  // Devolver la respuesta del servidor, tipada como RegisterResponse
  const data: RegisterResponse = await res.json();
  return data;
};
