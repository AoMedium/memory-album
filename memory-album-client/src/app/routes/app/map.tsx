import 'maplibre-gl/dist/maplibre-gl.css';
import Sidebar from '@/features/sidebar/components/sidebar';
import AlbumSelector from '@/features/album-selector/components/album-selector';
import EventCreationPanel from '@/features/create-event/components/event-creation-panel';
import AlbumMap from '@/features/album-map/components/album-map';
import EventListModal from '@/features/event-list/components/event-list-modal';
import CreateElementButton from '@/features/create-element/components/create-element-button';
import { Outlet } from 'react-router';

export default function MapRoute() {
  return (
    <>
      <AlbumMap />
      <Sidebar />

      <CreateElementButton />

      <AlbumSelector />

      <EventListModal />
      <EventCreationPanel />

      <Outlet />
    </>
  );
}
