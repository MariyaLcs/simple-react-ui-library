import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import NotificationList from "./NotificationList";
import type { NotificationBoxState } from "../../../types";

function renderWithState(state: NotificationBoxState) {
  const slice = createSlice({
    name: "notificationBox",
    initialState: state,
    reducers: {
      toggleRead: (s, a: PayloadAction<{ id: string }>) => {
        const n = s.notifications.find((i) => i.id === a.payload.id);
        if (n) n.read = !n.read;
      },
      dismissNotification: (s, a: PayloadAction<{ id: string }>) => {
        s.notifications = s.notifications.filter((i) => i.id !== a.payload.id);
      },
    },
  });

  const store = configureStore({ reducer: { notificationBox: slice.reducer } });

  return render(
    <Provider store={store}>
      <NotificationList />
    </Provider>
  );
}

describe("NotificationList", () => {
  const baseState: NotificationBoxState = {
    notifications: [
      { id: "1", message: "Message 1", read: false },
      { id: "2", message: "Message 2", read: true },
      { id: "3", message: "Message 3", read: false },
    ],
    status: "idle",
    error: null,
  };

  it("renders notifications from Redux state", () => {
    const { container } = renderWithState(baseState);
    expect(screen.getByText("Message 1")).toBeInTheDocument();
    expect(screen.getByText("Message 2")).toBeInTheDocument();
    expect(screen.getByText("Message 3")).toBeInTheDocument();
    expect(container.querySelectorAll(".notification-item").length).toBe(3);
  });
});
