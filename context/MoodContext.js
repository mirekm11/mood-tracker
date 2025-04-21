import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const [moodList, setMoodList] = useState([]);

  useEffect(() => {
    loadMoods();
  }, []);

  useEffect(() => {
    saveMoods();
  }, [moodList]);

  const addMood = (newMood) => {
    setMoodList((currentMoods) => [...currentMoods, newMood]);
  };

  const loadMoods = async () => {
    try {
      const storedMoods = await AsyncStorage.getItem('@mood_list');
      if (storedMoods) {
        setMoodList(JSON.parse(storedMoods));
      }
    } catch (error) {
      console.error('Failed to load moods', error);
    }
  };

  const saveMoods = async () => {
    try {
      await AsyncStorage.setItem('@mood_list', JSON.stringify(moodList));
    } catch (error) {
      console.error('Failed to save moods', error);
    }
  };

  return (
    <MoodContext.Provider value={{ moodList, addMood }}>
      {children}
    </MoodContext.Provider>
  );
};
