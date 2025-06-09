import { getLocationName } from "./location";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const MAX_LENGTH = 30;

export const validateMood = (text) => {
  if (!text.trim()) return "Mood cannot be empty.";
  if (text.trim().length < 3) return "Mood must be at least 3 characters.";
  if (text.trim().length > MAX_LENGTH)
    return `Mood cannot exceed ${MAX_LENGTH} characters.`;
  return "";
};

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
