import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MoodProvider } from "./context/MoodContext";
import HomeScreen from "./screens/HomeScreen";
import AddMoodScreen from "./screens/AddMoodScreen";
import MoodDetailsScreen from "./screens/MoodDetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MoodProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Add Mood" component={AddMoodScreen} />
          <Stack.Screen name="Mood Details" component={MoodDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MoodProvider>
  );
}
