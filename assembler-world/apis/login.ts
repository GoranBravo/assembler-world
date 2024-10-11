import { login } from "@/constants/UrlApis";

interface LoginResponse {
  message: string;
  success: boolean;
  token?: string;
  error?: string;
}

export const loginCheck = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const res = await fetch(login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data: LoginResponse = await res.json();
  return data;
};
