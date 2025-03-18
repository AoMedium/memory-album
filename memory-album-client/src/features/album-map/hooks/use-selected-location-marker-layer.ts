import { IconLayer } from 'deck.gl';
import { Location } from '@/types/api';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import iconAtlas from '@/assets/icon-atlas.png';
import iconMapping from '@/assets/icon-atlas.json';

export function useSelectedLocationMarkerLayer() {
  const selectedLocation = useSelector(
    (state: RootState) => state.eventCreation.selectedLocation,
  );

  const selectedLocationMarker = selectedLocation ? [selectedLocation] : [];

  return new IconLayer<Location>({
    id: 'eventSelectedLocationLayer',
    data: selectedLocationMarker,
    getIcon: () => 'marker',
    getPosition: (d: Location) => [d.latitude, d.longitude],
    getSize: 40,
    iconAtlas: iconAtlas,
    iconMapping: iconMapping,
  });
}
