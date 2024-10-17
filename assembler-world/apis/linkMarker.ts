import { linkMarker } from "@/constants/UrlApis";

interface linkMarkerResponse {
  message: string;
  success: boolean;
  token?: string;
  error?: string;
}

export const markerLink = async (markerId: number, token: string): Promise<linkMarkerResponse> => {
  const res = await fetch(linkMarker, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth": token
    },
    body: JSON.stringify({ markerId }),
  });

  const data: linkMarkerResponse = await res.json();
  return data;
};
