import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MoodDetailsScreen({ route }) {
  const { mood } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Details</Text>
      <Text style={styles.moodText}>{mood}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  moodText: {
    fontSize: 20,
  },
});
