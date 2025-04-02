import { createSlice } from '@reduxjs/toolkit';

interface EventListState {
  isListPanelOpen: boolean;
}

const initialState: EventListState = {
  isListPanelOpen: false,
};

const eventListSlice = createSlice({
  name: 'eventList',
  initialState,
  reducers: {
    setListPanelOpen(state, action: { payload: boolean }) {
      state.isListPanelOpen = action.payload;
    },
  },
});

export const { setListPanelOpen } = eventListSlice.actions;
export default eventListSlice.reducer;
