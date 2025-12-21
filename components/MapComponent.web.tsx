import React from 'react';
import MapView from '@teovilla/react-native-web-maps';
import { StyleSheet } from 'react-native';

interface MapComponentProps {
  region: { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number };
}

const MapComponent: React.FC<MapComponentProps> = ({ region }) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
    >
      {/* Markers are not directly supported by @teovilla/react-native-web-maps in the same way as react-native-maps */}
      {/* You would typically use a custom overlay or another library for markers on web */}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapComponent;


