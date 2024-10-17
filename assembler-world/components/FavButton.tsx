import React from "react";
import { Href, router } from "expo-router";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { getValueFor } from "@/utils/storage";
import { markerLink } from "@/apis/linkMarker";
import { useMarkers } from "@/hooks/useMarkers";

export const FavButton: React.FC<{
  markerId: number;
  text: string;
  press: string;
  vertical?: boolean;
  pined?: boolean;
}> = ({ markerId, text, press, vertical = false, pined = false }) => {
  let padH = 0;
  let padV = 0;
  if (vertical) {
    padV = 10;
  } else {
    padH = 10;
  }
  const { refreshMarkers } = useMarkers();
  const vinMarker = async () => {
    try {
      const token = await getValueFor("token");
      token ? (await markerLink(markerId, token)) : null;
    } catch (error) {
      console.error("Error deleating marker:", error);
    }
    {refreshMarkers}
  };
  return (
    <Pressable onPress={() => router.replace(press as Href)} style={[styles.button, { marginLeft: padH, marginBottom: padV }]}>
      <Pressable onPress={() => vinMarker()}>
        {pined ? (
          <Image
            style={styles.image}
            source={require("../assets/images/starMark.png")}
          />
        ) : (
          <Image
            style={styles.image}
            source={require("../assets/images/starUnmark.png")}
          />
        )}
      </Pressable>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    flexDirection: "row",
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "gray",
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
