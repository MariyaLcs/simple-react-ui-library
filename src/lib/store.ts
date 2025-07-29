import type { NotificationData, NotificationBoxState } from "../types";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ---------- Mock data ---------- */
const defaultNotifications: NotificationData[] = [
  { id: "1", message: "New follower!", read: false },
  { id: "2", message: "System maintenance at 2 PM", read: false },
  { id: "3", message: "Weekly digest ready", read: true },
  { id: "4", message: "Update available", read: false },
];

const initialState: NotificationBoxState = {
  notifications: defaultNotifications,
  status: "idle",
  error: null,
};

/* ---------- Slice ---------- */
const notificationsSlice = createSlice({
  name: "notificationBox",
  initialState,
  reducers: {
    toggleRead: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.notifications.find((n) => n.id === action.payload.id);
      if (item) {
        item.read = !item.read;
      }
    },
    dismissNotification: (state, action: PayloadAction<{ id: string }>) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload.id
      );
    },
  },
});

/* Export actions for components / stories */
export const { toggleRead, dismissNotification } = notificationsSlice.actions;

/* ---------- Store ---------- */
const store = configureStore({
  reducer: {
    notificationBox: notificationsSlice.reducer,
  },
});

/* ---------- Types ---------- */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
