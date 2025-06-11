import { getLocationName } from "./locationService";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const createMoodEntry = async (moodText) => {
  try {
    const mood = moodText.trim();
    const locationName = await getLocationName();
    return {
      id: uuidv4(),
      mood,
      comment: "",
      locationName,
      date: new Date().toLocaleString(),
    };
  } catch (error) {
    console.error("Error creating mood entry", error);
    return null;
  }
};
