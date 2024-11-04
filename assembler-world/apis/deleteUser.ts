import { userDelete } from "@/constants/UrlApis";

interface deleteUserResponse {
  message: string;
  success: boolean;
  error?: string;
}

export const deleteUser = async (
  token: string
): Promise<deleteUserResponse> => {
  const res = await fetch(userDelete, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth": token
    },
  });

  const data: deleteUserResponse = await res.json();
  return data;
};
