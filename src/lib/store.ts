import type { NotificationData, NotificationBoxState } from "../types";
import {
  configureStore,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

/*
 * Creates an asyncThunk to fetch tasks from a remote endpoint.
 */
export const fetchNotifications = createAsyncThunk<NotificationData[]>(
  "notificationBox/fetchNotifications",
  async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/todos?userId=1"
    );
    const raw = await res.json();

    return (raw as any[])
      .slice(0, 3) // ← only take three
      .map((item) => ({
        id: String(item.id),
        message:
          typeof item.message === "string"
            ? item.message
            : String(item.title ?? ""),
        read:
          typeof item.read === "boolean"
            ? item.read
            : Boolean(item.completed ?? false),
      }));
  }
);
/* --------------- slice --------------- */
const initialState: NotificationBoxState = {
  notifications: [],
  status: "idle",
  error: null,
};
const notificationsSlice = createSlice({
  name: "notificationBox",
  initialState,
  reducers: {
    toggleRead: (state, action: PayloadAction<{ id: string }>) => {
      const n = state.notifications.find((x) => x.id === action.payload.id);
      if (n) n.read = !n.read;
    },
    dismissNotification: (state, action: PayloadAction<{ id: string }>) => {
      state.notifications = state.notifications.filter(
        (x) => x.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.notifications = [];
      })
      .addCase(
        fetchNotifications.fulfilled,
        (state, action: PayloadAction<NotificationData[]>) => {
          state.status = "succeeded";
          state.notifications = action.payload;
        }
      )
      .addCase(fetchNotifications.rejected, (state) => {
        state.status = "failed";
        state.error = "Something went wrong";
        state.notifications = [];
      });
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
export const makeStore = () =>
  configureStore({
    reducer: { notificationBox: notificationsSlice.reducer },
  });

/* ---------- Types ---------- */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
