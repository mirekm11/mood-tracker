import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { MoodContext } from '../context/MoodContext';
import * as Location from 'expo-location';

export default function HomeScreen({ navigation }) {
  const { moodList } = useContext(MoodContext);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <Text style={styles.locationText}>
          Your location: {location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)}
        </Text>
      ) : (
        <Text style={styles.locationText}>
          {errorMsg ? errorMsg : 'Fetching location...'}
        </Text>
      )}

      <Button
        title="➕ Add Mood"
        onPress={() => navigation.navigate('Add Mood')}
      />

      {moodList.length === 0 ? (
        <Text style={styles.emptyText}>No moods yet. Add some!</Text>
      ) : (
        <FlatList
          data={moodList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.moodItem}>
              <Text
                style={styles.moodText}
                onPress={() => navigation.navigate('Mood Details', { mood: item })}
              >
                {item}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#888',
  },
  moodItem: {
    padding: 16,
    marginTop: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  moodText: {
    fontSize: 18,
  },
  locationText: {
    fontSize: 14,
    marginBottom: 10,
    color: '#666',
    textAlign: 'center',
  },
});
