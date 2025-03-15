import { EventCreateRequest } from '@/types/api';
import { createSlice } from '@reduxjs/toolkit';

interface EventCreationState {
  isCreationPanelOpen: boolean;
  currentEvent?: EventCreateRequest;
}

const initialState: EventCreationState = {
  isCreationPanelOpen: false,
  currentEvent: undefined,
};

const eventCreationSlice = createSlice({
  name: 'album',
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
  },
});

export const { setCreationPanelOpen, setEvent, clearEvent } =
  eventCreationSlice.actions;
export default eventCreationSlice.reducer;
