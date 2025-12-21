import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';

interface MapComponentProps {
  region: { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number };
  showsUserLocation?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ region, showsUserLocation }) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      showsUserLocation={showsUserLocation}
    >
      <Marker
        coordinate={{ latitude: 48.1486, longitude: 17.1077 }}
        title="Bratislava"
        description="Capital of Slovakia"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapComponent;


