import { Platform } from 'react-native';

let MapView;
let Marker;

if (Platform.OS === 'web') {
  MapView = require('./index.web').MapView;
  Marker = require('./index.web').Marker;
} else {
  MapView = require('./index.native').MapView;
  Marker = require('./index.native').Marker;
}

export { MapView, Marker };





