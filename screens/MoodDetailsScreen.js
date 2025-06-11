import React, { useState, useContext } from "react";
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
import { validateComment } from "../utils/validation";

const MAX_LENGTH = 150;

export default function MoodDetailsScreen({ route, navigation }) {
  const { addComment } = useContext(MoodContext);
  const { moodItem } = route.params ?? {};

  if (!moodItem?.id) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Invalid mood data. Returning...</Text>
      </View>
    );
  }

  const [comment, setComment] = useState(moodItem.comment || "");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const validationError = validateComment(comment);
    if (validationError) {
      setError(validationError);
      return;
    }

    addComment(moodItem.id, comment.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
    navigation.goBack();
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>{moodItem.mood}</Text>

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
