import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import NotificationList from "./NotificationList";
import type { NotificationData, NotificationBoxState } from "../../../types";
import * as NotificationStories from "../../molecules/Notification/Notification.stories";
import type { ReactNode } from "react";
/* ---------- 1. Mocked Redux state ---------- */
export const MockedState: NotificationBoxState = {
  notifications: [
    {
      ...NotificationStories.Unread.args.notification,
      id: "1",
      message: "Message 1",
    },
    {
      ...NotificationStories.Unread.args.notification,
      id: "2",
      message: "Message 2",
    },
    {
      ...NotificationStories.Unread.args.notification,
      id: "3",
      message: "Message 3",
    },
    {
      ...NotificationStories.Unread.args.notification,
      id: "4",
      message: "Message 4",
    },
    {
      ...NotificationStories.Unread.args.notification,
      id: "5",
      message: "Message 5",
    },
    {
      ...NotificationStories.Unread.args.notification,
      id: "6",
      message: "Message 6",
    },
  ] as NotificationData[],
  status: "idle",
  error: null,
};

/* ---------- 2. Tiny mock store wrapper ---------- */
const MockStore = ({
  notificationBoxState,
  children,
}: {
  notificationBoxState: NotificationBoxState;
  children: ReactNode;
}) => (
  <Provider
    store={configureStore({
      reducer: {
        notificationBox: createSlice({
          name: "notificationBox",
          initialState: notificationBoxState,
          reducers: {
            toggleRead: (state, action: PayloadAction<{ id: string }>) => {
              const n = state.notifications.find(
                (i) => i.id === action.payload.id
              );
              if (n) n.read = !n.read;
            },
            dismissNotification: (
              state,
              action: PayloadAction<{ id: string }>
            ) => {
              state.notifications = state.notifications.filter(
                (i) => i.id !== action.payload.id
              );
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

/* ---------- 3. Storybook meta ---------- */
const meta = {
  component: NotificationList,
  title: "Organisms/NotificationList",
  decorators: [
    (Story) => (
      <div style={{ margin: "3rem" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  excludeStories: /.*MockedState$/,
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------- 4. Stories ---------- */
export const Default: Story = {
  decorators: [
    (Story) => (
      <MockStore notificationBoxState={MockedState}>
        <Story />
      </MockStore>
    ),
  ],
};

export const AllRead: Story = {
  decorators: [
    (Story) => {
      const allRead = MockedState.notifications.map((n) => ({
        ...n,
        read: true,
      }));
      return (
        <MockStore
          notificationBoxState={{ ...MockedState, notifications: allRead }}
        >
          <Story />
        </MockStore>
      );
    },
  ],
};

export const Loading: Story = {
  decorators: [
    (Story) => (
      <MockStore notificationBoxState={{ ...MockedState, status: "loading" }}>
        <Story />
      </MockStore>
    ),
  ],
};

export const Empty: Story = {
  decorators: [
    (Story) => (
      <MockStore notificationBoxState={{ ...MockedState, notifications: [] }}>
        <Story />
      </MockStore>
    ),
  ],
};
