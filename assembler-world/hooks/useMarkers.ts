import { getUserMarkers } from "@/apis/getMarker";
import { useEffect, useState } from "react";

export const useMarkers = () => {
    const [userMarkers, setUserMarkers] = useState<{ link: string; id: number }[]>(
    []
    ); // Para almacenar los marcadores del usuario

    // Obtener los marcadores del usuario admin
    useEffect(() => {
    const fetchMarkers = async () => {
        try {
        const data = await getUserMarkers("admin");
        console.log(data.markers, "hereeee");
        setUserMarkers(data.markers); // Guardar los marcadores en el estado
        } catch (error) {
        console.error("Error fetching user markers:", error);
        }
    };

    fetchMarkers();
    }, []);
    return {userMarkers}
}
