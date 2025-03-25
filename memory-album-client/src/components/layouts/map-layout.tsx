import 'maplibre-gl/dist/maplibre-gl.css';
import Sidebar from '@/features/sidebar/components/sidebar';
import AlbumSelector from '@/features/albums/components/album-selector';
import EventCreationPanel from '@/features/events/components/event-creation-panel';
import CreateEventButton from '@/features/events/components/create-event-button';
import AlbumMap from '@/features/albums/components/album-map';

export default function MapLayout() {
  return (
    <>
      <AlbumMap />
      <Sidebar />

      <CreateEventButton />
      <EventCreationPanel />

      <AlbumSelector />
    </>
  );
}
