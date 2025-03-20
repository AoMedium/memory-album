import { selectLocation } from '@/state/event/event-creation-slice';
import { RootState } from '@/state/store';
import { BASEMAP } from '@deck.gl/carto';
import DeckGL, { MapView, MapViewState, PickingInfo } from 'deck.gl';
import { useCallback, useEffect, useState } from 'react';
import Map from 'react-map-gl/maplibre';
import { useDispatch, useSelector } from 'react-redux';
import useSelectedLocationMarkerLayer from '../hooks/use-selected-location-marker-layer';
import useAlbumEventsLayer from '../hooks/use-album-events-layer';
import { setPosition } from '@/state/map/map-slice';

const INITIAL_VIEW_STATE: MapViewState = {
  latitude: -36.9210148,
  longitude: 174.7957352,
  zoom: 10,
};

const MAP_VIEW = new MapView({ repeat: true });

/**
 * Amount of idle time (seconds) where map position (lat, lng) has
 * not changed before dispatching position.
 */
const IDLE_UPDATE_POSITION_DELAY = 500;

export default function AlbumMap() {
  const cursor = useSelector((state: RootState) => state.map.cursor);

  const currentAlbum = useSelector(
    (state: RootState) => state.album.currentAlbum,
  );

  const isSelectingLocation = useSelector(
    (state: RootState) => state.eventCreation.isSelectingLocation,
  );

  const dispatch = useDispatch();

  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

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

  // Update map position after being idle
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        setPosition({
          latitude: viewState.latitude,
          longitude: viewState.longitude,
        }),
      );
      console.log('Saved position', viewState.latitude, viewState.longitude);
    }, IDLE_UPDATE_POSITION_DELAY);

    return () => clearTimeout(timeout); // Clear timeout if viewState changes before 2 seconds
  }, [dispatch, viewState.latitude, viewState.longitude]);

  const layers = [
    useSelectedLocationMarkerLayer(),
    useAlbumEventsLayer(currentAlbum),
  ];

  return (
    <DeckGL
      // Add initial view state and controller here instead of in Map component for interactivity
      views={MAP_VIEW}
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
      viewState={viewState}
      onViewStateChange={(e) => setViewState(e.viewState)}
    >
      {/* See https://github.com/visgl/deck.gl/issues/7304#issuecomment-1277850750) */}
      {/* @ts-expect-error: cannot be used as JSX component */}
      <MapView>
        <Map mapStyle={BASEMAP.VOYAGER} />
      </MapView>
    </DeckGL>
  );
}
