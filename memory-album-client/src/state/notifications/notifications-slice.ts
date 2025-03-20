import { Notification } from '@/types/app/notifications';
import { createSlice } from '@reduxjs/toolkit';

interface NotificationsState {
  notifications: Notification[];
}

const initialState: NotificationsState = {
  notifications: [],
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    push(state, action: { payload: Notification }) {
      state.notifications.push(action.payload);
    },
    pop(state) {
      state.notifications.pop();
    },
    remove(state, action: { payload: Notification }) {
      const index = state.notifications.indexOf(action.payload);
      if (index > -1) {
        // only splice array when item is found
        state.notifications = state.notifications.splice(index, 1);
      }
    },
  },
});

export const { push, pop, remove } = mapSlice.actions;
export default mapSlice.reducer;
