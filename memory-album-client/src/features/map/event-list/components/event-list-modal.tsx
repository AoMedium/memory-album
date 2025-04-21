import { getEventsByIds } from '@/api/get-events';
import ModalContainer from '@/components/ui/modal-container';
import { styles } from '@/config/constants';
import useNotification from '@/hooks/use-notification';
import { updateEvents } from '@/state/event/event-slice';
import { RootState } from '@/state/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventList from './event-list';
import CloseModalButton from '@/components/ui/close-modal-button';
import { setListPanelOpen } from '@/state/event/event-list-slice';

export default function EventListModal() {
  const isListPanelOpen = useSelector(
    (state: RootState) => state.eventList.isListPanelOpen,
  );
  const currentAlbum = useSelector(
    (state: RootState) => state.album.currentAlbum,
  );

  const dispatch = useDispatch();

  const { reportSuccess, throwError } = useNotification();

  useEffect(() => {
    async function listEvents() {
      try {
        if (!currentAlbum) {
          return;
        }
        const response = await getEventsByIds(currentAlbum.eventIds); // TODO: Replace with cached events
        dispatch(updateEvents(response.data));
        reportSuccess('Retrieved events');
      } catch (error) {
        console.error(error);
        throwError('Could not load albums');
      }
    }

    if (isListPanelOpen) {
      listEvents();
    }
  }, [currentAlbum, dispatch, isListPanelOpen, reportSuccess, throwError]);

  return (
    <ModalContainer
      open={isListPanelOpen}
      sx={{
        position: 'absolute',
        top: '50%',
        left: `calc(${styles.viewport.margin} * 3)`,
        transform: 'translateY(-50%)',

        width: '400px',
        maxHeight: '70vh',

        boxSizing: 'content-box',
      }}
    >
      <CloseModalButton onClick={() => dispatch(setListPanelOpen(false))} />
      <EventList />
    </ModalContainer>
  );
}
