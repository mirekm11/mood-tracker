import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { MoodContext } from '../context/MoodContext';

export default function AddMoodScreen({ navigation }) {
  const { addMood } = useContext(MoodContext);
  const [newMood, setNewMood] = useState('');

  const handleAddMood = () => {
    if (newMood.trim() !== '') {
      addMood(newMood.trim());
      setNewMood('');
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your mood:</Text>
      <TextInput
        style={styles.input}
        value={newMood}
        onChangeText={setNewMood}
        placeholder="e.g., Happy, Sad, Excited..."
      />
      <Button title="Add Mood" onPress={handleAddMood} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
});
