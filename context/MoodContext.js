import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const [moodList, setMoodList] = useState([]);

  useEffect(() => {
    loadMoods();
  }, []);

  useEffect(() => {
    saveMoods();
  }, [moodList]);

  const loadMoods = async () => {
    try {
      const storedMoods = await AsyncStorage.getItem("moodList");
      if (storedMoods) {
        setMoodList(JSON.parse(storedMoods));
      }
    } catch (error) {
      console.error("Failed to load moods:", error);
    }
  };

  const saveMoods = async () => {
    try {
      await AsyncStorage.setItem("moodList", JSON.stringify(moodList));
    } catch (error) {
      console.error("Failed to save moods:", error);
    }
  };

  const addMood = async (mood) => {
    try {
      let location = null;
      let locationName = null;

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const loc = await Location.getCurrentPositionAsync({});
        location = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };

        const places = await Location.reverseGeocodeAsync(loc.coords);
        if (places.length > 0) {
          const place = places[0];
          locationName = `${place.city || place.region || "Unknown"}, ${place.country || ""}`;
        }
      }

      const newMood = {
        mood,
        comment: "",
        location,
        locationName,
        date: new Date().toLocaleString(),
      };

      setMoodList((prev) => [...prev, newMood]);
    } catch (error) {
      console.error("Error adding mood:", error);
    }
  };

  const deleteMood = (index) => {
    setMoodList((prev) => prev.filter((_, i) => i !== index));
  };

  const addComment = (index, comment) => {
    setMoodList((prev) => {
      const updated = [...prev];
      updated[index].comment = comment;
      return updated;
    });
  };

  return (
    <MoodContext.Provider value={{ moodList, addMood, deleteMood, addComment }}>
      {children}
    </MoodContext.Provider>
  );
};
