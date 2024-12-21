import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// const card_meta = "this is some meta data"; // Deliberately add unused variable

type CardProps = {
  name: string;
  set: string;
  cost: number;
  power: number;
  hp: string;
  type: string;
  traits: string[];
  rarity: string;
  frontArt: string;
};

export default function Card({
  name,
  set,
  cost,
  power,
  hp,
  type,
  traits,
  rarity,
  frontArt,
}: CardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: frontArt }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        {set && <Text style={styles.detail}>Set: {set}</Text>}
        {type && <Text style={styles.detail}>Type: {type}</Text>}
        {traits && traits.length > 0 && (
          <Text style={styles.detail}>Traits: {traits.join(", ")}</Text>
        )}
        {cost && <Text style={styles.detail}>Cost: {cost}</Text>}
        {power && <Text style={styles.detail}>Power: {power}</Text>}
        {hp && <Text style={styles.detail}>HP: {hp}</Text>}
        {rarity && <Text style={styles.detail}>Rarity: {rarity}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1F2937",
    borderRadius: 8,
    padding: 8,
    margin: 8,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: 120,
    height: 120,
    marginRight: 12,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: "#D1D5DB",
    marginBottom: 2,
  },
});
