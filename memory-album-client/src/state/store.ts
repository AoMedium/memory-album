import { configureStore } from '@reduxjs/toolkit';
import albumSliceReducer from './album/album-slice';
import albumSelectionSliceReducer from './album/album-selection-slice';
import eventCreationReducer from './event/event-creation-slice';

export const store = configureStore({
  reducer: {
    album: albumSliceReducer,
    albumSelection: albumSelectionSliceReducer,

    eventCreation: eventCreationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
