import { userGet } from "@/constants/UrlApis";

interface GetUserResponse {
  message: string;
  success: boolean;
  nombre?: string;
  mail?: string;
  error?: string;
}

export const getUser = async (token: string): Promise<GetUserResponse> => {
  const res = await fetch(userGet, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth": token
    },
  });

  const data: GetUserResponse = await res.json();
  return data;
};
