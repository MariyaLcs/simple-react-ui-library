import type { NotificationData, NotificationBoxState } from "../types";
import {
  configureStore,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

/*
 * Creates an asyncThunk to fetch tasks from a remote endpoint.
 * You can read more about Redux Toolkit's thunks in the docs:
 * https://redux-toolkit.js.org/api/createAsyncThunk
 */
export const fetchNotifications = createAsyncThunk(
  "notificationBox/fetchNotifications",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments?_limit=10"
    );
    const data = await response.json();
    // map API → NotificationData
    return data.map(
      (c: { id: number; body: string }) =>
        ({
          id: `${c.id}`,
          message: c.body,
          read: false,
        } satisfies NotificationData)
    );
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
  /* --- extraReducers mirror the tutorial --- */
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

/* ---------- Types ---------- */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
