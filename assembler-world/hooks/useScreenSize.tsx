import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState("small");
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [videoWidth, setVideoWidth] = useState(500);
  const [videoMargin, setVideoMargin] = useState(20);
  const [videoHeight, setVideoHeight] = useState(500 * (9 / 16));

  useEffect(() => {
    const updateScreenSize = () => {
      const { width } = Dimensions.get("window");
      setScreenWidth(width);

      if (width > 1500) {
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

  // Efecto separado para actualizar videoWidth y videoMargin
  useEffect(() => {
    if (screenSize === "large") {
      setVideoWidth(screenWidth - 700);
      setVideoMargin(350);
    } else if (screenSize === "medium") {
      setVideoWidth(screenWidth - 300);
      setVideoMargin(150);
    } else {
      setVideoWidth(screenWidth - 40);
      setVideoMargin(20);
    }

    // Actualizar videoHeight basado en el nuevo videoWidth
    setVideoHeight(videoWidth * (9 / 16));
  }, [screenSize, screenWidth]);

  return { screenSize, screenWidth, videoWidth, videoMargin, videoHeight };
};
