import { AlbumGetResponse } from '@/types/api/album';
import { createSlice } from '@reduxjs/toolkit';

interface AlbumState {
  albums: AlbumGetResponse[];
  currentAlbum?: AlbumGetResponse;
  isLoading: boolean;
}

const initialState: AlbumState = {
  albums: [],
  currentAlbum: undefined,
  isLoading: false,
};

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    setAlbum(state, action: { payload: AlbumGetResponse }) {
      state.currentAlbum = action.payload;
    },
    updateAlbums(state, action: { payload: AlbumGetResponse[] }) {
      state.albums = action.payload;
    },
    setLoading(state, action: { payload: boolean }) {
      state.isLoading = action.payload;
    },
  },
});

export const { setAlbum, updateAlbums, setLoading } = albumSlice.actions;
export default albumSlice.reducer;
