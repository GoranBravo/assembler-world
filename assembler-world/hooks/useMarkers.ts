import { useEffect } from "react";
import { getUserMarkers } from "@/apis/getMarker";
import { getValueFor } from "@/utils/storage";
import { useMarkersContext } from "@/context/MarkersContext";

export const useMarkers = () => {
  const { markers, setMarkers, refreshMarkers } = useMarkersContext();

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

    fetchMarkers();
  }, []);

  return { markers, refreshMarkers };
};
