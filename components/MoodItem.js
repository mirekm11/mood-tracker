import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function MoodItem({ item, onPress, onSpeak, onDelete }) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.item} onPress={onPress}>
        <Text style={styles.moodText}>{item.mood}</Text>
        {item.comment ? (
          <Text style={styles.commentText}>💬 {item.comment}</Text>
        ) : (
          <Text style={styles.noCommentText}>✏️ Add comment</Text>
        )}
        {item.locationName && (
          <Text style={styles.locationText}>📍 {item.locationName}</Text>
        )}
        {item.date && <Text style={styles.dateText}>📅 {item.date}</Text>}
      </TouchableOpacity>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.iconButton} onPress={onSpeak}>
          <Text style={styles.iconText}>🔈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onDelete}>
          <Text style={styles.iconText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d1e7dd",
    borderRadius: 10,
    marginBottom: 12,
    paddingRight: 10,
  },
  item: {
    flex: 1,
    padding: 16,
  },
  moodText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  commentText: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  noCommentText: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
    fontStyle: "italic",
  },
  locationText: {
    fontSize: 15,
    color: "#777",
    marginTop: 4,
  },
  dateText: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 6,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  iconText: {
    fontSize: 18,
  },
});
