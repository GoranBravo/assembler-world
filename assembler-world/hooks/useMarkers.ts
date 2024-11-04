import { useEffect } from "react";
import { getUserMarkers } from "@/apis/getMarker";
import { getValueFor } from "@/utils/storage";
import { useMarkersContext } from "@/context/MarkersContext";
import { useAuthContext } from "@/context/AuthContext";

export const useMarkers = () => {
  const { markers, setMarkers, trigger } = useMarkersContext();
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const token = await getValueFor("token");
        if (token) {
          const data = await getUserMarkers(token);
          setMarkers(data.markers);
        }
      } catch (error) {
        console.error("Error fetching user markers:", error);
      }
    };

    if(isLoggedIn){
      fetchMarkers();
    }
  }, [trigger]);

  return { markers };
};
