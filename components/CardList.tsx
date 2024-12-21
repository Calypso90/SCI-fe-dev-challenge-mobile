import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Card from "./Card";
import { searchCards } from "../api/api";

type CardData = {
  set: string;
  number: string;
  name: string;
  type: string;
  aspects: string[];
  traits: string[];
  arenas: string[];
  cost: number;
  power: number;
  hp: string;
  fronttext: string;
  doublesided: boolean;
  rarity: string;
  unique: boolean;
  artist: string;
  varianttype: string;
  marketprice: string;
  foilprice: string;
  frontArt: string;
  id: string;
};

type CardListProps = {
  hp: string;
};

export default function CardList({ hp }: CardListProps) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<keyof CardData>("name");

  useEffect(() => {
    if (!hp) return;

    const fetchCardData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await searchCards(hp);
        const formattedCards = Array.isArray(result.data)
          ? result.data.map((card: any) => ({
              set: card.Set,
              number: card.Number,
              name: card.Name,
              type: card.Type,
              aspects: card.Aspects,
              traits: card.Traits,
              arenas: card.Arenas,
              cost: card.Cost,
              power: card.Power,
              hp: card.HP,
              fronttext: card.FrontText,
              doublesided: card.DoubleSided,
              rarity: card.Rarity,
              unique: card.Unique,
              artist: card.Artist,
              varianttype: card.VariantType,
              marketprice: card.MarketPrice,
              foilprice: card.FoilPrice,
              frontArt: card.FrontArt,
              id: `${card.Set}-${card.Number}`,
            }))
          : [];

        setCards(
          formattedCards.sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1))
        );
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, [hp, sortKey]);

  const sortCards = (key: keyof CardData) => {
    setSortKey(key);
    setCards([...cards].sort((a, b) => (a[key] > b[key] ? 1 : -1)));
  };

  const renderSortButton = (
    label: string,
    key: keyof CardData,
    color: string
  ) => (
    <TouchableOpacity
      style={[
        styles.sortButton,
        { backgroundColor: color },
        sortKey === key && styles.activeButton, // Apply the glow effect if this button is active
      ]}
      onPress={() => sortCards(key)}
    >
      <Text style={styles.sortButtonText}>Sort by {label}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <Text style={styles.messageText}>Loading cards...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.sortButtons}>
        {renderSortButton("Name", "name", "#3B82F6")}
        {renderSortButton("Set", "set", "#10B981")}
        {renderSortButton("Cost", "cost", "#8B5CF6")}
        {renderSortButton("Power", "power", "#EF4444")}
      </View>
      <FlatList
        data={cards}
        renderItem={({ item }) => <Card {...item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#111827",
  },
  sortButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    flexWrap: "wrap",
    gap: 8,
  },
  sortButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 100,
  },
  sortButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  activeButton: {
    shadowColor: "#FFFFFF",
    backgroundColor: "#111827",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  listContent: {
    paddingBottom: 16,
  },
  messageText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    padding: 16,
  },
  errorText: {
    textAlign: "center",
    color: "#EF4444",
    fontSize: 16,
    padding: 16,
  },
});
