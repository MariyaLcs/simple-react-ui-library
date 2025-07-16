import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Notification, { NotificationData } from "./Notification";

export const ActionsData = {
  onToggleRead: fn(),
  onDismiss: fn(),
};

const meta = {
  component: Notification,
  title: "Molecules/Notification",
  tags: ["autodocs"],
  // Exclude our helper data from being treated as stories
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unread: Story = {
  args: {
    notification: {
      id: "1",
      message: "You have a new follower!",
      read: false,
      timestamp: "10:30 AM",
    } as NotificationData,
  },
};

export const Read: Story = {
  args: {
    notification: {
      ...Unread.args!.notification,
      read: true,
    },
  },
};

export const WithDismiss: Story = {
  args: {
    notification: {
      id: "2",
      message: "Your session will expire soon.",
      read: false,
      timestamp: "2:15 PM",
    } as NotificationData,
    onDismiss: ActionsData.onDismiss,
  },
};
