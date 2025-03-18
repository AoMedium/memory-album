import { RootState } from '@/state/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export function useEventsLayer() {
  const eventIds = useSelector(
    (state: RootState) => state.album.currentAlbum?.eventIds,
  );

  useEffect(() => {}, []);

  // const events = useSelector((state: RootState) => state.album.currentAlbum?.eventIds);
  //   return new IconLayer<Location>({
  //     id: 'eventSelectedLocationLayer',
  //     data: selectedLocationMarker,
  //     getIcon: () => 'marker',
  //     getPosition: (d: Location) => [d.latitude, d.longitude],
  //     getSize: size,
  //     iconAtlas: iconUrl,
  //     iconMapping: iconMappingUrl,
  //   });
}
