import { linkMarker } from "@/constants/UrlApis";

interface LinkMarkerResponse {
  message: string;
  success: boolean;
  token?: string;
  error?: string;
}

export const markerLink = async (markerId: number, token: string): Promise<LinkMarkerResponse> => {
  const res = await fetch(linkMarker, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth": token
    },
    body: JSON.stringify({ markerId }),
  });

  const data: LinkMarkerResponse = await res.json();
  return data;
};
