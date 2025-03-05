import { AlbumResponse } from '@/types/api';
import { createSlice } from '@reduxjs/toolkit';

interface AlbumState {
  albums: AlbumResponse[];
  selectedAlbum?: AlbumResponse | undefined;
}

const initialState: AlbumState = {
  albums: [],
  selectedAlbum: undefined,
};

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    selectAlbum(state, action: { payload: AlbumResponse }) {
      state.selectedAlbum = action.payload;
    },
    updateAlbums(state, action: { payload: AlbumResponse[] }) {
      state.albums = action.payload;
    },
  },
});

export const { selectAlbum, updateAlbums } = albumSlice.actions;
export default albumSlice.reducer;
