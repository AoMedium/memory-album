import { IconLayer } from 'deck.gl';
import { Geoposition } from '@/types/common/common';
import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import iconAtlas from '@/assets/icon-atlas.png';
import iconMapping from '@/assets/icon-atlas.json';

export default function useSelectedLocationMarkerLayer() {
  const selectedLocation = useSelector(
    (state: RootState) => state.eventCreation.selectedLocation,
  );

  const selectedLocationMarker = selectedLocation ? [selectedLocation] : [];

  return new IconLayer<Geoposition>({
    id: 'eventSelectedLocationLayer',
    data: selectedLocationMarker,
    getIcon: () => 'marker',
    getPosition: (d: Geoposition) => [d.longitude, d.latitude],
    getSize: 40,
    iconAtlas: iconAtlas,
    iconMapping: iconMapping,
  });
}
