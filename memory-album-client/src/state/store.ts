import { configureStore } from '@reduxjs/toolkit';
import mapSliceReducer from './map/map-slice';
import albumSliceReducer from './album/album-slice';
import albumSelectionSliceReducer from './album/album-selection-slice';
import eventSliceReducer from './event/event-slice';
import eventCreationSliceReducer from './event/event-creation-slice';
import eventListSliceReducer from './event/event-list-slice';

export const store = configureStore({
  reducer: {
    map: mapSliceReducer,

    album: albumSliceReducer,
    albumSelection: albumSelectionSliceReducer,

    event: eventSliceReducer,
    eventCreation: eventCreationSliceReducer,
    eventList: eventListSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
