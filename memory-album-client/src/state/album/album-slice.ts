import { AlbumResponse } from '@/types/api';
import { createSlice } from '@reduxjs/toolkit';

interface AlbumState {
  albums: AlbumResponse[];
  selectedAlbum?: AlbumResponse | undefined;
  isLoading: boolean;
}

const initialState: AlbumState = {
  albums: [],
  selectedAlbum: undefined,
  isLoading: false,
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
    setLoading(state, action: { payload: boolean }) {
      state.isLoading = action.payload;
    },
  },
});

export const { selectAlbum, updateAlbums, setLoading } = albumSlice.actions;
export default albumSlice.reducer;
