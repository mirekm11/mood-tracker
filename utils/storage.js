import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadFromStorage = async (key, fallback = []) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return fallback;
  } catch (error) {
    console.error(`Error loading from AsyncStorage for key: ${key}`, error);
    return fallback;
  }
};

export const saveToStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to AsyncStorage for key: ${key}`, error);
  }
};
