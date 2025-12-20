import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { PermissionsAndroid, Platform, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [region, setRegion] = useState({
    latitude: 48.1486,
    longitude: 17.1077,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      let granted = false;

      if (Platform.OS === "android") {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        granted = result === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const { status } = await Location.requestForegroundPermissionsAsync();
        granted = status === "granted";
      }

      setHasPermission(granted);
    })();
  }, []);

  if (!hasPermission) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{ latitude: 48.1486, longitude: 17.1077 }}
          title="Bratislava"
          description="Capital of Slovakia"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
