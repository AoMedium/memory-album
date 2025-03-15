import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { BASEMAP } from '@deck.gl/carto';
import DeckGL from 'deck.gl';
import { MapView } from '@deck.gl/core';
import Sidebar from '@/features/sidebar/components/sidebar';
import AlbumSelector from '@/features/album-selector/components/album-selector';
import EventCreationPanel from '@/features/create-event/components/event-creation-panel';
import CreateEventButton from '@/features/create-event/components/create-event-button';

export default function MapLayout() {
  return (
    <DeckGL
      // Add initial view state and controller here instead of in Map component for interactivity
      initialViewState={{
        latitude: -36.9210148,
        longitude: 174.7957352,
        zoom: 10,
      }}
      controller={{ inertia: 500 }}
    >
      {/* See https://github.com/visgl/deck.gl/issues/7304#issuecomment-1277850750) */}
      {/* @ts-expect-error: cannot be used as JSX component */}
      <MapView>
        <Map mapStyle={BASEMAP.VOYAGER} />
      </MapView>

      <Sidebar />

      <CreateEventButton />
      <EventCreationPanel />

      <AlbumSelector />
    </DeckGL>
  );
}
