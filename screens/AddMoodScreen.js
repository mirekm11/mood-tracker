import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { MoodContext } from "../context/MoodContext";

export default function AddMoodScreen({ navigation }) {
  const { addMood } = useContext(MoodContext);
  const [newMood, setNewMood] = useState("");

  const handleAddMood = async () => {
    if (newMood.trim().length > 0) {
      await addMood(newMood);

      Alert.alert("Nastrój zapisany", `Dodano nastrój: ${newMood}`);

      Keyboard.dismiss();
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>What's your mood?</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your mood (e.g., Happy)"
            value={newMood}
            onChangeText={setNewMood}
          />

          <TouchableOpacity style={styles.button} onPress={handleAddMood}>
            <Text style={styles.buttonText}>Add Mood</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
