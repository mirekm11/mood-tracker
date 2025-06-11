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

  const handleNavigate = (item) => {
    navigation.navigate("Mood Details", { moodItem: item });
  };

  const handleSpeak = (comment) => {
    if (comment?.trim()) {
      try {
        Speech.speak(comment);
      } catch (error) {
        console.error("Speech error:", error);
      }
    } else {
      Speech.speak("No comment available.");
    }
  };

  const handleDelete = (id) => {
    deleteMood(id);
  };

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
              renderItem={({ item }) => (
                <MoodItem
                  item={item}
                  onNavigate={handleNavigate}
                  onSpeak={handleSpeak}
                  onDelete={handleDelete}
                />
              )}
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
