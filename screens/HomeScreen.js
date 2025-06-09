import React, { useContext, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { MoodContext } from "../context/MoodContext";
import * as Speech from "expo-speech";
import MoodItem from "../components/MoodItem";
import CustomButton from "../components/CustomButton";
import EmptyState from "../components/EmptyState";

export default function HomeScreen({ navigation }) {
  const { moodList, deleteMood, isLoading, loadMoods } =
    useContext(MoodContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleNavigate = (id, mood, comment) => {
    if (!id || !mood) return;
    navigation.navigate("Mood Details", {
      id,
      mood,
      comment: comment ?? "",
    });
  };

  const handleSpeak = (comment) => {
    try {
      if (comment?.trim()) {
        Speech.speak(comment);
      } else {
        Speech.speak("No comment available.");
      }
    } catch (error) {
      Alert.alert("Speech error: Failed to read the comment");
      console.error("Speech error:", error);
    }
  };

  const handleDelete = (id) => {
    deleteMood(id);
  };

  const renderMoodItem = ({ item }) => (
    <MoodItem
      item={item}
      onPress={() => handleNavigate(item.id, item.mood, item.comment)}
      onSpeak={() => handleSpeak(item.comment)}
      onDelete={() => handleDelete(item.id)}
    />
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadMoods();
    setIsRefreshing(false);
  };

  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <CustomButton
            title="+ Add Mood"
            onPress={() => navigation.navigate("Add Mood")}
          />

          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#4CAF50"
              style={{ marginTop: 20 }}
            />
          ) : (
            <FlatList
              data={moodList}
              keyExtractor={(item) => item.id}
              renderItem={renderMoodItem}
              ListEmptyComponent={
                <EmptyState message="No moods yet. Add some!" />
              }
              contentContainerStyle={{ flexGrow: 1 }}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={handleRefresh}
                  colors={["#4CAF50"]}
                />
              }
            />
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
    backgroundColor: "#f2f2f2",
  },
});
