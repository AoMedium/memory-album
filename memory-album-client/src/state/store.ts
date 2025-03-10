import { configureStore } from '@reduxjs/toolkit';
import albumSliceReducer from './album/album-slice';
import albumSelectionSliceReducer from './album/album-selection-slice';

export const store = configureStore({
  reducer: {
    album: albumSliceReducer,
    albumSelection: albumSelectionSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
