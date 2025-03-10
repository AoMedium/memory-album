import { AlbumResponse } from '@/types/api';
import { createSlice } from '@reduxjs/toolkit';

interface AlbumSelectionState {
  isSelectionModalOpen: boolean;
  isDetailsModalOpen: boolean;
  selectedAlbum?: AlbumResponse | undefined;
}

const initialState: AlbumSelectionState = {
  isSelectionModalOpen: false,
  isDetailsModalOpen: false,
  selectedAlbum: undefined,
};

const albumSelectionSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    setSelectionModalOpen(state, action: { payload: boolean }) {
      state.isSelectionModalOpen = action.payload;
    },
    setDetailsModalOpen(state, action: { payload: boolean }) {
      state.isDetailsModalOpen = action.payload;
    },
    selectAlbum(state, action: { payload: AlbumResponse }) {
      state.selectedAlbum = action.payload;
    },
  },
});

export const { setSelectionModalOpen, setDetailsModalOpen, selectAlbum } =
  albumSelectionSlice.actions;
export default albumSelectionSlice.reducer;
