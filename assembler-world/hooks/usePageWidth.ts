import { useEffect, useState } from "react";
import { useScreenSize } from "./useScreenSize";

export const usePageWidth = () => {
  const { screenSize, screenWidth } = useScreenSize();
  const [pageWidth, setPageWidth] = useState(screenWidth);
  const [videoWidth, setVideoWidth] = useState(500);
  const [videoHeight, setVideoHeight] = useState(500 * (9 / 16));
  const [widthSlider, setWidthSlider] = useState(500 * (9 / 16));

  type FlexType = "row" | "column" | "row-reverse" | "column-reverse";
  const [flexDir, setFlexDir] = useState<FlexType>("column");

  useEffect(() => {
    if (screenSize === "large") {
      setPageWidth(screenWidth / 2);
      setVideoWidth(screenWidth - 600);
      setWidthSlider(screenWidth * 0.2);
      setFlexDir("row");
    } else if (screenSize === "medium") {
      setPageWidth(screenWidth);
      setVideoWidth(screenWidth - 300);
      setWidthSlider(screenWidth * 0.3);
      setFlexDir("column");
    } else {
      setPageWidth(screenWidth);
      setVideoWidth(screenWidth - 60);
      setWidthSlider(screenWidth * 0.6);
      setFlexDir("column");
    }

    setVideoHeight(videoWidth * (9 / 16));
  }, [screenWidth, pageWidth, screenSize, videoWidth]);
  return { pageWidth, videoWidth, videoHeight, widthSlider, flexDir };
};
