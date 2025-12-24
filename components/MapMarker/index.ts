import { Platform } from 'react-native';

let MapMarker;

if (Platform.OS === 'web') {
  MapMarker = require('./index.web').default;
} else {
  MapMarker = require('./index.native').default;
}

export default MapMarker;





