import { getMarkers } from "@/constants/UrlApis";

interface MarkerResponse {
  message: string;
  success: boolean;
  markers: [];
  error?: string;
}

export const getUserMarkers = async (email: string): Promise<MarkerResponse> => {
    const url = `${getMarkers}?email=${encodeURIComponent(email)}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: MarkerResponse = await res.json();
    return data;
};
