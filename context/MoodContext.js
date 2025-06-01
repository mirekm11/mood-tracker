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
    } catch (error) {}
  };

  const saveMoods = async () => {
    try {
      await AsyncStorage.setItem("moodList", JSON.stringify(moodList));
    } catch (error) {}
  };

  const addMood = async (mood) => {
    try {
      let locationName = null;

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const loc = await Location.getCurrentPositionAsync({});

        const places = await Location.reverseGeocodeAsync(loc.coords);
        if (places.length > 0) {
          const place = places[0];
          locationName = `${place.city || "Unknown"}, ${place.country || ""}`;
        }
      }

      const newMood = {
        id: Date.now().toString(),
        mood,
        comment: "",
        locationName,
        date: new Date().toLocaleString(),
      };

      setMoodList((prev) => [...prev, newMood]);
    } catch (error) {}
  };

  const deleteMood = (idToDelete) => {
    setMoodList((prev) => prev.filter((m) => m.id !== idToDelete));
  };

  const addComment = (id, comment) => {
    setMoodList((prevMoods) =>
      prevMoods.map((mood) => (mood.id === id ? { ...mood, comment } : mood))
    );
  };

  return (
    <MoodContext.Provider value={{ moodList, addMood, deleteMood, addComment }}>
      {children}
    </MoodContext.Provider>
  );
};
