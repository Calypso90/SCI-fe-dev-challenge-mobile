// app/(tabs)/index.tsx
import { useState } from "react";
import { StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Dropdown from "@/components/Dropdown";
import CardList from "@/components/CardList";

export default function HomeScreen() {
  const [selectedHP, setSelectedHP] = useState<string>("");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="magnifyingglass.circle.fill"
          style={styles.headerIcon}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Card Search</ThemedText>
      </ThemedView>

      <ThemedView style={styles.searchContainer}>
        <ThemedText type="subtitle">Filter by HP</ThemedText>
        <Dropdown onSelect={setSelectedHP} />
      </ThemedView>

      <ThemedView style={styles.resultContainer}>
        {selectedHP ? (
          <CardList hp={selectedHP} />
        ) : (
          <ThemedView style={styles.emptyState}>
            <ThemedText type="defaultSemiBold">
              Select an HP value to see matching cards
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  searchContainer: {
    gap: 8,
    marginBottom: 16,
  },
  resultContainer: {
    flex: 1,
  },
  emptyState: {
    alignItems: "center",
    padding: 20,
  },
});
