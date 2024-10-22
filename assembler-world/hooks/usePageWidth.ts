import { useEffect, useState } from "react";
import { useScreenSize } from "./useScreenSize";

export const usePageWidth = () => {
  const { screenSize, screenWidth } = useScreenSize();
  const [pageWidth, setPageWidth] = useState(screenWidth);
  const [videoWidth, setVideoWidth] = useState(500);
  const [videoHeight, setVideoHeight] = useState(500 * (9 / 16));
  const [widthSlider, setWidthSlider] = useState(500 * (9 / 16));

  useEffect(() => {
    if (screenSize === "large") {
      setPageWidth(screenWidth / 2 - 40);
      setVideoWidth(screenWidth - 600);
      setWidthSlider(screenWidth * 0.2)
    } else if (screenSize === "medium") {
      setPageWidth(screenWidth);
      setVideoWidth(screenWidth - 300);
      setWidthSlider(screenWidth * 0.3)
    } else {
      setPageWidth(screenWidth);
      setVideoWidth(screenWidth - 60);
      setWidthSlider(screenWidth * 0.6)
    }

    setVideoHeight(videoWidth * (9 / 16));
  }, [screenWidth, pageWidth, screenSize, videoWidth]);
  return { pageWidth, videoWidth, videoHeight, widthSlider };
};
