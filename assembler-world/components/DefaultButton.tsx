import React from "react";
import { Pressable, Text } from "react-native";
import css from "@/styles/css";
import { useMarkersContext } from "@/context/MarkersContext";

export const DefaultButton: React.FC<{
  text: string;
  press: () => void;
  color?: string;
  vertical?: boolean;
  closeAfter?: boolean;
  colortext?: string;
}> = ({
  text,
  press,
  color = "#007BFF",
  vertical = false,
  closeAfter = true,
  colortext = "white",
}) => {
  let padH = 0;
  let padV = 0;
  if (vertical) {
    padV = 10;
  } else {
    padH = 10;
  }
  const { setIsVisible } = useMarkersContext();
  const styles = css();
  const handlepress = () => {
    press();
    if (closeAfter) {
      setIsVisible(false);
    }
  };
  return (
    <Pressable
      onPress={handlepress}
      style={[
        styles.button,
        { backgroundColor: color, marginLeft: padH, marginBottom: padV },
      ]}
    >
      <Text
        style={[styles.buttonText, { color: colortext, fontWeight: "500" }]}
      >
        {text}
      </Text>
    </Pressable>
  );
};
