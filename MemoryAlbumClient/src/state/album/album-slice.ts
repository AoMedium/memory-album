import { AlbumResponse } from '@/types/api';
import { createSlice } from '@reduxjs/toolkit';

interface AlbumState {
  albums: AlbumResponse[];
  selectedAlbumId?: string | undefined;
}

const initialState: AlbumState = {
  albums: [],
  selectedAlbumId: undefined,
};

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    selectAlbum(state, action) {
      state.selectedAlbumId = action.payload;
    },
    updateAlbums(state, action) {
      state.albums = action.payload;
    },
  },
});

export const { selectAlbum, updateAlbums } = albumSlice.actions;
export default albumSlice.reducer;
