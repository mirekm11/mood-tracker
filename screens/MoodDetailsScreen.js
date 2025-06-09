import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MoodContext } from "../context/MoodContext";
import CustomButton from "../components/CustomButton";

const MAX_LENGTH = 150;

export default function MoodDetailsScreen({ route, navigation }) {
  const { moodList, addComment } = useContext(MoodContext);

  const { id = null } = route.params ?? {};

  const moodEntry = moodList.find((mood) => mood.id === id);

  const [comment, setComment] = useState(moodEntry?.comment || "");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!moodEntry) {
      setTimeout(() => navigation.goBack(), 1500);
    }
  }, [moodEntry, navigation]);

  const validateComment = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return "Comment cannot be empty";
    if (trimmed.length < 5) return "Comment is too short";
    if (trimmed.length > MAX_LENGTH) return `Maximum ${MAX_LENGTH} characters`;
    return "";
  };

  const handleSave = () => {
    const validationError = validateComment(comment);
    if (validationError) {
      setError(validationError);
      return;
    }

    addComment(id, comment.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
    navigation.goBack();
    Keyboard.dismiss();
  };

  if (!moodEntry) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Mood not found. Returning...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>{moodEntry.mood}</Text>

          <TextInput
            style={styles.input}
            placeholder="Why do you feel this way?"
            value={comment}
            onChangeText={(text) => {
              setComment(text);
              setError("");
              setSaved(false);
            }}
            multiline
            maxLength={MAX_LENGTH}
          />

          <View style={styles.metaRow}>
            <Text
              style={[
                styles.counter,
                comment.trim().length > MAX_LENGTH && { color: "red" },
              ]}
            >
              {comment.trim().length} / {MAX_LENGTH}
            </Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {saved ? <Text style={styles.successText}>Saved! ✅</Text> : null}
          </View>

          <CustomButton title="Save Comment" onPress={handleSave} />
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
  title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    borderRadius: 8,
    height: 100,
    marginBottom: 8,
    backgroundColor: "white",
    textAlignVertical: "top",
  },
  metaRow: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  counter: {
    fontSize: 13,
    color: "#555",
  },
  errorText: {
    color: "red",
    fontSize: 13,
    fontStyle: "italic",
    alignSelf: "flex-start",
    marginTop: 6,
  },
  successText: {
    color: "green",
    fontSize: 13,
    marginTop: 6,
  },
});
