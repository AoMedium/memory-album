import 'maplibre-gl/dist/maplibre-gl.css';
import Sidebar from '@/features/sidebar/components/sidebar';
import AlbumSelector from '@/features/album-selector/components/album-selector';
import EventCreationPanel from '@/features/create-event/components/event-creation-panel';
import CreateEventButton from '@/features/create-event/components/create-event-button';
import AlbumMap from '@/features/album-map/components/album-map';
import EventListModal from '@/features/event-list/components/event-list-modal';

export default function MapLayout() {
  return (
    <>
      <AlbumMap />
      <Sidebar />
      <EventListModal />

      <CreateEventButton />
      <EventCreationPanel />

      <AlbumSelector />
    </>
  );
}
