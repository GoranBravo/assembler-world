import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export const DefaultButton: React.FC<{
  text: string;
  press: () => void;
  color: string;
  vertical: boolean;
}> = ({ text, press, color, vertical }) => {
  let padH = 0;
  let padV = 0;
  if (vertical) {
    padV = 5;
  } else {
    padH = 10;
  }
  return (
    <Pressable
      onPress={press}
      style={[
        styles.button,
        { backgroundColor: color, marginLeft: padH, marginVertical: padV },
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});
