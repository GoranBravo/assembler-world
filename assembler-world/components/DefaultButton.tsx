import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export const DefaultButton: React.FC<{
  text: string;
  press: () => void;
  color: string;
}> = ({ text, press, color }) => {
  return (
    <Pressable
      onPress={press}
      style={[styles.button, { backgroundColor: color }]}
    >
      <Text>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    color: "white",
    fontSize: 16,
  },
});
