import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MoodContext } from "../context/MoodContext";
import * as Speech from "expo-speech";

export default function HomeScreen({ navigation }) {
  const { moodList, deleteMood } = useContext(MoodContext);

  const readComment = (comment) => {
    if (comment?.trim()) {
      Speech.speak(comment);
    } else {
      Speech.speak("No comment available.");
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("Add Mood")}
          >
            <Text style={styles.addButtonText}>+ Add Mood</Text>
          </TouchableOpacity>

          <FlatList
            data={moodList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.moodItemWrapper}>
                <TouchableOpacity
                  style={styles.moodItem}
                  onPress={() =>
                    navigation.navigate("Mood Details", {
                      mood: item.mood,
                      comment: item.comment,
                      id: item.id,
                    })
                  }
                >
                  <Text style={styles.moodText}>{item.mood}</Text>
                  {item.comment ? (
                    <Text style={styles.commentText}>💬 {item.comment}</Text>
                  ) : (
                    <Text style={styles.noCommentText}>✏️ Add comment</Text>
                  )}
                  {item.locationName ? (
                    <Text style={styles.locationText}>
                      📍 {item.locationName}
                    </Text>
                  ) : null}
                  {item.date ? (
                    <Text style={styles.dateText}>📅 {item.date}</Text>
                  ) : null}
                </TouchableOpacity>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.speakButton}
                    onPress={() => readComment(item.comment)}
                  >
                    <Text style={styles.speakButtonText}>🔈</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteMood(item.id)}
                  >
                    <Text style={styles.deleteButtonText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No moods yet. Add some!</Text>
              </View>
            }
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f2f2f2" },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  moodItemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d1e7dd",
    borderRadius: 10,
    marginBottom: 12,
    paddingRight: 10,
  },
  moodItem: { flex: 1, padding: 16 },
  moodText: { fontSize: 18, color: "#333", fontWeight: "bold" },
  commentText: { fontSize: 14, color: "#555", marginTop: 4 },
  noCommentText: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
    fontStyle: "italic",
  },
  locationText: { fontSize: 15, color: "#777", marginTop: 4 },
  dateText: { fontSize: 12, color: "#777", marginTop: 4 },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 6,
  },
  speakButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  speakButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: { fontSize: 18, color: "#888" },
});
