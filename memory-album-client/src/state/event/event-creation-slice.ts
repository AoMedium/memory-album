import { EventCreateRequest, Location } from '@/types/api';
import { createSlice } from '@reduxjs/toolkit';

interface EventCreationState {
  isCreationPanelOpen: boolean;
  currentEvent?: EventCreateRequest;
  isSelectingLocation: boolean;
  selectedLocation?: Location;
}

const initialState: EventCreationState = {
  isCreationPanelOpen: false,
  currentEvent: undefined,
  isSelectingLocation: false,
  selectedLocation: undefined,
};

const eventCreationSlice = createSlice({
  name: 'eventCreation',
  initialState,
  reducers: {
    setCreationPanelOpen(state, action: { payload: boolean }) {
      state.isCreationPanelOpen = action.payload;
    },
    setEvent(state, action: { payload: EventCreateRequest }) {
      state.currentEvent = action.payload;
    },
    clearEvent(state) {
      state.currentEvent = undefined;
    },
    setSelectingLocation(state, action: { payload: boolean }) {
      state.isSelectingLocation = action.payload;
    },
    selectLocation(state, action: { payload: Location }) {
      state.selectedLocation = action.payload;
    },
    clearSelectedLocation(state) {
      state.selectedLocation = initialState.selectedLocation;
    },
  },
});

export const {
  setCreationPanelOpen,
  setEvent,
  clearEvent,
  setSelectingLocation,
  selectLocation,
  clearSelectedLocation,
} = eventCreationSlice.actions;
export default eventCreationSlice.reducer;
