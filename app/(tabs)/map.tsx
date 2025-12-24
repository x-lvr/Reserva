import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BlurView } from 'expo-blur';
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { FlatList, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

let MapView: any;
let Marker: any;

if (Platform.OS === 'web') {
  MapView = require('@teovilla/react-native-web-maps').default;
  Marker = () => null; // Dummy Marker for web
} else {
  MapView = require('react-native-maps').default;
  Marker = require('react-native-maps').Marker;
}

interface Category {
  id: string;
  name: string;
  icon: any;
}

const categories: Category[] = [
  { id: '1', name: 'Hotels', icon: 'hotel' },
  { id: '2', name: 'Food', icon: 'food' },
  { id: '3', name: 'Cafes', icon: 'coffee' },
  { id: '4', name: 'Parks', icon: 'tree' },
  { id: '5', name: 'Museums', icon: 'museum' },
  { id: '6', name: 'Shopping', icon: 'shopping' },
  { id: '7', name: 'Bars', icon: 'glass-cocktail' },
  { id: '8', name: 'Events', icon: 'ticket' },
];

function MapCategoryItem({ item }: { item: Category }) {
  return (
    <BlurView intensity={30} tint="dark" style={styles.categoryBlurContainer}>
      <TouchableOpacity style={styles.categoryItem}>
        <MaterialCommunityIcons name={item.icon} size={20} color="#fff" />
        <Text style={styles.categoryText}>{item.name}</Text>
      </TouchableOpacity>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 80, // Approximate height of the bottom tab bar
    left: 0,
    right: 0,
    height: 120,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
  },
  categoryList: {
    flex: 1,
  },
  categoriesWrapper: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
  },
  horizontalListContent: {
    alignItems: 'center',
    paddingRight: 24, // Space so last item can scroll fully
  },
  categoryBlurContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 5,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  categoryText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  searchIconBlurContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    padding: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  searchBox: {
    position: 'absolute',
    right: 12,
    bottom: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIconContainer: {
    padding: 5,
  },
});

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
      {Platform.OS === 'web' ? (
        <MapView
          style={styles.map}
          initialRegion={region}
        >
          {/* Markers are not directly supported by @teovilla/react-native-web-maps in the same way as react-native-maps */}
        </MapView>
      ) : (
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
      )}
      <View style={styles.overlayContainer}>
        <View style={styles.categoriesWrapper}>
          <FlatList
            data={categories}
            renderItem={({ item }) => <MapCategoryItem item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContent}
            style={styles.categoryList}
          />
        </View>

        <View style={styles.searchBox} pointerEvents="box-none">
          <BlurView intensity={30} tint="dark" style={styles.searchIconBlurContainer}>
            <TouchableOpacity style={styles.searchIconContainer}>
              <MaterialCommunityIcons name="magnify" size={30} color="white" />
            </TouchableOpacity>
          </BlurView>
        </View>
      </View>
    </View>
  );
}
