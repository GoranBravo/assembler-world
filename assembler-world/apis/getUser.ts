import { userGet } from "@/constants/UrlApis";

interface getUserResponse {
  message: string;
  success: boolean;
  nombre?: string;
  mail?: string;
  error?: string;
}

export const getUser = async (token: string): Promise<getUserResponse> => {
  const res = await fetch(userGet, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth": token
    },
  });

  const data: getUserResponse = await res.json();
  return data;
};
