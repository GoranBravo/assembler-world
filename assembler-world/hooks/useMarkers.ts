import { getUserMarkers } from "@/apis/getMarker";
import { useEffect, useState } from "react";

export const useMarkers = () => {
  const [userMarkers, setUserMarkers] = useState<
    { link: string; id: number }[]
  >([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const data = await getUserMarkers("admin");
        console.log(data.markers, "hereeee");
        setUserMarkers(data.markers);
      } catch (error) {
        console.error("Error fetching user markers:", error);
      }
    };

    fetchMarkers();
  }, []);
  return { userMarkers };
};
