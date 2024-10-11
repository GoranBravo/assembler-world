import React from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";

export const FavButton: React.FC<{
  text: string;
  press: () => void;
  vertical?: boolean;
  pined?: boolean
}> = ({ text, press, vertical = false, pined = false }) => {
  let padH = 0;
  let padV = 0;
  if (vertical) {
    padV = 10;
  } else {
    padH = 10;
  }
  return (
    <Pressable
      onPress={press}
      style={[styles.button, { marginLeft: padH, marginBottom: padV }]}
    >
      {pined ? (
        <Image style={styles.image} source={require('../assets/images/starMark.png')} />
      ) : (
        <Image style={styles.image} source={require('../assets/images/starUnmark.png')} />
      )}
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "gray"
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  image: {
    marginRight: 10,
    height: 20,
    width: 20,
  },
});
