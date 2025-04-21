import { EventGetResponse } from '@/types/api/event';
import { createSlice } from '@reduxjs/toolkit';

interface EventState {
  events: EventGetResponse[];
  currentEvent?: EventGetResponse;
  isLoading: boolean;
}

const initialState: EventState = {
  events: [],
  currentEvent: undefined,
  isLoading: false,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    updateEvents(state, action: { payload: EventGetResponse[] }) {
      state.events = action.payload;
    },
    setCurrentEvent(state, action: { payload: EventGetResponse }) {
      state.currentEvent = action.payload;
    },
    setLoading(state, action: { payload: boolean }) {
      state.isLoading = action.payload;
    },
  },
});

export const { updateEvents, setCurrentEvent, setLoading } = eventSlice.actions;
export default eventSlice.reducer;
