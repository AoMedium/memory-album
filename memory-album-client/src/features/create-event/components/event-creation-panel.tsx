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
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TimestampPicker from './timestamp-picker';
import { Room } from '@mui/icons-material';
import { resetCursor, setCursor } from '@/state/map/map-slice';
import { createEvent } from '../api/create-event';
import { AxiosError } from 'axios';

export default function EventCreationPanel() {
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

  // TODO: set initial as map position
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  useEffect(() => {
    if (!selectedLocation) {
      // TODO: set as initial
      setLatitude(0);
      setLongitude(0);
      return;
    }
    setLatitude(selectedLocation.latitude);
    setLongitude(selectedLocation.longitude);
  }, [selectedLocation]);

  useEffect(() => {
    dispatch(selectLocation({ latitude, longitude }));
  }, [dispatch, latitude, longitude]);

  const clearEventCreation = useCallback(() => {
    dispatch(clearEvent());
    dispatch(setCreationPanelOpen(false));
    dispatch(setSelectingLocation(false));
    dispatch(clearSelectedLocation());
    dispatch(resetCursor());
  }, [dispatch]);

  const submitEvent = useCallback(async () => {
    try {
      const response = await createEvent({
        title,
        description,
        timestamp,
        location: { latitude, longitude },
      });
      console.log(response.data.id);

      clearEventCreation();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data); // TODO: generic api response and error handling
      }
    }
  }, [clearEventCreation, description, latitude, longitude, timestamp, title]);

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
              if (typeof e.target.value === 'number') {
                setLatitude(Number.parseFloat(e.target.value));
              }
            }}
          />
          <TextField
            label="Longitude"
            value={longitude}
            onChange={(e) => {
              if (typeof e.target.value === 'number') {
                setLongitude(Number.parseFloat(e.target.value));
              }
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
                clearEventCreation();
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
