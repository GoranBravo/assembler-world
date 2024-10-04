import React from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";

export const FavButton: React.FC<{
  text: string;
  press: () => void;
}> = ({ text, press }) => {
  return (
    <Pressable
      onPress={press}
      style={styles.button}
    >
      <Image style={styles.image} source={require('../assets/images/starUnmark.png')}/>
      <Image style={styles.image} source={require('../assets/images/starMark.png')}/>
      <Text>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    marginTop: 15,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    color: "white",
    fontSize: 16,
    backgroundColor: "gray"
  },
  image: {
    marginRight: 10,
    height: 20,
    width: 20,
  },
});
