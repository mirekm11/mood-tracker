import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function MoodItem({ item, onNavigate, onSpeak, onDelete }) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.item} onPress={() => onNavigate(item.id)}>
        <Text style={styles.moodText} numberOfLines={1} ellipsizeMode="tail">
          {item.mood}
        </Text>

        {item.comment ? (
          <View style={styles.commentRow}>
            <Text style={styles.iconText}>💬</Text>
            <Text
              style={styles.commentText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.comment}
            </Text>
          </View>
        ) : (
          <Text style={styles.noCommentText}>✏️ Add comment</Text>
        )}

        {item.locationName && (
          <View style={styles.locationRow}>
            <Text style={styles.iconText}>📍</Text>
            <Text
              style={styles.locationText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.locationName}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.actionColumn}>
        <Text style={styles.dateText}>{item.date}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => onSpeak(item.comment)}
          >
            <FontAwesome name="volume-up" size={20} color="green" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => onDelete(item.id)}
          >
            <FontAwesome name="trash" size={20} color="crimson" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#d1e7dd",
    borderRadius: 10,
    marginBottom: 12,
    paddingRight: 10,
  },
  item: {
    flex: 1,
    padding: 16,
    paddingRight: 8,
  },
  moodText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 12,
    color: "#777",
    marginBottom: 4,
    textAlign: "center",
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  commentText: {
    fontSize: 14,
    color: "#555",
    flexShrink: 1,
  },
  noCommentText: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
    fontStyle: "italic",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    fontSize: 15,
    color: "#777",
    flex: 1,
  },
  iconText: {
    fontSize: 16,
    marginRight: 4,
  },
  actionColumn: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 16,
    paddingRight: 8,
    minWidth: 70,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
});
