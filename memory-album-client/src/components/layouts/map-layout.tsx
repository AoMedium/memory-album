import 'maplibre-gl/dist/maplibre-gl.css';
import Sidebar from '@/features/sidebar/components/sidebar';
import AlbumSelector from '@/features/album-selector/components/album-selector';
import EventCreationPanel from '@/features/create-event/components/event-creation-panel';
import AlbumMap from '@/features/album-map/components/album-map';
import EventListModal from '@/features/event-list/components/event-list-modal';
import CreateElementButton from '@/features/create-element/components/create-element-button';
import DraggableContainer from '../ui/draggable-container';

export default function MapLayout() {
  return (
    <>
      {/* <AlbumMap />
      <Sidebar />
      <EventListModal />

      <CreateElementButton />
      <EventCreationPanel />

      <AlbumSelector /> */}

      <DraggableContainer
        header="Drag test"
        initialPosition={{
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        }}
      >
        <EventCreationPanel />
      </DraggableContainer>
    </>
  );
}
