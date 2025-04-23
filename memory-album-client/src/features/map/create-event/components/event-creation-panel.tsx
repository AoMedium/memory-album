import { styles } from '@/config/constants';
import {
  clearEvent,
  clearSelectedLocation,
  setCreationPanelOpen,
  setSelectingLocation,
} from '@/state/event/event-creation-slice';
import { RootState } from '@/state/store';
import { Stack, Button, TextField } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TimestampPicker from './timestamp-picker';
import { resetCursor } from '@/state/map/map-slice';
import { createEvent } from '../api/create-event';
import { AxiosError } from 'axios';
import { addEventToAlbum } from '../api/add-event-to-album';
import { getAlbumById } from '@/api/get-albums';
import { setAlbum } from '@/state/album/album-slice';
import useNotification from '@/hooks/use-notification';
import LocationInput from './location-input';
import CreationModalContainer from '@/components/ui/creation-modal-container';

export default function EventCreationPanel() {
  const currentAlbum = useSelector(
    (state: RootState) => state.album.currentAlbum,
  );

  const mapPosition = useSelector((state: RootState) => state.map.position);

  const isCreationPanelOpen = useSelector(
    (state: RootState) => state.eventCreation.isCreationPanelOpen,
  );

  const dispatch = useDispatch();

  const { reportSuccess, throwError } = useNotification();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timestamp, setTimestamp] = useState<number>(Date.now());

  const [latitude, setLatitude] = useState<number>(mapPosition.latitude);
  const [longitude, setLongitude] = useState<number>(mapPosition.longitude);

  const mapPositionRef = useRef(mapPosition); // Map position changes should not trigger rerenders here

  useEffect(() => {
    mapPositionRef.current = mapPosition; // Keep the ref updated with the latest mapPosition
  }, [mapPosition]);

  const cleanupEventCreation = useCallback(() => {
    console.log('Clean up event creation');
    dispatch(clearEvent());
    dispatch(setSelectingLocation(false));
    dispatch(clearSelectedLocation());
    dispatch(resetCursor());
  }, [dispatch]);

  const resetValues = useCallback(() => {
    console.log('Resetting values');
    setTitle('');
    setDescription('');
    setTimestamp(Date.now());
    setLatitude(mapPositionRef.current.latitude);
    setLongitude(mapPositionRef.current.longitude);
  }, []);

  // Reset and clean up on panel open and close
  useEffect(() => {
    if (isCreationPanelOpen) {
      resetValues();
    } else {
      cleanupEventCreation();
    }
  }, [isCreationPanelOpen, cleanupEventCreation, resetValues]);

  const submitEvent = useCallback(async () => {
    try {
      const createEventResponse = await createEvent({
        title,
        description,
        timestamp,
        location: { latitude, longitude },
      });

      reportSuccess('Created event');

      dispatch(setCreationPanelOpen(false));

      if (currentAlbum) {
        const addEventToAlbumResponse = await addEventToAlbum(currentAlbum.id, {
          eventIds: [createEventResponse.data.id],
        });
        console.log(addEventToAlbumResponse);

        const getAlbumByIdResponse = await getAlbumById(currentAlbum.id);
        dispatch(setAlbum(getAlbumByIdResponse.data));

        reportSuccess('Added event to current album');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data); // TODO: generic api response and error handling
        throwError('An error occurred');
      }
    }
  }, [
    currentAlbum,
    description,
    dispatch,
    latitude,
    longitude,
    reportSuccess,
    throwError,
    timestamp,
    title,
  ]);

  return (
    <CreationModalContainer
      header="Create Event"
      open={isCreationPanelOpen}
      draggable
      sx={{
        position: 'absolute',
        top: styles.viewport.margin,
        right: styles.viewport.margin,

        width: '400px',
      }}
    >
      {/* TODO: input validation */}
      <Stack spacing={2}>
        <TextField
          label="Title"
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(event.target.value)
          }
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(event.target.value)
          }
          multiline
          maxRows={2}
          required
        />
        <TimestampPicker timestamp={timestamp} setTimestamp={setTimestamp} />
        <LocationInput
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
        <Stack spacing={1}>
          <Button
            variant="contained"
            onClick={() => {
              if (
                currentAlbum ||
                confirm('No album selected. Create event anyway?')
              ) {
                submitEvent();
              }
            }}
          >
            Create
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              if (confirm('Discard your changes?')) {
                dispatch(setCreationPanelOpen(false));
              }
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </CreationModalContainer>
  );
}
