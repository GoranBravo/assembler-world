import React from "react";
import { Pressable, Text } from "react-native";
import css from "@/styles/css";

export const DefaultButton: React.FC<{
  text: string;
  press: () => void;
  color?: string;
  vertical?: boolean;
}> = ({ text, press, color = "#007BFF", vertical = false }) => {
  let padH = 0;
  let padV = 0;
  if (vertical) {
    padV = 10;
  } else {
    padH = 10;
  }
  const styles = css()
  return (
    <Pressable
      onPress={press}
      style={[
        styles.button,
        { backgroundColor: color, marginLeft: padH, marginBottom: padV },
      ]}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};
