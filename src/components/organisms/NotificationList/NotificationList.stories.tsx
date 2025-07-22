import type { Meta, StoryObj } from "@storybook/react";

import NotificationList from "./NotificationList";

import * as NotificationStories from "../../molecules/Notification/Notification.stories";

const meta = {
  component: NotificationList,
  title: "Organisms/NotificationList",
  decorators: [(Story) => <div style={{ margin: "3rem" }}>{<Story />}</div>],
  tags: ["autodocs"],
  args: {
    ...NotificationStories.ActionsData,
  },
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
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
    ],
  },
};

export const AllRead: Story = {
  args: {
    notifications: Default.args.notifications.map((n) => ({
      ...n,
      read: true,
    })),
  },
};

export const Loading: Story = {
  args: {
    notifications: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    ...Loading.args,
    loading: false,
  },
};
