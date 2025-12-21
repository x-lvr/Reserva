declare module '@/components/MapComponent' {
  import { ComponentType } from 'react';

  export interface MapComponentProps {
    region: { latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number };
    showsUserLocation?: boolean;
  }

  const MapComponent: ComponentType<MapComponentProps>;
  export default MapComponent;
}


