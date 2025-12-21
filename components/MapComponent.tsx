import { Platform } from 'react-native';
import React, { ComponentType } from 'react';
import { MapComponentProps } from './MapComponent.d';

let MapComponent: ComponentType<MapComponentProps>;

if (Platform.OS === 'web') {
  MapComponent = require('./MapComponent.web').default;
} else {
  MapComponent = require('./MapComponent.native').default;
}

export default MapComponent;
