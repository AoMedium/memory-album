import { selectLocation } from '@/state/event/event-creation-slice';
import { RootState } from '@/state/store';
import { BASEMAP } from '@deck.gl/carto';
import DeckGL, { IconLayer, MapView, PickingInfo } from 'deck.gl';
import { useCallback, useEffect } from 'react';
import Map from 'react-map-gl/maplibre';
import { useDispatch, useSelector } from 'react-redux';

export default function AlbumMap() {
  const layers = useSelector((state: RootState) => state.map.layers);
  const cursor = useSelector((state: RootState) => state.map.cursor);

  const selectedLocation = useSelector(
    (state: RootState) => state.eventCreation.selectedLocation,
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
            latitude: info.coordinate[0],
            longitude: info.coordinate[1],
          }),
        );
      }
    },
    [dispatch, isSelectingLocation],
  );

  useEffect(() => {
    console.log(
      'render: ' +
        selectedLocation?.latitude +
        ',' +
        selectedLocation?.longitude,
    );
  }, [selectedLocation]);

  // const tempLayer = new IconLayer({
  //   id: 'test',
  //   data: [selectedLocation?.latitude, selectedLocation?.longitude],
  //   getIcon: () => 'marker',
  //   getPosition: () => {
  //     return { x: selectedLocation?.latitude, y: selectedLocation?.longitude };
  //   },
  //   iconAtlas:
  //     'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
  //   iconMapping:
  //     'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json',
  // });

  return (
    <DeckGL
      // Add initial view state and controller here instead of in Map component for interactivity
      initialViewState={{
        latitude: -36.9210148,
        longitude: 174.7957352,
        zoom: 10,
      }}
      controller={{ inertia: 500 }}
      // layers={[tempLayer]}
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
