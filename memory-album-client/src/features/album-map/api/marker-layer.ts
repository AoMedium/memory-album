import { IconLayer } from 'deck.gl';
import { Location } from '@/types/api';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';

export function useSelectedLocationMarkerLayer(
  iconUrl = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
  iconMappingUrl = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json',
  size = 40,
) {
  const selectedLocation = useSelector(
    (state: RootState) => state.eventCreation.selectedLocation,
  );

  const selectedLocationMarker = selectedLocation ? [selectedLocation] : [];

  return new IconLayer<Location>({
    id: 'eventSelectedLocationLayer',
    data: selectedLocationMarker,
    getIcon: () => 'marker',
    getPosition: (d: Location) => [d.latitude, d.longitude],
    getSize: size,
    iconAtlas: iconUrl,
    iconMapping: iconMappingUrl,
  });
}
