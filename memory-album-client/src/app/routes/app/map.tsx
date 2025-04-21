import 'maplibre-gl/dist/maplibre-gl.css';
import Sidebar from '@/features/map/sidebar/components/sidebar';
import EventCreationPanel from '@/features/map/create-event/components/event-creation-panel';
import AlbumMap from '@/features/map/album-map/components/album-map';
import EventListModal from '@/features/map/event-list/components/event-list-modal';
import CreateElementButton from '@/features/map/create-element/components/create-element-button';
import { Outlet } from 'react-router';
import HeaderBar from '@/features/map/header-bar/components/header-bar';
import AlbumSelectorModal from '@/features/map/album-selector/components/modal/album-selector-modal';
import AlbumSelectorButton from '@/features/map/album-selector/components/album-selector-button';

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
