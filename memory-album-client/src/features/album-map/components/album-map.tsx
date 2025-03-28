import { selectLocation } from '@/state/event/event-creation-slice';
import { RootState } from '@/state/store';
import { BASEMAP } from '@deck.gl/carto';
import DeckGL, { MapView, PickingInfo } from 'deck.gl';
import { useCallback } from 'react';
import Map from 'react-map-gl/maplibre';
import { useDispatch, useSelector } from 'react-redux';
import { useSelectedLocationMarkerLayer } from '../hooks/use-selected-location-marker-layer';
import { useAlbumEventsLayer } from '../hooks/use-album-events-layer';

export default function AlbumMap() {
  const cursor = useSelector((state: RootState) => state.map.cursor);

  const currentAlbum = useSelector(
    (state: RootState) => state.album.currentAlbum,
  );

  const isSelectingLocation = useSelector(
    (state: RootState) => state.eventCreation.isSelectingLocation,
  );

  const dispatch = useDispatch();

  const handleOnClick = useCallback(
    (info: PickingInfo) => {
      if (isSelectingLocation && info.coordinate) {
        dispatch(
          selectLocation({
            latitude: info.coordinate[1],
            longitude: info.coordinate[0],
          }),
        );
      }
    },
    [dispatch, isSelectingLocation],
  );

  const layers = [
    useSelectedLocationMarkerLayer(),
    useAlbumEventsLayer(currentAlbum),
  ];

  return (
    <DeckGL
      // Add initial view state and controller here instead of in Map component for interactivity
      initialViewState={{
        latitude: -36.9210148,
        longitude: 174.7957352,
        zoom: 10,
      }}
      controller={{ inertia: 500 }}
      layers={layers}
      onClick={handleOnClick}
      getCursor={(state) => {
        if (state.isDragging) {
          return 'grabbing';
        } else {
          return cursor;
        }
      }}
    >
      {/* See https://github.com/visgl/deck.gl/issues/7304#issuecomment-1277850750) */}
      {/* @ts-expect-error: cannot be used as JSX component */}
      <MapView>
        <Map mapStyle={BASEMAP.VOYAGER} />
      </MapView>
    </DeckGL>
  );
}
