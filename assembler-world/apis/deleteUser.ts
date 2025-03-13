import { userDelete } from "@/constants/UrlApis";

interface GeleteUserResponse {
  message: string;
  success: boolean;
  error?: string;
}

export const deleteUser = async (
  token: string
): Promise<GeleteUserResponse> => {
  const res = await fetch(userDelete, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth": token
    },
  });

  const data: GeleteUserResponse = await res.json();
  return data;
};
