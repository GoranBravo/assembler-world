import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState("small");
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    const updateScreenSize = () => {
      const { width } = Dimensions.get("window");
      setScreenWidth(width);

      if (width > 1300) {
        setScreenSize("large");
      } else if (width > 900) {
        setScreenSize("medium");
      } else {
        setScreenSize("small");
      }
    };

    // Inicializar el tamaño de pantalla
    updateScreenSize();

    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      const { width } = window;
      setScreenWidth(width);
      updateScreenSize();
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  return { screenSize, screenWidth };
};
