import { configureStore } from '@reduxjs/toolkit';
import albumSliceReducer from './album/album-slice';

export const store = configureStore({
  reducer: {
    album: albumSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
