import React, { createContext, useState, useEffect } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import { createMoodEntry } from "../utils/moodService";
import { removeMoodById, updateMoodComment } from "../utils/moodListUtils";

export const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const [moodList, setMoodList] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadMoods = async () => {
    try {
      setIsLoading(true);
      const loaded = await loadFromStorage("moodList");
      setMoodList(loaded);
    } catch (error) {
      console.error("Error loading moods:", error);
      setMoodList([]);
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  };

  useEffect(() => {
    loadMoods();
  }, []);

  useEffect(() => {
    if (isInitialLoad) return;

    const timeout = setTimeout(() => {
      saveToStorage("moodList", moodList);
    }, 500);

    return () => clearTimeout(timeout);
  }, [moodList]);

  const addMood = async (moodText) => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      const newMood = await createMoodEntry(moodText);
      if (newMood) {
        setMoodList((prev) => [...prev, newMood]);
      }
    } catch (error) {
      console.error("Error adding mood:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteMood = (idToDelete) => {
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      setMoodList((prev) => removeMoodById(prev, idToDelete));
    } catch (error) {
      console.error("Error deleting mood:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const addComment = (id, comment) => {
    try {
      setMoodList((prevMoods) => updateMoodComment(prevMoods, id, comment));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <MoodContext.Provider
      value={{
        moodList,
        addMood,
        deleteMood,
        addComment,
        isLoading,
        loadMoods,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};
