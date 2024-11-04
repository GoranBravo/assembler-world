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
  flexButton?: boolean;
}> = ({
  text,
  press,
  color = "#164AAD",
  vertical = false,
  closeAfter = true,
  colortext = "white",
  flexButton = false,
}) => {
  let padH = 0;
  let padV = 0;
  if (vertical) {
    padV = 10;
  } else {
    padH = 10;
  }
  const { setIsVisible } = useMarkersContext();
  let flex;
  const styles = css();
  const handlepress = () => {
    press();
    if (closeAfter) {
      setIsVisible(false);
    }
  };
  if (flexButton) {
    flex = 1;
  }
  return (
    <Pressable
      onPress={handlepress}
      style={[
        styles.button,
        { backgroundColor: color, marginLeft: padH, marginBottom: padV, flex },
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
