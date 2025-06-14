import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const createMoodObject = (moodText, locationName) => ({
  id: uuidv4(),
  mood: moodText.trim(),
  comment: "",
  locationName: locationName ?? null,
  date: new Date().toLocaleString(),
});
