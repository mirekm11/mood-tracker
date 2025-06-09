import * as Location from "expo-location";

export const getLocationName = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.warn("Permission to access location was denied");
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});

    const places = await Location.reverseGeocodeAsync(location.coords);

    if (places.length > 0) {
      const place = places[0];

      return `${place.city || "Unknown"}, ${place.country || ""}`;
    }
    return null;
  } catch (error) {
    console.error("Error fetching location", error);
    return null;
  }
};
