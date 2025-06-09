import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EmptyState({ message = "No data available" }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  text: {
    fontSize: 18,
    color: "#888",
  },
});
