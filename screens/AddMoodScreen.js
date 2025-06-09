import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { MoodContext } from "../context/MoodContext";
import CustomButton from "../components/CustomButton";
import { validateMood } from "../utils/moodService";

const MAX_LENGTH = 30;

export default function AddMoodScreen({ navigation }) {
  const { addMood } = useContext(MoodContext);
  const [newMood, setNewMood] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMood = async () => {
    const validationError = validateMood(newMood);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsLoading(true);
      await addMood(newMood.trim());
      navigation.goBack();
    } catch (err) {
      setError("Something went wrong. Please try again");
    } finally {
      setIsLoading(false);
      Keyboard.dismiss();
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
            onChangeText={(text) => {
              setNewMood(text);
              setError("");
            }}
            maxLength={MAX_LENGTH}
          />

          <View style={styles.metaRow}>
            <Text
              style={[
                styles.counter,
                newMood.trim().length > MAX_LENGTH && { color: "red" },
              ]}
            >
              {newMood.trim().length} / {MAX_LENGTH}
            </Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#4CAF50"
              style={{ marginTop: 20 }}
            />
          ) : (
            <CustomButton title="Add Mood" onPress={handleAddMood} />
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "5%",
    paddingVertical: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "white",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  counter: { fontSize: 13, color: "#555" },
  errorText: { color: "red", fontSize: 13, fontStyle: "italic" },
});
