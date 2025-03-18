import { IconLayer } from 'deck.gl';
import { Location } from '@/types/api';

export function createMarkerLayer(
  id: string,
  data: Location[],
  iconUrl: string,
  iconMappingUrl: string,
  size: number,
) {
  return new IconLayer<Location>({
    id,
    data,
    getIcon: () => 'marker',
    getPosition: (d: Location) => [d.latitude, d.longitude],
    getSize: size,
    iconAtlas: iconUrl,
    iconMapping: iconMappingUrl,
  });
}
