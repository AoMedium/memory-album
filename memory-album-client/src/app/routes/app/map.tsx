import 'maplibre-gl/dist/maplibre-gl.css';
import Sidebar from '@/features/sidebar/components/sidebar';
import EventCreationPanel from '@/features/create-event/components/event-creation-panel';
import AlbumMap from '@/features/album-map/components/album-map';
import EventListModal from '@/features/event-list/components/event-list-modal';
import CreateElementButton from '@/features/create-element/components/create-element-button';
import { Outlet } from 'react-router';
import HeaderBar from '@/features/header-bar/components/header-bar';
import AlbumSelectorModal from '@/features/album-selector/components/modal/album-selector-modal';
import AlbumSelectorButton from '@/features/album-selector/components/album-selector-button';

export default function MapRoute() {
  return (
    <>
      <AlbumMap />
      <Sidebar />

      <CreateElementButton />

      <HeaderBar>
        <AlbumSelectorButton />
      </HeaderBar>

      <EventListModal />
      <EventCreationPanel />

      <AlbumSelectorModal />

      <Outlet />
    </>
  );
}
