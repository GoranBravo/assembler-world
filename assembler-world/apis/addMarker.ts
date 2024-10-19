import { saveMarker } from "@/constants/UrlApis";

interface linkMarkerResponse {
  message: string;
  success: boolean;
  markerId: number;
  error?: string;
}

export const addMarker = async (markerLink: string, nombre: string, token: string): Promise<linkMarkerResponse> => {
  const res = await fetch(saveMarker, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth": token
    },
    body: JSON.stringify({ markerLink, nombre }),
  });

  const data: linkMarkerResponse = await res.json();
  return data;
};
