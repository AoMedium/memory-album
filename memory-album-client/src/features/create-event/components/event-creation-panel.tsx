import ModalContainer from '@/components/ui/modal-container';
import { styles } from '@/config/constants';
import {
  clearEvent,
  clearSelectedLocation,
  selectLocation,
  setCreationPanelOpen,
  setSelectingLocation,
} from '@/state/event/event-creation-slice';
import { RootState } from '@/state/store';
import { Stack, Button, TextField } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TimestampPicker from './timestamp-picker';
import { Room } from '@mui/icons-material';
import { resetCursor, setCursor } from '@/state/map/map-slice';
import { createEvent } from '../api/create-event';
import { AxiosError } from 'axios';
import { addEventToAlbum } from '../api/add-event-to-album';
import { getAlbumById } from '@/features/album-selector/api/get-albums';
import { setAlbum } from '@/state/album/album-slice';

export default function EventCreationPanel() {
  const currentAlbum = useSelector(
    (state: RootState) => state.album.currentAlbum,
  );

  const mapPosition = useSelector((state: RootState) => state.map.position);

  const isCreationPanelOpen = useSelector(
    (state: RootState) => state.eventCreation.isCreationPanelOpen,
  );

  const isSelectingLocation = useSelector(
    (state: RootState) => state.eventCreation.isSelectingLocation,
  );

  const selectedLocation = useSelector(
    (state: RootState) => state.eventCreation.selectedLocation,
  );

  const dispatch = useDispatch();

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

  // Update location values whenever selected location changes
  useEffect(() => {
    if (!selectedLocation) {
      return;
    }
    // console.log('Setting location value');
    setLatitude(selectedLocation.latitude);
    setLongitude(selectedLocation.longitude);
  }, [selectedLocation]);

  // Update selected location whenever lat or lng changes
  useEffect(() => {
    // console.log('Setting selected location');
    dispatch(selectLocation({ latitude, longitude }));
  }, [dispatch, latitude, longitude]);

  // TODO: on open, show marker

  const submitEvent = useCallback(async () => {
    try {
      const createEventResponse = await createEvent({
        title,
        description,
        timestamp,
        location: { latitude, longitude },
      });

      if (currentAlbum) {
        const addEventToAlbumResponse = await addEventToAlbum(currentAlbum.id, {
          eventIds: [createEventResponse.data.id],
        });
        console.log(addEventToAlbumResponse);

        const getAlbumByIdResponse = await getAlbumById(currentAlbum.id);
        dispatch(setAlbum(getAlbumByIdResponse));
      }

      cleanupEventCreation();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data); // TODO: generic api response and error handling
      }
    }
  }, [
    cleanupEventCreation,
    currentAlbum,
    description,
    dispatch,
    latitude,
    longitude,
    timestamp,
    title,
  ]);

  return (
    <ModalContainer
      sx={{
        visibility: isCreationPanelOpen ? 'visible' : 'hidden',

        position: 'absolute',
        top: '50%',
        right: styles.viewport.margin,
        transform: 'translateY(-50%)',

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
        <Stack direction="row" spacing={2}>
          <Button
            sx={{
              minWidth: 0,
              // height: '100%',
              // aspectRatio: '1/1',
            }}
            variant={isSelectingLocation ? 'contained' : 'outlined'}
            onClick={() => {
              dispatch(setSelectingLocation(!isSelectingLocation));
              dispatch(setCursor('pointer'));
            }}
          >
            <Room />
          </Button>
          <TextField
            label="Latitude"
            value={latitude}
            onChange={(e) => {
              // TODO: validate is number
              setLatitude(Number.parseFloat(e.target.value));
            }}
          />
          <TextField
            label="Longitude"
            value={longitude}
            onChange={(e) => {
              setLongitude(Number.parseFloat(e.target.value));
            }}
          />
        </Stack>
        <Stack spacing={1}>
          <Button variant="contained" onClick={submitEvent}>
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
    </ModalContainer>
  );
}
