/*import * as SecureStore from 'expo-secure-store';

export async function saveSecureItem(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error('SecureStore save error:', error);
  }
}

export async function getSecureItem(key) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error('SecureStore get error:', error);
    return null;
  }
}

export async function deleteSecureItem(key) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error('SecureStore delete error:', error);
  }
}*/