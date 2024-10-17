import { getMarkers } from "@/constants/UrlApis";

interface MarkerResponse {
  message: string;
  success: boolean;
  markers: [];
  error?: string;
}

export const getUserMarkers = async (token: string): Promise<MarkerResponse> => {
  const res = await fetch(getMarkers, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth": token
    },
  });

  const data: MarkerResponse = await res.json();
  return data;
};
