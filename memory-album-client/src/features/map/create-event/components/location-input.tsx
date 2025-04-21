import {
  selectLocation,
  setSelectingLocation,
} from '@/state/event/event-creation-slice';
import { setCursor } from '@/state/map/map-slice';
import { RootState } from '@/state/store';
import { Room } from '@mui/icons-material';
import { Stack, Button, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  latitude: number;
  longitude: number;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
}

export default function LocationInput(props: Props) {
  const isSelectingLocation = useSelector(
    (state: RootState) => state.eventCreation.isSelectingLocation,
  );
  const selectedLocation = useSelector(
    (state: RootState) => state.eventCreation.selectedLocation,
  );

  const dispatch = useDispatch();

  // Update location values whenever selected location changes
  useEffect(() => {
    console.log(selectedLocation);
    if (!selectedLocation) {
      return;
    }
    // console.log('Setting location value');
    props.setLatitude(selectedLocation.latitude);
    props.setLongitude(selectedLocation.longitude);
  }, [props, selectedLocation]);

  // Update selected location whenever lat or lng changes
  useEffect(() => {
    console.log('Setting selected location');
    /**
     * FIXME:
     * - marker not showing when closing and reopening modal too quickly
     * - seems to be caused in between saving positions
     *
     * - selectedLocation is undefined after resetValues() is called, despite updating lat lng
     * - this may be because this useEffect is not called and setting
     */
    dispatch(
      selectLocation({
        latitude: props.latitude,
        longitude: props.longitude,
      }),
    );
  }, [dispatch, props.latitude, props.longitude]);

  return (
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
        value={props.latitude}
        onChange={(e) => {
          // TODO: validate is number
          props.setLatitude(Number.parseFloat(e.target.value));
        }}
      />
      <TextField
        label="Longitude"
        value={props.longitude}
        onChange={(e) => {
          props.setLongitude(Number.parseFloat(e.target.value));
        }}
      />
    </Stack>
  );
}
