import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const [moodList, setMoodList] = useState([]);

  useEffect(() => {
    // Ładuj nastroje przy starcie aplikacji
    const loadMoods = async () => {
      try {
        const storedMoods = await AsyncStorage.getItem('moodList');
        if (storedMoods !== null) {
          setMoodList(JSON.parse(storedMoods));
        }
      } catch (error) {
        console.error('Failed to load moods from storage', error);
      }
    };

    loadMoods();
  }, []);

  useEffect(() => {
    // Zapisuj nastroje za każdym razem, gdy się zmieniają
    const saveMoods = async () => {
      try {
        await AsyncStorage.setItem('moodList', JSON.stringify(moodList));
      } catch (error) {
        console.error('Failed to save moods to storage', error);
      }
    };

    saveMoods();
  }, [moodList]);

  const addMood = (mood) => {
    setMoodList([...moodList, mood]);
  };

  return (
    <MoodContext.Provider value={{ moodList, addMood }}>
      {children}
    </MoodContext.Provider>
  );
};
