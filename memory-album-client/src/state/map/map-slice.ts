import { Geoposition } from '@/types/common/common';
import { createSlice } from '@reduxjs/toolkit';

interface MapState {
  position: Geoposition;
  cursor: string;
}

const initialState: MapState = {
  position: { latitude: 0, longitude: 0 },
  cursor: 'grab',
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setPosition(state, action: { payload: Geoposition }) {
      state.position = action.payload;
    },
    setCursor(state, action: { payload: string }) {
      state.cursor = action.payload;
    },
    resetCursor(state) {
      state.cursor = initialState.cursor;
    },
  },
});

export const { setPosition, setCursor, resetCursor } = mapSlice.actions;
export default mapSlice.reducer;
